"use client"

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footertwo = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-[#033129] to-[#021F1B] text-[#F1F1F1] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-raleway text-[#A9E5C2]">Stay Cool, Stay Connected</h2>
          <p className="text-[#9BAEA0] mb-8 max-w-2xl mx-auto">
            Get the latest updates on smart cooling solutions and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-[#145546]/30 border border-[#145546] text-[#F1F1F1] placeholder-[#9BAEA0] focus:outline-none focus:border-[#00FFD1] transition-colors"
            />
            <Button className="bg-[#00FFD1] text-[#033129] hover:bg-[#4AFFC2] font-semibold px-6 py-3 rounded-lg transition-colors">
              <Send className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Card */}
          <div className="bg-[#145546]/20 p-6 rounded-2xl border border-[#145546]/50 hover:border-[#A9E5C2]/30 transition-colors">
            <div className="w-12 h-12 bg-[#00FFD1] rounded-full flex items-center justify-center mb-4">
              <span className="text-[#033129] font-bold text-xl">H</span>
            </div>
            <h3 className="text-xl font-bold mb-3 font-raleway text-[#A9E5C2]">Helium</h3>
            <p className="text-[#9BAEA0] text-sm leading-relaxed">
              Smart air conditioning solutions for the modern home
            </p>
          </div>

          {/* Quick Links Card */}
          <div className="bg-[#145546]/20 p-6 rounded-2xl border border-[#145546]/50 hover:border-[#A9E5C2]/30 transition-colors">
            <h3 className="text-lg font-bold mb-4 text-[#F1F1F1]">Explore</h3>
            <div className="space-y-3">
              <Link href="#products" className="block text-[#9BAEA0] hover:text-[#00FFD1] transition-colors text-sm">
                → Our Products
              </Link>
              <Link href="#about" className="block text-[#9BAEA0] hover:text-[#00FFD1] transition-colors text-sm">
                → About Us
              </Link>
              <Link href="#support" className="block text-[#9BAEA0] hover:text-[#00FFD1] transition-colors text-sm">
                → Support Center
              </Link>
              <Link href="#blog" className="block text-[#9BAEA0] hover:text-[#00FFD1] transition-colors text-sm">
                → Blog & News
              </Link>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-[#145546]/20 p-6 rounded-2xl border border-[#145546]/50 hover:border-[#A9E5C2]/30 transition-colors">
            <h3 className="text-lg font-bold mb-4 text-[#F1F1F1]">Connect</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A9E5C2]/20 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-[#A9E5C2]" />
                </div>
                <span className="text-[#9BAEA0] text-sm">support@helium.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A9E5C2]/20 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#A9E5C2]" />
                </div>
                <span className="text-[#9BAEA0] text-sm">1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#A9E5C2]/20 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-[#A9E5C2]" />
                </div>
                <span className="text-[#9BAEA0] text-sm">Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Social Card */}
          <div className="bg-[#145546]/20 p-6 rounded-2xl border border-[#145546]/50 hover:border-[#A9E5C2]/30 transition-colors">
            <h3 className="text-lg font-bold mb-4 text-[#F1F1F1]">Follow Us</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="ghost" className="w-full h-10 bg-[#A9E5C2]/10 hover:bg-[#00FFD1]/20 text-[#A9E5C2] hover:text-[#00FFD1] transition-colors rounded-lg">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full h-10 bg-[#A9E5C2]/10 hover:bg-[#00FFD1]/20 text-[#A9E5C2] hover:text-[#00FFD1] transition-colors rounded-lg">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full h-10 bg-[#A9E5C2]/10 hover:bg-[#00FFD1]/20 text-[#A9E5C2] hover:text-[#00FFD1] transition-colors rounded-lg">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="w-full h-10 bg-[#A9E5C2]/10 hover:bg-[#00FFD1]/20 text-[#A9E5C2] hover:text-[#00FFD1] transition-colors rounded-lg">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#145546]/50">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-[#CFCFCF] text-sm mb-4 md:mb-0">
              © {currentYear} Helium • Crafted with ❄️ in India
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link href="/privacy" className="text-[#9BAEA0] text-sm hover:text-[#00FFD1] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-[#145546]">•</span>
              <Link href="/terms" className="text-[#9BAEA0] text-sm hover:text-[#00FFD1] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footertwo