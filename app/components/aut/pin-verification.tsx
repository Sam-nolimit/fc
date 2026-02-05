"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PinVerificationProps {
  email?: string | null;
  onVerify?: (pin: string) => void;
  onResend?: () => void;
  isLoading?: boolean; // Fixed: Add this prop
  countdownDuration?: number; // in seconds
}

export default function PinVerification({
  email = "johndemulee@gmail.com",
  onVerify,
  onResend,
  isLoading = false, // Fixed: Add this with default value
  countdownDuration = 60,
}: PinVerificationProps) {
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(countdownDuration);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
    newPin[index] = value.slice(-1); // Take only the last character
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

  const handleResend = async () => {
    if (timeLeft > 0) return;

    setIsResending(true);
    try {
      // Call the resend API
      await onResend?.();
      setTimeLeft(countdownDuration);
    } catch (error) {
      console.error("Failed to resend code:", error);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = () => {
    const pinString = pin.join("");
    if (pinString.length === 6) {
      onVerify?.(pinString);
    }
  };

  const isPinComplete = pin.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Back Button */}
      <header className="p-6">
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Image
              src="/images/farmcitylogo.svg"
              alt="Farm City"
              width={188}
              height={188}
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Enter 6 digit PIN
          </h2>
          <p className="text-gray-600 mb-8">
            Enter 6 digit code sent to{" "}
            <span className="font-medium text-gray-900">{email}</span>
          </p>

          {/* PIN Inputs */}
          <div className="mb-8">
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
                  className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all"
                  autoComplete="off"
                />
              ))}
            </div>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-gray-600 mb-2">
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

          {/* Verify Button - Fixed: Use isLoading instead of isVerifying */}
          <Button
            onClick={handleSubmit}
            disabled={!isPinComplete || isLoading}
            className="w-full h-12 rounded-full bg-green-700 hover:bg-green-800 text-white font-medium"
            size="lg"
          >
            {isLoading ? (
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
  );
}
