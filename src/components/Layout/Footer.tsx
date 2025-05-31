"use client"

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#021F1B] text-[#F1F1F1] py-16 border-t border-[#f3942c]">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 font-raleway text-[#f3942c]">Helium</h3>
            <p className="text-[#9BAEA0] mb-6 leading-relaxed">
              Revolutionizing comfort with smart, aesthetic air conditioning solutions for modern homes.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-[#F1F1F1] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#F1F1F1] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#F1F1F1] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#F1F1F1] hover:text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all duration-300">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-raleway text-[#F1F1F1]">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#products" className="text-[#9BAEA0] hover:text-[#00FFD1] hover:underline underline-offset-4 transition-all duration-300">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-[#9BAEA0] hover:text-[#00FFD1] hover:underline underline-offset-4 transition-all duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#support" className="text-[#9BAEA0] hover:text-[#00FFD1] hover:underline underline-offset-4 transition-all duration-300">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-[#9BAEA0] hover:text-[#00FFD1] hover:underline underline-offset-4 transition-all duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-raleway text-[#F1F1F1]">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#A9E5C2]" />
                <span className="text-[#9BAEA0]">support@helium.in</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#A9E5C2]" />
                <span className="text-[#9BAEA0]">1800-123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#A9E5C2]" />
                <span className="text-[#9BAEA0]">Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#145546]/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#CFCFCF] text-sm mb-4 md:mb-0">
              © {currentYear} Helium. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-[#9BAEA0] text-sm hover:text-[#00FFD1] hover:underline underline-offset-4 transition-all duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#9BAEA0] text-sm hover:text-[#00FFD1] hover:underline underline-offset-4 transition-all duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer