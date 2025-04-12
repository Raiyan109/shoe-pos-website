import { getSettings } from "@/lib/api"
import type { Metadata } from "next"
import parse from 'html-react-parser'


export const metadata: Metadata = {
  title: "Terms and Conditions | E-commerce Store",
  description: "Read our terms and conditions for using our website and services",
}

export default async function TermsPage() {
  const settings = await getSettings()
  const settingsData = settings?.data[0]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">Terms & Conditions</h1>
        <div className="prose">
          {settingsData?.terms && parse(settingsData?.terms)}
        </div>
      </div>


    </div>
  )
}
