"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PinVerification from "@/app/components/auth/pin-verification";
import { toast } from "@/app/components/ui/toast";
import { AuthService } from "@/services/auth.service";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  
  const email = searchParams.get("email");
  const userId = searchParams.get("userId");
  
  const handleVerify = async (otp: string) => {
    if (!userId) {
      toast("User ID is required for verification", "error");
      return;
    }
    
    setIsVerifying(true);
    try {
      const response = await AuthService.verifyOtp(Number(userId), otp);
      
      if (response.status) {
        toast(response.message || "Email verified successfully!", "success");
        
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        toast(response.message || "Invalid verification code", "error");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      toast(error.message || "Failed to verify email. Please try again.", "error");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast("Email is required to resend OTP", "error");
      return;
    }
    
    try {
      const response = await AuthService.resendOtp(email);
      
      if (response.status) {
        toast(response.message || "Verification code sent to your email!", "success");
      } else {
        toast(response.message || "Failed to resend code", "error");
      }
    } catch (error: any) {
      console.error("Resend error:", error);
      toast(error.message || "Failed to resend verification code", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <PinVerification
        email={email}
        onVerify={handleVerify}
        onResend={handleResend}
        isLoading={isVerifying}
      />
    </div>
  );
}