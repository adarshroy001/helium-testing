"use client"

import { useEffect, useState, useCallback, useMemo, Suspense } from "react"
import { CreditCard, Smartphone, Wallet, Building2, Minus, Plus, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Logo from "@/components/ui/Logo"

// Updated Product interface to match API response
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

// Form data interface
interface FormData {
  email: string
  firstName: string
  lastName: string
  gstin: string
  address: string
  apartment: string
  city: string
  state: string
  pincode: string
  phone: string
  newsletter: boolean
  saveInfo: boolean
}

interface FormErrors {
  [key: string]: string
}

// Separate component to handle search params
function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State management
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [billingAddress, setBillingAddress] = useState("same")
  const [quantity, setQuantity] = useState<number>(1)
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [product, setProduct] = useState<ProductFromAPI | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    gstin: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    newsletter: false,
    saveInfo: false
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})

  // Card details state (only shown when card is selected)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })

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
      
      // Set quantity from URL if provided
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

  // Get selected variant details based on indices
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

  // Form validation
  const validateForm = useCallback(() => {
    const errors: FormErrors = {}
    
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
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

    // Card validation if card payment is selected
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber) errors.cardNumber = 'Card number is required'
      if (!cardDetails.expiryDate) errors.expiryDate = 'Expiry date is required'
      if (!cardDetails.cvv) errors.cvv = 'CVV is required'
      if (!cardDetails.cardholderName) errors.cardholderName = 'Cardholder name is required'
    }
    
    return errors
  }, [formData, paymentMethod, cardDetails])

  // Handle form input changes
  const handleInputChange = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }, [formErrors])

  // Handle card details change
  const handleCardChange = useCallback((field: string, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }, [formErrors])

  // Calculate pricing with useMemo for performance
  const pricing = useMemo(() => {
    if (!selectedVariant) {
      return {
        productPrice: 0,
        originalPrice: 0,
        discount: 0,
        discountPercentage: 0,
        appliedDiscountAmount: 0,
        taxes: 0,
        finalPrice: 0
      }
    }

    const currentPrice = selectedVariant.sellingPrice
    const originalPrice = selectedVariant.MRP
    const basePrice = currentPrice * quantity
    const originalTotal = originalPrice * quantity
    const discount = originalTotal - basePrice
    const discountPercentage = originalPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0
    
    // Apply additional discount from discount code
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

  // Handle quantity changes
  const handleQuantityChange = useCallback((change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }, [])

  // Handle discount code application
  const handleApplyDiscount = useCallback(() => {
    if (!discountCode.trim()) return

    // Simple discount logic - you can expand this
    const discountCodes = {
      'WELCOME10': 10,
      'SAVE15': 15,
      'HELIUM20': 20,
      'FIRST5': 5
    }

    const discountAmount = discountCodes[discountCode.toUpperCase() as keyof typeof discountCodes]
    
    if (discountAmount) {
      setAppliedDiscount(discountAmount)
      setDiscountCode('') // Clear the input
    } else {
      alert('Invalid discount code')
    }
  }, [discountCode])

  // Handle payment processing
  const handlePayment = useCallback(async () => {
    if (!product || !selectedVariant) return

    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      // Scroll to first error
      const firstErrorElement = document.querySelector('[data-error="true"]')
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setIsProcessingPayment(true)

    try {
      const orderData = {
        productId,
        quantity,
        selectedVariant,
        customerInfo: formData,
        paymentMethod,
        cardDetails: paymentMethod === 'card' ? cardDetails : null,
        billingAddress,
        totalAmount: pricing.finalPrice,
        appliedDiscount,
        discountCode: appliedDiscount > 0 ? 'Applied' : null
      }

      console.log('Processing payment for:', orderData)

      // Here you can add your actual payment API call
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData)
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Redirect to order confirmation
      const orderParams = new URLSearchParams({
        orderId: `HEL${Date.now()}`,
        amount: pricing.finalPrice.toString(),
        product: product.name,
        quantity: quantity.toString()
      })

      router.push(`/order-confirmation?${orderParams.toString()}`)
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessingPayment(false)
    }
  }, [product, selectedVariant, quantity, pricing.finalPrice, paymentMethod, formData, cardDetails, billingAddress, appliedDiscount, validateForm, router, productId])

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
        {/* Header */}
        <div className="block md:hidden">
          <Logo />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Checkout Form */}
        <div className="space-y-8">
          {/* Contact Section */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email or mobile phone number"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                    formErrors.email ? 'border-red-500' : ''
                  }`}
                  data-error={!!formErrors.email}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newsletter" 
                  className="border-gray-600"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                />
                <Label htmlFor="newsletter" className="text-sm text-gray-300">
                  Email me with news and offers
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Section */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-300 mb-2 block">Country/Region</Label>
                <Select defaultValue="india">
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
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                      formErrors.firstName ? 'border-red-500' : ''
                    }`}
                    data-error={!!formErrors.firstName}
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
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                      formErrors.lastName ? 'border-red-500' : ''
                    }`}
                    data-error={!!formErrors.lastName}
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
                  onChange={(e) => handleInputChange('gstin', e.target.value)}
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label className="text-sm text-gray-300 mb-2 block">Address</Label>
                <Input
                  placeholder="House number and street name"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                    formErrors.address ? 'border-red-500' : ''
                  }`}
                  data-error={!!formErrors.address}
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
                  onChange={(e) => handleInputChange('apartment', e.target.value)}
                  className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                      formErrors.city ? 'border-red-500' : ''
                    }`}
                    data-error={!!formErrors.city}
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
                    onValueChange={(value) => handleInputChange('state', value)}
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
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                      formErrors.pincode ? 'border-red-500' : ''
                    }`}
                    data-error={!!formErrors.pincode}
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
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400 ${
                    formErrors.phone ? 'border-red-500' : ''
                  }`}
                  data-error={!!formErrors.phone}
                  required
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="save-info" 
                  className="border-gray-600"
                  checked={formData.saveInfo}
                  onCheckedChange={(checked) => handleInputChange('saveInfo', checked as boolean)}
                />
                <Label htmlFor="save-info" className="text-sm text-gray-300">
                  Save this information for next time
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:border-[#f3942c] transition-colors">
                  <RadioGroupItem value="upi" id="upi" className="border-gray-600" />
                  <Smartphone className="w-5 h-5 text-[#f3942c]" />
                  <Label htmlFor="upi" className="flex-1 font-medium cursor-pointer">
                    UPI
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:border-[#f3942c] transition-colors">
                  <RadioGroupItem value="card" id="card" className="border-gray-600" />
                  <CreditCard className="w-5 h-5 text-[#f3942c]" />
                  <Label htmlFor="card" className="flex-1 font-medium cursor-pointer">
                    Credit/Debit Card
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:border-[#f3942c] transition-colors">
                  <RadioGroupItem value="wallet" id="wallet" className="border-gray-600" />
                  <Wallet className="w-5 h-5 text-[#f3942c]" />
                  <Label htmlFor="wallet" className="flex-1 font-medium cursor-pointer">
                    Wallets
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border border-gray-700 rounded-lg hover:border-[#f3942c] transition-colors">
                  <RadioGroupItem value="netbanking" id="netbanking" className="border-gray-600" />
                  <Building2 className="w-5 h-5 text-[#f3942c]" />
                  <Label htmlFor="netbanking" className="flex-1 font-medium cursor-pointer">
                    Net Banking
                  </Label>
                </div>
              </RadioGroup>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 p-4 bg-[#2a2a2a] rounded-lg border border-gray-700">
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Card Number</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={(e) => handleCardChange('cardNumber', e.target.value)}
                      className={`bg-[#1a1a1a] border-gray-600 text-white ${
                        formErrors.cardNumber ? 'border-red-500' : ''
                      }`}
                      maxLength={19}
                    />
                    {formErrors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Cardholder Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={cardDetails.cardholderName}
                      onChange={(e) => handleCardChange('cardholderName', e.target.value)}
                      className={`bg-[#1a1a1a] border-gray-600 text-white ${
                        formErrors.cardholderName ? 'border-red-500' : ''
                      }`}
                    />
                    {formErrors.cardholderName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.cardholderName}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-300 mb-2 block">Expiry Date</Label>
                      <Input
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={(e) => handleCardChange('expiryDate', e.target.value)}
                        className={`bg-[#1a1a1a] border-gray-600 text-white ${
                          formErrors.expiryDate ? 'border-red-500' : ''
                        }`}
                        maxLength={5}
                      />
                      {formErrors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm text-gray-300 mb-2 block">CVV</Label>
                      <Input
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => handleCardChange('cvv', e.target.value)}
                        className={`bg-[#1a1a1a] border-gray-600 text-white ${
                          formErrors.cvv ? 'border-red-500' : ''
                        }`}
                        maxLength={4}
                      />
                      {formErrors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* EMI Option */}
              <div className="p-4 bg-[#2a2a2a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#f3942c]">Pay 25% now, rest later</span>
                  <span className="text-sm text-gray-400">Powered by Snapmint</span>
                </div>
                <p className="text-sm text-gray-300">
                  Pay ₹{Math.round(pricing.finalPrice * 0.25).toLocaleString()} now and the remaining amount in easy EMIs
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card className="bg-[#1a1a1a] border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Billing address</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={billingAddress} onValueChange={setBillingAddress} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="same" id="same" className="border-gray-600" />
                  <Label htmlFor="same" className="cursor-pointer">Same as shipping address</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="different" id="different" className="border-gray-600" />
                  <Label htmlFor="different" className="cursor-pointer">Use a different billing address</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
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
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm min-w-[2rem] text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 bg-[#2a2a2a] border-gray-700 hover:bg-[#3a3a3a]"
                      onClick={() => handleQuantityChange(1)}
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
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
                  />
                  <Button
                    variant="outline"
                    className="bg-[#2a2a2a] border-gray-700 text-white hover:bg-[#3a3a3a]"
                    onClick={handleApplyDiscount}
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

              {/* Pay Now Button */}
              <Button
                className="w-full bg-[#f3942c] hover:bg-[#e8832a] text-black font-semibold py-3 text-lg disabled:opacity-50"
                onClick={handlePayment}
                disabled={isProcessingPayment || selectedVariant.stock === 0}
              >
                {isProcessingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Processing...
                  </>
                ) : selectedVariant.stock === 0 ? (
                  'Out of Stock'
                ) : (
                  `Pay Now - ₹${pricing.finalPrice.toLocaleString()}`
                )}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By placing your order, you agree to Helium's Terms of Service and Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Loading fallback component
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

// Main component wrapped with Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutPageFallback />}>
      <CheckoutContent />
    </Suspense>
  )
}
