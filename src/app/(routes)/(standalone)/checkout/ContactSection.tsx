"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Mail } from "lucide-react"

interface ContactSectionProps {
  email: string
  newsletter: boolean
  isVerified: boolean
  isVerifying: boolean
  onEmailChange: (email: string) => void
  onNewsletterChange: (checked: boolean) => void
  onVerifyEmail: () => void
  emailError?: string
}

export default function ContactSection({
  email,
  newsletter,
  isVerified,
  isVerifying,
  onEmailChange,
  onNewsletterChange,
  onVerifyEmail,
  emailError
}: ContactSectionProps) {
  const isValidEmail = /\S+@\S+\.\S+/.test(email)

  return (
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact
          {isVerified && (
            <CheckCircle className="w-5 h-5 text-green-400" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                emailError ? 'border-red-500' : isVerified ? 'border-green-500' : ''
              }`}
              disabled={isVerified}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          {!isVerified && (
            <Button
              onClick={onVerifyEmail}
              disabled={!isValidEmail || isVerifying}
              className="bg-[#f3942c] hover:bg-[#e8832a] text-black font-medium px-6"
            >
              {isVerifying ? 'Sending...' : 'Verify'}
            </Button>
          )}
        </div>

        {isVerified && (
          <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/50 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">Email verified successfully!</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
