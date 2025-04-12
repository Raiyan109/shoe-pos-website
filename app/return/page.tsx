import type { Metadata } from "next"
import parse from 'html-react-parser';
import { getSettings } from "@/lib/api"

export const metadata: Metadata = {
  title: "Return Policy | E-commerce Store",
  description: "Learn about our return policy and how to return products",
}

export default async function ReturnPolicyPage() {
  const settings = await getSettings()
  const settingsData = settings?.data[0]


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">Return Policy</h1>
        <div className="prose">
          {settingsData?.return_policy && parse(settingsData?.return_policy)}
        </div>
      </div>

    </div>
  )
}
