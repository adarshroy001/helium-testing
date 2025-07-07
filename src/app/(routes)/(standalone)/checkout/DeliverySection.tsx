"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck } from "lucide-react"

interface FormData {
  firstName: string
  lastName: string
  gstin: string
  address: string
  apartment: string
  city: string
  state: string
  pincode: string
  phone: string
}

interface FormErrors {
  [key: string]: string
}

interface DeliverySectionProps {
  formData: FormData
  formErrors: FormErrors
  onInputChange: (field: keyof FormData, value: string) => void
  isDisabled: boolean
}

export default function DeliverySection({
  formData,
  formErrors,
  onInputChange,
  isDisabled
}: DeliverySectionProps) {
  return (
    <Card className={`bg-[#1a1a1a] border-gray-800 ${isDisabled ? 'opacity-50' : ''}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Delivery Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm text-gray-300 mb-2 block">Country/Region</Label>
          <Select defaultValue="india" disabled={isDisabled}>
            <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-gray-700">
              <SelectItem value="india">India</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-gray-300 mb-2 block">First name</Label>
            <Input
              value={formData.firstName}
              onChange={(e) => onInputChange('firstName', e.target.value)}
              className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                formErrors.firstName ? 'border-red-500' : ''
              }`}
              disabled={isDisabled}
              required
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
            )}
          </div>
          <div>
            <Label className="text-sm text-gray-300 mb-2 block">Last name</Label>
            <Input
              value={formData.lastName}
              onChange={(e) => onInputChange('lastName', e.target.value)}
              className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                formErrors.lastName ? 'border-red-500' : ''
              }`}
              disabled={isDisabled}
              required
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-300 mb-2 block">GSTIN (Optional)</Label>
          <Input
            placeholder="Enter GSTIN for business purchases"
            value={formData.gstin}
            onChange={(e) => onInputChange('gstin', e.target.value)}
            className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
            disabled={isDisabled}
          />
        </div>

        <div>
          <Label className="text-sm text-gray-300 mb-2 block">Address</Label>
          <Input
            placeholder="House number and street name"
            value={formData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
              formErrors.address ? 'border-red-500' : ''
            }`}
            disabled={isDisabled}
            required
          />
          {formErrors.address && (
            <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Apartment, suite, etc. (optional)"
            value={formData.apartment}
            onChange={(e) => onInputChange('apartment', e.target.value)}
            className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
            disabled={isDisabled}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-sm text-gray-300 mb-2 block">City</Label>
            <Input
              value={formData.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                formErrors.city ? 'border-red-500' : ''
              }`}
              disabled={isDisabled}
              required
            />
            {formErrors.city && (
              <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
            )}
          </div>
          <div>
            <Label className="text-sm text-gray-300 mb-2 block">State</Label>
            <Select 
              value={formData.state} 
              onValueChange={(value) => onInputChange('state', value)}
              disabled={isDisabled}
            >
              <SelectTrigger className={`bg-[#2a2a2a] border-gray-700 text-white ${
                formErrors.state ? 'border-red-500' : ''
              }`}>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2a2a] border-gray-700">
                <SelectItem value="bihar">Bihar</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                <SelectItem value="west-bengal">West Bengal</SelectItem>
                <SelectItem value="gujarat">Gujarat</SelectItem>
                <SelectItem value="rajasthan">Rajasthan</SelectItem>
                <SelectItem value="punjab">Punjab</SelectItem>
              </SelectContent>
            </Select>
            {formErrors.state && (
              <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
            )}
          </div>
          <div>
            <Label className="text-sm text-gray-300 mb-2 block">PIN code</Label>
            <Input
              value={formData.pincode}
              onChange={(e) => onInputChange('pincode', e.target.value)}
              className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                formErrors.pincode ? 'border-red-500' : ''
              }`}
              disabled={isDisabled}
              pattern="[0-9]{6}"
              maxLength={6}
              required
            />
            {formErrors.pincode && (
              <p className="text-red-500 text-sm mt-1">{formErrors.pincode}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-300 mb-2 block">Phone</Label>
          <Input
            type="tel"
            placeholder="+91 "
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
              formErrors.phone ? 'border-red-500' : ''
            }`}
            disabled={isDisabled}
            required
          />
          {formErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
          )}
        </div>

        {isDisabled && (
          <div className="p-3 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-400 text-sm">
              Please verify your email address to continue with delivery information.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
