"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
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
import { Product } from "@/types/types"
import { products } from "@/mockdata/products"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State management
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [billingAddress, setBillingAddress] = useState("same")
  const [quantity, setQuantity] = useState<number>(1)
  const [discountCode, setDiscountCode] = useState("")
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get URL parameters
  const productId = searchParams.get('productId')
  const urlQuantity = searchParams.get('quantity')
  useEffect(()=>{  console.log('product and quantity',productId,urlQuantity);},[])
  

  // Helper function to extract numeric value from price string
  const extractPrice = useCallback((priceString: string | number): number => {
    if (typeof priceString === 'number') return priceString;
    const cleaned = priceString.replace(/[₹\s,]/g, '');
    return parseInt(cleaned, 10) || 0;
  }, []);

  // Load product and quantity from URL params
  useEffect(() => {
    if (productId) {
          console.log('2.product and quantity',productId,urlQuantity);
      try {
        const foundProduct = products.find((p) => p.id === productId) as Product;
        if (foundProduct) {
          setProduct(foundProduct);
          // Set quantity from URL if provided
          console.log('product and quantity',productId,urlQuantity);
          if (urlQuantity) {
            const parsedQuantity = parseInt(urlQuantity, 10);
            if (parsedQuantity > 0) {
              setQuantity(parsedQuantity);
            }
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Error loading product');
      }
    } else {
    console.log('1.product and quantity',productId,urlQuantity);
      setError('No product specified');
    }
    setLoading(false);
  }, [productId, urlQuantity]);

  // Calculate pricing with useMemo for performance
  const pricing = useMemo(() => {
    if (!product) {
      return {
        productPrice: 0,
        originalPrice: 0,
        discount: 0,
        discountPercentage: 0,
        taxes: 0,
        finalPrice: 0
      };
    }

    const currentPrice = extractPrice(product.price);
    const originalPrice = product.originalPrice ? extractPrice(product.originalPrice) : currentPrice;
    const basePrice = currentPrice * quantity;
    const originalTotal = originalPrice * quantity;
    const discount = originalTotal - basePrice;
    const discountPercentage = originalPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;
    const taxes = Math.round(basePrice * 0.18); // 18% GST
    const finalPrice = basePrice + taxes;

    return {
      productPrice: basePrice,
      originalPrice: originalTotal,
      discount,
      discountPercentage,
      taxes,
      finalPrice
    };
  }, [product, quantity, extractPrice]);

  // Handle quantity changes
  const handleQuantityChange = useCallback((change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  }, []);

  // Handle discount code application
  const handleApplyDiscount = useCallback(() => {
    // Add discount logic here
    console.log('Applying discount code:', discountCode);
  }, [discountCode]);

  // Handle payment processing
  const handlePayment = useCallback(() => {
    if (!product) return;
    
    // Add payment processing logic here
    console.log('Processing payment for:', {
      product: product.name,
      quantity,
      total: pricing.finalPrice,
      paymentMethod
    });
  }, [product, quantity, pricing.finalPrice, paymentMethod]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f3942c] mx-auto mb-4"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
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
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#f3942c] mb-2">Helium</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Cart</span>
            <span>→</span>
            <span>Information</span>
            <span>→</span>
            <span>Shipping</span>
            <span>→</span>
            <span className="text-white">Payment</span>
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
                    className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" className="border-gray-600" />
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
                      className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400" 
                      required 
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Last name</Label>
                    <Input 
                      className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">GSTIN (Optional)</Label>
                  <Input
                    placeholder="Enter GSTIN for business purchases"
                    className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Address</Label>
                  <Input
                    placeholder="House number and street name"
                    className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <Input
                    placeholder="Apartment, suite, etc. (optional)"
                    className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">City</Label>
                    <Input 
                      className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400" 
                      required 
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">State</Label>
                    <Select>
                      <SelectTrigger className="bg-[#2a2a2a] border-gray-700 text-white">
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
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">PIN code</Label>
                    <Input 
                      className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400" 
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Phone</Label>
                  <Input
                    type="tel"
                    placeholder="+91 "
                    className="bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="save-info" className="border-gray-600" />
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
                  <div className="relative w-20 h-20 bg-[#2a2a2a] rounded-lg overflow-hidden">
                    <Image
                      src={product.image || "/placeholder-product.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-product.jpg";
                      }}
                    />
                    <div className="absolute -top-2 -right-2 bg-[#f3942c] text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    {product.tonnage && (
                      <p className="text-sm text-gray-400">{product.tonnage}</p>
                    )}
                    <p className="text-sm text-gray-400">3 Star | Inverter</p>
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

                  {pricing.discount > 0 && (
                    <div className="text-center text-sm text-green-400">
                      You save ₹{pricing.discount.toLocaleString()}!
                    </div>
                  )}
                </div>

                {/* Pay Now Button */}
                <Button 
                  className="w-full bg-[#f3942c] hover:bg-[#e8832a] text-black font-semibold py-3 text-lg"
                  onClick={handlePayment}
                >
                  Pay Now - ₹{pricing.finalPrice.toLocaleString()}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  By placing your order, you agree to Helium's Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}