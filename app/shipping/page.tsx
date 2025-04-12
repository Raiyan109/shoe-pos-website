import type { Metadata } from "next"
import parse from 'html-react-parser';
import { getSettings } from "@/lib/api"

export const metadata: Metadata = {
    title: "Shipping Policy | E-commerce Store",
    description: "Learn about our shipping policy and how to ship products",
}

export default async function ShippingPage() {
    const settings = await getSettings()
    const settingsData = settings?.data[0]

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">Shipping Info</h1>
                <div className="prose">
                    {settingsData?.shipping_info && parse(settingsData?.shipping_info)}
                </div>
            </div>


        </div>
    )
}
