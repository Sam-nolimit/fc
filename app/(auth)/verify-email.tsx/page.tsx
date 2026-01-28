"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PinVerification from "@/app/components/auth/pin-verification";
import { toast } from "@/app/components/ui/toast"; // You'll need to create this toast component

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Get email from query params or use default
  const email = searchParams.get("email") || "johndemulee@gmail.com";

  const handleVerify = async (pin: string) => {
    setIsVerifying(true);
    try {
      // Call your verification API
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pin }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message
        toast.success("Email verified successfully!");
        
        // Redirect to dashboard or next step
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        toast.error(data.message || "Invalid verification code");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to verify email. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      // Call your resend API
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Verification code sent to your email!");
      } else {
        toast.error(data.message || "Failed to resend code");
      }
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("Failed to resend verification code");
    }
  };

  return (
    <PinVerification
      email={email}
      onVerify={handleVerify}
      onResend={handleResend}
    />
  );
}