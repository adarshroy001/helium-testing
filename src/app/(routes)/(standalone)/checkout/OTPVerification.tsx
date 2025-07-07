"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, RefreshCw } from "lucide-react"

interface OTPVerificationProps {
  email: string
  isVisible: boolean
  isVerifying: boolean
  onVerifyOTP: (otp: string) => void
  onResendOTP: () => void
  otpError?: string
}

export default function OTPVerification({
  email,
  isVisible,
  isVerifying,
  onVerifyOTP,
  onResendOTP,
  otpError
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // Countdown timer for resend OTP
  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [isVisible, countdown])

  const handleOtpChange = useCallback((value: string) => {
    // Only allow 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6)
    setOtp(numericValue)
  }, [])

  const handleVerifyOTP = useCallback(() => {
    if (otp.length === 6) {
      onVerifyOTP(otp)
    }
  }, [otp, onVerifyOTP])

  const handleResendOTP = useCallback(() => {
    onResendOTP()
    setCountdown(60)
    setCanResend(false)
    setOtp("")
  }, [onResendOTP])

  // Auto-verify when 6 digits are entered
  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOTP()
    }
  }, [otp, handleVerifyOTP])

  if (!isVisible) return null

  return (
    <Card className="bg-[#1a1a1a] border-gray-800 animate-in slide-in-from-top-2 duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#f3942c]" />
          Verify Your Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300">
          We've sent a 6-digit verification code to{" "}
          <span className="font-medium text-white">{email}</span>
        </div>

        <div>
          <Label className="text-sm text-gray-300 mb-2 block">Enter OTP</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => handleOtpChange(e.target.value)}
              className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 text-center text-lg tracking-widest ${
                otpError ? 'border-red-500' : ''
              }`}
              maxLength={6}
              autoComplete="one-time-code"
            />
            <Button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || isVerifying}
              className="bg-[#f3942c] hover:bg-[#e8832a] text-black font-medium px-6"
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
          {otpError && (
            <p className="text-red-500 text-sm mt-1">{otpError}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Didn't receive the code?
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResendOTP}
            disabled={!canResend}
            className="text-[#f3942c] hover:text-[#e8832a] hover:bg-[#2a2a2a]"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            {canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
