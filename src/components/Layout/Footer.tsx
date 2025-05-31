"use client"

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#033129] text-[#e4e8e2] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-raleway">Helium</h3>
            <p className="text-[#d9d9d9] mb-6">
              Revolutionizing comfort with smart, aesthetic air conditioning solutions for modern homes.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-[#f3942c]">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#f3942c]">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#f3942c]">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-[#f3942c]">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-raleway">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#products" className="text-[#d9d9d9] hover:text-[#f3942c] transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-[#d9d9d9] hover:text-[#f3942c] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#support" className="text-[#d9d9d9] hover:text-[#f3942c] transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-[#d9d9d9] hover:text-[#f3942c] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-raleway">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#f3942c]" />
                <span className="text-[#d9d9d9]">support@helium.in</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#f3942c]" />
                <span className="text-[#d9d9d9]">1800-123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#f3942c]" />
                <span className="text-[#d9d9d9]">Bangalore, India</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-raleway">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="text-[#d9d9d9] hover:text-[#f3942c] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#d9d9d9] hover:text-[#f3942c] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-[#d9d9d9] hover:text-[#f3942c] transition-colors">
                  Warranty Information
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[#d9d9d9] hover:text-[#f3942c] transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#e4e8e2]/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#d9d9d9] text-sm mb-4 md:mb-0">
              © {currentYear} Helium. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/sitemap" className="text-[#d9d9d9] text-sm hover:text-[#f3942c] transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-[#d9d9d9] text-sm hover:text-[#f3942c] transition-colors">
                Accessibility
              </Link>
              <Link href="/cookies" className="text-[#d9d9d9] text-sm hover:text-[#f3942c] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer