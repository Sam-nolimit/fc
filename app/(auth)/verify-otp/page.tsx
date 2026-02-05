"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { AuthService } from "@/services/auth.service";
import { Toaster, toast } from "sonner"; 

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    const emailFromStorage =
      typeof window !== "undefined" ? localStorage.getItem("temp_email") : null;

    const finalEmail = emailFromParams || emailFromStorage || "";

    if (!finalEmail) {
      router.push("/register");
      return;
    }

    setEmail(finalEmail);
  }, [searchParams, router]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every((digit) => digit !== "") && index === 5) {
      handleSubmit();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!pin[index] && index > 0) {
        const newPin = [...pin];
        newPin[index - 1] = "";
        setPin(newPin);
        inputRefs.current[index - 1]?.focus();
      } else if (pin[index]) {
        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const numbers = pastedData.replace(/\D/g, "").slice(0, 6).split("");

    const newPin = [...pin];
    numbers.forEach((num, index) => {
      if (index < 6) {
        newPin[index] = num;
      }
    });
    setPin(newPin);

    const lastFilledIndex = numbers.length - 1;
    const focusIndex = Math.min(lastFilledIndex, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async (otp: string) => {

    if (!email) {
      toast.error("Email not found. Please register again.");
      setTimeout(() => router.push("/register"), 2000);
      return;
    }

    setIsVerifying(true);

    try {
      const response = await AuthService.verifyOtp(email, otp);

      if (response.status === true) {

        if (typeof window !== "undefined") {
          localStorage.removeItem("temp_user_id");
          localStorage.removeItem("temp_email");
          localStorage.removeItem("temp_password");
        }

        toast.success(response.message || "Email verified successfully!", {
          duration: 2000,
        });

        setTimeout(() => {
          setShowSuccess(true);
        }, 1500);
      } else {
        toast.error(response.message || "Invalid verification code");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to verify email. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;

    setIsResending(true);
    try {
      const response = await AuthService.resendOtp(email);

      if (response.status === true) {
        toast.success(
          response.message || "Verification code sent to your email!",
        );
        setTimeLeft(60);
      } else {
        toast.error(response.message || "Failed to resend code");
      }
    } catch (error: any) {
      console.error("Resend error:", error);
      toast.error(error.message || "Failed to resend verification code");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = () => {
    const pinString = pin.join("");
    if (pinString.length === 6) {
      handleVerify(pinString);
    }
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  const isPinComplete = pin.every((digit) => digit !== "");

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-6">
          <div className="flex items-center gap-2">
            <Image
              src="/images/farmcitylogo.svg"
              alt="Farm City"
              width={188}
              height={188}
            />
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-sm text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              Successful!
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Congratulations! Your email has been verified successfully.
            </p>

            <Button
              onClick={handleGoToLogin}
              className="w-full h-12 rounded-full bg-green-700 hover:bg-green-800 text-white font-medium"
            >
              GO TO LOGIN
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      {/* Sonner Toaster - much simpler */}
      <Toaster 
        position="top-right" 
        expand={false}
        richColors
        closeButton
      />

      <div className="min-h-screen flex flex-col">
        {/* Logo */}
        <header className="p-6">
          <div className="flex items-center gap-2">
            <Image
              src="/images/farmcitylogo.svg"
              alt="Farm City"
              width={188}
              height={188}
            />
          </div>
        </header>

        {/* Centered OTP Content */}
        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm text-center">
            <h1 className="text-2xl font-semibold mb-2">Enter 6 digit PIN</h1>
            <p className="text-gray-500 text-sm mb-8">
              Enter 6 digit code sent to{" "}
              <span className="font-medium text-gray-900">{email}</span>
            </p>

            {/* PIN Inputs */}
            <div className="mb-6">
              <div className="flex justify-center gap-3 mb-6">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-xl focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all"
                    autoComplete="off"
                  />
                ))}
              </div>

              {/* Resend Code */}
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm mb-2">
                  Didn't get the code?{" "}
                  <button
                    onClick={handleResend}
                    disabled={timeLeft > 0 || isResending}
                    className={`font-medium ${
                      timeLeft > 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-green-700 hover:text-green-800"
                    } transition-colors`}
                  >
                    {isResending ? "Sending..." : "Resend"}
                  </button>
                </p>
                {timeLeft > 0 && (
                  <p className="text-sm text-gray-500">
                    Resend available in{" "}
                    <span className="font-medium text-gray-900">
                      {formatTime(timeLeft)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isPinComplete || isVerifying}
              className="w-full h-12 rounded-full bg-green-700 hover:bg-green-800 text-white font-medium"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  VERIFYING...
                </span>
              ) : (
                "VERIFY EMAIL"
              )}
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}