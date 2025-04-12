import { getSettings } from "@/lib/api"
import type { Metadata } from "next"
import Link from "next/link"
import parse from 'html-react-parser'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | E-commerce Store",
  description: "Learn about how we collect, use, and protect your personal information",
}

export default async function RefundPolicyPage() {
  const settings = await getSettings()
  const settingsData = settings?.data[0]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">Privacy Policy</h1>
        <div className="prose">
          {settingsData?.privacy_policy && parse(settingsData?.privacy_policy)}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="font-poppins text-2xl font-bold text-[#222222] mb-4">Have Questions?</h2>
        <p className="font-inter text-[#666666] mb-6 max-w-2xl mx-auto">
          We'd love to hear from you! If you have any questions about our products, services, or company, please don't
          hesitate to reach out.
        </p>
        <Button
          asChild
          className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105"
        >
          <Link href="/contact">
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
