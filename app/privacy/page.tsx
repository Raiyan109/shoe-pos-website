import { getSettings } from "@/lib/api"
import type { Metadata } from "next"
import parse from 'html-react-parser'


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
    </div>
  )
}
