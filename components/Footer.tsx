import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { getSettings } from "@/lib/api"

export default async function Footer() {
  const settings = await getSettings()
  const settingsData = settings?.data[0]
  console.log(settingsData?.facebook_link);

  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-poppins text-xl font-bold text-[#222222] mb-4">{settingsData?.title}</h3>
            <p className="font-inter text-[#666666] mb-4">
              {settingsData?.welcome_message}
            </p>

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
              {/* <li>
                <Link href="/categories" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Shop
                </Link>
              </li> */}
              <li>
                <Link href="/about" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-poppins text-lg font-bold text-[#222222] mb-4">Customer Service</h3>
            <ul className="font-inter space-y-2">
              <li>
                <Link href="/return" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="cancellation" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="privacy" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="terms" className="text-[#666666] hover:text-[#ff6600] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-poppins text-lg font-bold text-[#222222] mb-4">Social Links</h3>
            <div className="flex space-x-4">
              <a href={settingsData?.facebook_link} rel="noreferrer" target="_blank" className="text-[#444444] hover:text-[#ff6600]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={settingsData?.instagram_link} rel="noreferrer" target="_blank" className="text-[#444444] hover:text-[#ff6600]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={settingsData?.twitter_link} rel="noreferrer" target="_blank" className="text-[#444444] hover:text-[#ff6600]">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            {/* <p className="font-inter text-[#666666] mb-4">
              Subscribe to our newsletter for updates on new products and special offers.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="font-inter" />
              <Button className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105">
                Subscribe
              </Button>
            </div> */}
          </div>
        </div>

        {/* <div className="border-t border-gray-200 pt-8">
          <p className="font-inter text-center text-[#666666]">
            © {new Date().getFullYear()} StoreName. All rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  )
}

