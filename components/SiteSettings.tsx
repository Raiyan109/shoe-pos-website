"use client"

import { useEffect, useState } from "react"

interface SiteSettingsData {
    _id: string
    title: string;
  favicon?: string;
  favicon_key?: string;
  logo?: string;
  logo_key?: string;
  }
  
  interface SiteSettingsResponse {
    success: boolean
    message: string
    data: SiteSettingsData[]
  }

export default function SiteSettings() {
  const [, setIsLoading] = useState(true)
  const [, setError] = useState<Error | null>(null)
  const [settings, setSettings] = useState<SiteSettingsResponse | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true)
    
        // Get the base URL from environment variable
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL
 
        if (!baseUrl) {
          console.warn("BASE_URL environment variable is not set, using mock data")
          setSettings(getMockSettingsResponse())
          setIsLoading(false)
          return
        }

        // Set up a timeout to prevent hanging if CORS issues occur
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        try {
 
          const res = await fetch(`${baseUrl}/settings`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
            mode: "cors",
            signal: controller.signal,
          })

          clearTimeout(timeoutId)

          if (!res.ok) {
            console.warn(`API returned status ${res.status}, using mock data`)
            throw new Error(`API returned status ${res.status}`)
          }

          const data = await res.json()
          setSettings(data)
        } catch (fetchError: unknown) {
          console.error("Fetch error:", fetchError)

          // Check if it's a CORS error
          if (fetchError instanceof TypeError && fetchError.message.includes("CORS")) {
            console.warn("CORS error detected")
          }

          // Check if it's a timeout
          if (fetchError instanceof Error && fetchError.name === 'AbortError') {
            console.warn("Request timed out")
          }

          // Fall back to mock data
          console.info("Using mock data due to fetch error")
          setSettings(getMockSettingsResponse())
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Unexpected error in fetchSettings:", err)
        setSettings(getMockSettingsResponse())
        setError(err instanceof Error ? err : new Error("Unknown error occurred"))
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  // Set website title and favicon from database
  useEffect(() => {
    if (settings?.data?.[0]) {
      const { title, favicon } = settings.data[0]
    
      // Set title dynamically
      if (title) {
        document.title = title
      }

      // Set favicon dynamically
      if (favicon) {
        try {
          let link = document.querySelector("link[rel='icon']") as HTMLLinkElement

          if (!link) {
            link = document.createElement("link")
            document.head.appendChild(link)
          } else {
            console.log("Using existing favicon link")
          }

          link.rel = "icon"
          link.href = favicon
          console.log("Favicon set to:", favicon)
        } catch (err) {
          console.error("Error setting favicon:", err)
        }
      }
    } else {
      console.log("No settings data available or in unexpected format:", settings)
    }
  }, [settings])

  return null
}

// Mock settings response
function getMockSettingsResponse() {
  return {
    success: true,
    message: "Site settings fetched successfully (MOCK DATA)",
    data: [
      {
        _id: "settings1",
        title: "E-commerce Store | Quality Products",
        favicon: "/favicon.ico",
        logo: "/logo.png",
        footer_text: "© 2023 E-commerce Store. All rights reserved.",
        contact_email: "contact@example.com",
        contact_phone: "+1 (123) 456-7890",
        address: "123 Main Street, City, Country",
        social_media: {
          facebook: "https://facebook.com/ecommercestore",
          twitter: "https://twitter.com/ecommercestore",
          instagram: "https://instagram.com/ecommercestore",
        },
      },
    ],
  }
}

