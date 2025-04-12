import type { Metadata } from "next"
import parse from 'html-react-parser';
import { getSettings } from "@/lib/api"

export const metadata: Metadata = {
  title: "About Us | E-commerce Store",
  description: "Learn more about our company, mission, and values",
}

export default async function AboutPage() {
  const settings = await getSettings()
  const settingsData = settings?.data[0]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">About Us</h1>
        {parse(settingsData?.about)}
      </div>


    </div>
  )
}
