import { getSettings } from "@/lib/api"
import type { Metadata } from "next"

import parse from 'html-react-parser'

export const metadata: Metadata = {
  title: "Cancellation Policy | E-commerce Store",
  description: "Learn about our order cancellation policy and process",
}

export default async function CancellationPage() {
  const settings = await getSettings()
  const settingsData = settings?.data[0]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">Cancellation Policy</h1>
        <div className="prose">
          {settingsData?.cancellation_policy && parse(settingsData?.cancellation_policy)}
        </div>
      </div>

      
    </div>
  )
}
