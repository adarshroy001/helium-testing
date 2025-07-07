"use client"

import { useMemo } from "react"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface ProductFromAPI {
  _id: string
  name: string
  description: string
  inverter: boolean
  colors: {
    colorName: string
    hex: string
    images: string[]
    Ton: {
      ton: number
      stars: {
        star: number
        MRP: number
        sellingPrice: number
        stock: number
        tag: string
      }[]
    }[]
  }[]
}

interface SelectedVariant {
  color: string
  colorHex: string
  images: string[]
  tonnage: number
  star: number
  MRP: number
  sellingPrice: number
  stock: number
  tag: string
}

interface OrderSummaryProps {
  product: ProductFromAPI
  selectedVariant: SelectedVariant
  quantity: number
  discountCode: string
  appliedDiscount: number
  isVerified: boolean
  isProcessingPayment: boolean
  onQuantityChange: (change: number) => void
  onDiscountCodeChange: (code: string) => void
  onApplyDiscount: () => void
  onPayment: () => void
}

export default function OrderSummary({
  product,
  selectedVariant,
  quantity,
  discountCode,
  appliedDiscount,
  isVerified,
  isProcessingPayment,
  onQuantityChange,
  onDiscountCodeChange,
  onApplyDiscount,
  onPayment
}: OrderSummaryProps) {
  // Calculate pricing
  const pricing = useMemo(() => {
    const currentPrice = selectedVariant.sellingPrice
    const originalPrice = selectedVariant.MRP
    const basePrice = currentPrice * quantity
    const originalTotal = originalPrice * quantity
    const discount = originalTotal - basePrice
    const discountPercentage = originalPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0
    
    const appliedDiscountAmount = Math.round(basePrice * (appliedDiscount / 100))
    const discountedPrice = basePrice - appliedDiscountAmount
    
    const taxes = Math.round(discountedPrice * 0.18) // 18% GST
    const finalPrice = discountedPrice + taxes

    return {
      productPrice: basePrice,
      originalPrice: originalTotal,
      discount,
      discountPercentage,
      appliedDiscountAmount,
      taxes,
      finalPrice
    }
  }, [selectedVariant, quantity, appliedDiscount])

  return (
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Product */}
        <div className="flex gap-4">
          <div className="relative w-24 md:w-40 h-12 md:h-20 bg-[#2a2a2a] rounded-lg overflow-hidden">
            <Image
              src={selectedVariant.images?.[0] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder-product.jpg"
              }}
            />
            <div className="absolute top-0 right-0 bg-[#f3942c] text-black text-xs rounded-full h-4 w-4 md:w-6 md:h-6 flex items-center justify-center font-medium md:font-semibold">
              {quantity}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-400">{selectedVariant.tonnage} Ton</p>
            <p className="text-sm text-gray-400">Color: {selectedVariant.color}</p>
            <p className="text-sm text-gray-400">
              {selectedVariant.star} Star | {product.inverter ? 'Inverter' : 'Non-Inverter'}
            </p>
            {selectedVariant.tag && (
              <span className="inline-block px-2 py-1 text-xs bg-[#f3942c] text-black rounded-full mt-1">
                {selectedVariant.tag}
              </span>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 bg-[#2a2a2a] border-gray-700 hover:bg-[#3a3a3a]"
                onClick={() => onQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm min-w-[2rem] text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 bg-[#2a2a2a] border-gray-700 hover:bg-[#3a3a3a]"
                onClick={() => onQuantityChange(1)}
                disabled={quantity >= selectedVariant.stock}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">₹{pricing.productPrice.toLocaleString()}</p>
            {pricing.originalPrice > pricing.productPrice && (
              <p className="text-sm text-gray-500 line-through">
                ₹{pricing.originalPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <Separator className="bg-gray-700" />

        {/* Discount Code */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => onDiscountCodeChange(e.target.value)}
              className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
            />
            <Button
              variant="outline"
              className="bg-[#2a2a2a] border-gray-700 text-white hover:bg-[#3a3a3a]"
              onClick={onApplyDiscount}
              disabled={!discountCode.trim()}
            >
              Apply
            </Button>
          </div>
          {appliedDiscount > 0 && (
            <div className="text-sm text-green-400">
              Discount code applied! {appliedDiscount}% off
            </div>
          )}
        </div>

        <Separator className="bg-gray-700" />

        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Subtotal</span>
            <span>₹{pricing.productPrice.toLocaleString()}</span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex justify-between text-green-400">
              <span>Discount ({pricing.discountPercentage}% OFF)</span>
              <span>-₹{pricing.discount.toLocaleString()}</span>
            </div>
          )}
          {pricing.appliedDiscountAmount > 0 && (
            <div className="flex justify-between text-green-400">
              <span>Coupon Discount ({appliedDiscount}% OFF)</span>
              <span>-₹{pricing.appliedDiscountAmount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-300">Shipping</span>
            <span className="text-green-400">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Taxes (GST 18%)</span>
            <span>₹{pricing.taxes.toLocaleString()}</span>
          </div>

          <Separator className="bg-gray-700" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{pricing.finalPrice.toLocaleString()}</span>
          </div>

          {(pricing.discount > 0 || pricing.appliedDiscountAmount > 0) && (
            <div className="text-center text-sm text-green-400">
              You save ₹{(pricing.discount + pricing.appliedDiscountAmount).toLocaleString()}!
            </div>
          )}
        </div>

        {/* Stock Warning */}
        {selectedVariant.stock <= 5 && (
          <div className="p-3 bg-orange-900/20 border border-orange-500/50 rounded-lg">
            <p className="text-orange-400 text-sm">
              Only {selectedVariant.stock} items left in stock!
            </p>
          </div>
        )}

        {/* Verification Warning */}
        {!isVerified && (
          <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">
              Please verify your email address to proceed with payment.
            </p>
          </div>
        )}

        {/* Pay Now Button */}
        <Button
          className="w-full bg-[#f3942c] hover:bg-[#e8832a] text-black font-semibold py-3 text-lg disabled:opacity-50"
          onClick={onPayment}
          disabled={!isVerified || isProcessingPayment || selectedVariant.stock === 0}
        >
          {isProcessingPayment ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
              Processing...
            </>
          ) : selectedVariant.stock === 0 ? (
            'Out of Stock'
          ) : !isVerified ? (
            'Verify Email to Pay'
          ) : (
            `Pay Now - ₹${pricing.finalPrice.toLocaleString()}`
          )}
        </Button>

        <p className="text-xs text-gray-400 text-center">
          By placing your order, you agree to Helium's Terms of Service and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  )
}
