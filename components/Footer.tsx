import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-poppins text-xl font-bold text-[#222222] mb-4">StoreName</h3>
            <p className="font-inter text-[#666666] mb-4">
              Providing quality products since 2023. Our mission is to deliver exceptional value and service to our
              customers.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-[#444444] hover:text-[#ff6600]">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#444444] hover:text-[#ff6600]">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#444444] hover:text-[#ff6600]">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins text-lg font-bold text-[#222222] mb-4">Quick Links</h3>
            <ul className="font-inter space-y-2">
              <li>
                <Link href="/" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-poppins text-lg font-bold text-[#222222] mb-4">Customer Service</h3>
            <ul className="font-inter space-y-2">
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-poppins text-lg font-bold text-[#222222] mb-4">Newsletter</h3>
            <p className="font-inter text-[#666666] mb-4">
              Subscribe to our newsletter for updates on new products and special offers.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="font-inter" />
              <Button className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="font-inter text-center text-[#666666]">
            © {new Date().getFullYear()} StoreName. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

