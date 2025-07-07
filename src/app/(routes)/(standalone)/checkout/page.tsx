"use client"

import { useEffect, useState, useCallback, useMemo, Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/Logo"

// Components
import ContactSection from "./ContactSection"
import OTPVerification from "./OTPVerification"
import DeliverySection from "./DeliverySection"
import OrderSummary from "./OrderSummary"

// Types
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
  createdAt: string
  updatedAt: string
  __v: number
}

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

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Authentication state
  const [email, setEmail] = useState("")
  const [newsletter, setNewsletter] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showOTPField, setShowOTPField] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [otpError, setOtpError] = useState("")

  // Product and order state
  const [quantity, setQuantity] = useState<number>(1)
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [product, setProduct] = useState<ProductFromAPI | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    gstin: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})

  // Get URL parameters
  const productId = searchParams.get('productId')
  const urlQuantity = searchParams.get('quantity')
  const colorIndex = searchParams.get('colorIndex')
  const tonnageIndex = searchParams.get('tonnageIndex')
  const starIndex = searchParams.get('starIndex')

  // Fetch product from API
  const fetchProduct = useCallback(async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/products/${id}`)
      
      if (!response.ok) {
        throw new Error('Product not found')
      }
      
      const productData: ProductFromAPI = await response.json()
      setProduct(productData)
      
      if (urlQuantity) {
        const parsedQuantity = parseInt(urlQuantity, 10)
        if (parsedQuantity > 0) {
          setQuantity(parsedQuantity)
        }
      }
    } catch (err) {
      console.error('Error fetching product:', err)
      setError('Failed to load product details')
    } finally {
      setLoading(false)
    }
  }, [urlQuantity])

  // Load product from API
  useEffect(() => {
    if (productId) {
      fetchProduct(productId)
    } else {
      setError('No product specified')
      setLoading(false)
    }
  }, [productId, fetchProduct])

  // Get selected variant details
  const selectedVariant = useMemo(() => {
    if (!product || colorIndex === null || tonnageIndex === null || starIndex === null) {
      return null
    }

    const colorIdx = parseInt(colorIndex)
    const tonIdx = parseInt(tonnageIndex)
    const starIdx = parseInt(starIndex)

    const selectedColor = product.colors[colorIdx]
    if (!selectedColor) return null

    const selectedTonnage = selectedColor.Ton[tonIdx]
    if (!selectedTonnage) return null

    const selectedStar = selectedTonnage.stars[starIdx]
    if (!selectedStar) return null

    return {
      color: selectedColor.colorName,
      colorHex: selectedColor.hex,
      images: selectedColor.images,
      tonnage: selectedTonnage.ton,
      star: selectedStar.star,
      MRP: selectedStar.MRP,
      sellingPrice: selectedStar.sellingPrice,
      stock: selectedStar.stock,
      tag: selectedStar.tag
    }
  }, [product, colorIndex, tonnageIndex, starIndex])

  // Email verification handlers
  const handleVerifyEmail = useCallback(async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    setIsVerifying(true)
    setEmailError("")

    try {
      // Send OTP to email
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setShowOTPField(true)
        console.log('OTP sent to:', email)
      } else {
        setEmailError('Failed to send OTP. Please try again.')
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
      setEmailError('Failed to send OTP. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }, [email])

  const handleVerifyOTP = useCallback(async (otp: string) => {
    setIsVerifying(true)
    setOtpError("")

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      if (response.ok) {
        setIsVerified(true)
        setShowOTPField(false)
        console.log('Email verified successfully')
      } else {
        setOtpError('Invalid OTP. Please try again.')
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      setOtpError('Failed to verify OTP. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }, [email])

  const handleResendOTP = useCallback(async () => {
    handleVerifyEmail()
  }, [handleVerifyEmail])

  // Form validation
  const validateForm = useCallback(() => {
    const errors: FormErrors = {}
    
    if (!formData.firstName) errors.firstName = 'First name is required'
    if (!formData.lastName) errors.lastName = 'Last name is required'
    if (!formData.address) errors.address = 'Address is required'
    if (!formData.city) errors.city = 'City is required'
    if (!formData.state) errors.state = 'State is required'
    if (!formData.phone) errors.phone = 'Phone number is required'
    
    if (!formData.pincode) {
      errors.pincode = 'PIN code is required'
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit PIN code'
    }
    
    return errors
  }, [formData])

  // Handle form input changes
  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }, [formErrors])

  // Handle quantity changes
  const handleQuantityChange = useCallback((change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }, [])

  // Handle discount code application
  const handleApplyDiscount = useCallback(() => {
    if (!discountCode.trim()) return

    const discountCodes = {
      'WELCOME10': 10,
      'SAVE15': 15,
      'HELIUM20': 20,
      'FIRST5': 5
    }

    const discountAmount = discountCodes[discountCode.toUpperCase() as keyof typeof discountCodes]
    
    if (discountAmount) {
      setAppliedDiscount(discountAmount)
      setDiscountCode('')
    } else {
      alert('Invalid discount code')
    }
  }, [discountCode])

  // Handle Razorpay payment
  const handlePayment = useCallback(async () => {
    if (!product || !selectedVariant || !isVerified) return

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      const firstErrorElement = document.querySelector('[data-error="true"]')
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsProcessingPayment(true)

    try {
      // Calculate final price
      const currentPrice = selectedVariant.sellingPrice
      const basePrice = currentPrice * quantity
      const appliedDiscountAmount = Math.round(basePrice * (appliedDiscount / 100))
      const discountedPrice = basePrice - appliedDiscountAmount
      const taxes = Math.round(discountedPrice * 0.18)
      const finalPrice = discountedPrice + taxes

      const orderData = {
        productId,
        quantity,
        selectedVariant,
        customerInfo: { email, ...formData },
        totalAmount: finalPrice,
        appliedDiscount
      }

      // Create order in backend
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      const { razorpayOrderId, orderId } = await response.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: finalPrice * 100,
        currency: "INR",
        name: "Helium",
        description: `${product.name} - ${selectedVariant.tonnage} Ton`,
        order_id: razorpayOrderId,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: email,
          contact: formData.phone
        },
        theme: {
          color: "#f3942c"
        },
        handler: function(response: any) {
          const orderParams = new URLSearchParams({
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            amount: finalPrice.toString(),
            product: product.name,
            quantity: quantity.toString()
          })

          router.push(`/order-confirmation?${orderParams.toString()}`)
        },
        modal: {
          ondismiss: function() {
            setIsProcessingPayment(false)
            console.log('Payment cancelled')
          }
        }
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()
      
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
      setIsProcessingPayment(false)
    }
  }, [product, selectedVariant, isVerified, quantity, appliedDiscount, formData, email, validateForm, router, productId])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f3942c] mx-auto mb-4"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !product || !selectedVariant) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || 'Product Not Found'}</h1>
          <Button
            onClick={() => router.push('/shop')}
            className="bg-[#f3942c] hover:bg-[#e8832a] text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-white bg-[#0e0e0e] px-2 md:px-20 py-4 md:py-28">
      <div className="container mx-auto py-2">
        <div className="block md:hidden">
          <Logo />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-8">
          {/* Contact Section */}
          <ContactSection
            email={email}
            newsletter={newsletter}
            isVerified={isVerified}
            isVerifying={isVerifying}
            onEmailChange={(email) => {
              setEmail(email)
              setEmailError("")
            }}
            onNewsletterChange={setNewsletter}
            onVerifyEmail={handleVerifyEmail}
            emailError={emailError}
          />

          {/* OTP Verification */}
          <OTPVerification
            email={email}
            isVisible={showOTPField}
            isVerifying={isVerifying}
            onVerifyOTP={handleVerifyOTP}
            onResendOTP={handleResendOTP}
            otpError={otpError}
          />

          {/* Delivery Section */}
          <DeliverySection
            formData={formData}
            formErrors={formErrors}
            onInputChange={handleInputChange}
            isDisabled={!isVerified}
          />
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <OrderSummary
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
            discountCode={discountCode}
            appliedDiscount={appliedDiscount}
            isVerified={isVerified}
            isProcessingPayment={isProcessingPayment}
            onQuantityChange={handleQuantityChange}
            onDiscountCodeChange={setDiscountCode}
            onApplyDiscount={handleApplyDiscount}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  )
}

// Loading fallback
function CheckoutPageFallback() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f3942c] mx-auto mb-4"></div>
        <p>Loading checkout...</p>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutPageFallback />}>
      <CheckoutContent />
    </Suspense>
  )
}