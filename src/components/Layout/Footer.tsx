"use client"

import type React from "react"
import { useState } from "react"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  PhoneCall  // Using this for WhatsApp (Lucide doesn't have a dedicated WhatsApp icon)
} from 'lucide-react';
import Link from "next/link";


const Footer: React.FC = () => {
  const [email, setEmail] = useState("")

  return (
    <footer className=" text-gray-300 py-12 px-4 md:px-8 lg:px-12"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dqhk6dblu/image/upload/v1752040162/footersectionBg_nybemq.jpg')`,
        backgroundSize: 'cover',              // Makes sure the image covers the whole area
        backgroundPosition: 'top center',     // Keeps the spotlight area visible on mobile
        backgroundRepeat: 'no-repeat',        // Prevents tiling
        backgroundAttachment: 'scroll',       // Avoids parallax issues on mobile
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Optional overlay for contrast
        backgroundBlendMode: 'overlay',       // Darkens image for better text visibility
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Hero Section with Image */}
          <div className="md:col-span-4 lg:col-span-3 relative overflow-hidden rounded-lg">
            <div
              className="relative h-[400px] md:h-full w-full bg-cover bg-center rounded-lg overflow-hidden"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dqhk6dblu/image/upload/v1752038613/ManUAC_aiteyz.png')`,
                // backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/30  p-6 ">
                <div className="h-1/2  mt-[50%] md:mt-[200%] lg:mt-[140%] xl:mt-[90%] flex flex-col ">
                <h2 className="text-white text-3xl md:text-4xl font-light leading-tight  text-center">
                  Reimagine comfort
                  <br />
                  <span className="italic font-serif">with smarter cooling</span>
                </h2>
                <div className="mt-auto mx-auto">
                  <Link
                    href={'/shop'} 
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#2563eb] text-white font-medium rounded-full hover:bg-[#1d4ed8] transition-colors"
                  >
                    Explore
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Our Company Column */}
              <div>
                <h3 className="text-gray-400 font-medium mb-4">Our Company</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      About Helium
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Founding Team
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Press & Media
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Sustainability
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support Column */}
              <div>
                <h3 className="text-gray-400 font-medium mb-4">Support</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:text-white transition-colors inline-flex items-center text-sm sm:text-base">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Installation Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      App Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors inline-flex items-center text-sm sm:text-base">
                      Oura on the Web
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Investors Column */}
              <div>
                <h3 className="text-gray-400 font-medium mb-4">Partner With Us</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Investor Relations
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Pitch Deck
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Growth Reports
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Governance
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors text-sm sm:text-base">
                      Contact IR Team
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter and Social */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Newsletter Signup */}
              <div className="order-2 lg:order-1">
                <h3 className="text-gray-400 font-medium mb-4">Stay cool with product updates, early access, and smart tips.</h3>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="bg-[#f5f5f0] text-gray-800 px-4 py-3 rounded-l-md w-full focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="bg-[#f5f5f0] text-gray-800 px-4 py-3 rounded-r-md hover:bg-gray-200 transition-colors"
                    aria-label="Subscribe"
                  >
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-3">
                  We care about protecting your data.
                  <br />
                  Read more in our{" "}
                  <a href="#" className="underline hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              {/* Social Media */}
              <div className="order-1 lg:order-2">
                <h3 className="text-gray-400 font-medium mb-4">Social</h3>
                <div className="flex flex-wrap gap-0.5 sm:gap-3 ">
                  <a
                    href="#"
                    className="bg-[#f5f5f0] text-gray-800 p-3 rounded-full hover:bg-gray-200 transition-colors scale-75 sm:scale-100"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 " />
                  </a>
                  <a
                    href="#"
                    className="bg-[#f5f5f0] text-gray-800 p-3 rounded-full hover:bg-gray-200 transition-colors scale-75 sm:scale-100"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-[#f5f5f0] text-gray-800 p-3 rounded-full hover:bg-gray-200 transition-colors scale-75 sm:scale-100"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-[#f5f5f0] text-gray-800 p-3 rounded-full hover:bg-gray-200 transition-colors scale-75 sm:scale-100"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-[#f5f5f0] text-gray-800 p-3 rounded-full hover:bg-gray-200 transition-colors scale-75 sm:scale-100"
                    aria-label="TikTok"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-[#f5f5f0] text-gray-800 p-3 rounded-full hover:bg-gray-200 transition-colors scale-75 sm:scale-100"
                    aria-label="Pinterest"
                  >
                    <PhoneCall className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Legal Footer */}
            <div className="mt-12 pt-6 border-t border-gray-800">
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                  Terms & Conditions
                </a>
                <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                  Accessibility
                </a>
                <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                  IP Notice
                </a>
                <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
                  Security Center
                </a>
              </div>
              <p className="text-gray-500 text-sm">© 2025 Helium Pvt. Ltd. | All Rights Reserved</p>
              <p className="text-gray-500 text-sm mt-1">
                HELIUM™, the Helium logo, and other brand assets are trademarks of Helium and may not be used without permission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
