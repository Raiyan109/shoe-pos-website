import { getFallbackBanners, getMockCategoriesResponse, getMockProductsResponse } from "./data"

// Function to fetch categories from API
export async function getCategories() {
  try {
    const baseUrl = process.env.BASE_URL
    if (!baseUrl) {
      console.warn("BASE_URL environment variable is not set, using mock data")
      return getMockCategoriesResponse()
    }

    const res = await fetch(`${baseUrl}/category`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.warn(`API returned status ${res.status}, using mock data`)
      return getMockCategoriesResponse()
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    console.info("Falling back to mock data")
    // Return mock data as fallback
    return getMockCategoriesResponse()
  }
}

// Function to fetch products from API
// export async function getProducts({page=1, limit=10}) {
//   try {
//     const baseUrl = process.env.BASE_URL
//     if (!baseUrl) {
//       console.warn("BASE_URL environment variable is not set, using mock data")
//       return getMockProductsResponse()
//     }

//     const res = await fetch(`${baseUrl}/product?page=${page}&limit=${limit}`, {
//       next: { revalidate: 60 },
//     })

//     if (!res.ok) {
//       console.warn(`API returned status ${res.status}, using mock data`)
//       return getMockProductsResponse()
//     }

//     return await res.json()
//   } catch (error) {
//     console.error("Error fetching products:", error)
//     console.info("Falling back to mock data")
//     // Return mock data as fallback
//     return getMockProductsResponse()
//   }
// }
// Updated function to fetch products with category filter
export async function getProducts({
  page = 1,
  limit = 10,
  categoryId = null // New parameter
}) {
  try {
    const baseUrl = process.env.BASE_URL
    if (!baseUrl) {
      console.warn("BASE_URL environment variable is not set, using mock data")
      return getMockProductsResponse()
    }

    // Build query parameters including category if provided
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    if (categoryId) {
      queryParams.append('category_id', categoryId)
    }

    const res = await fetch(`${baseUrl}/product?${queryParams.toString()}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.warn(`API returned status ${res.status}, using mock data`)
      return getMockProductsResponse()
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    console.info("Falling back to mock data")
    return getMockProductsResponse()
  }
}


// Function to fetch banners from API
export async function getBanners() {
  try {
    const baseUrl = process.env.BASE_URL
    const res = await fetch(`${baseUrl}/banner`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      // If the API fails, return fallback banners
      return getFallbackBanners()
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching banners:", error)
    // Return fallback banners in case of error
    return getFallbackBanners()
  }
}

// Function to fetch products from API
export async function getBrands() {
  try {
    const baseUrl = process.env.BASE_URL
    const res = await fetch(`${baseUrl}/brand`, {
      next: { revalidate: 60 },
    })

    return await res.json()
  } catch (error) {
    console.error("Error fetching brands:", error)
  }
}


// Function to fetch products from API
export async function getSettings() {
  try {
    const baseUrl = process.env.BASE_URL
    const res = await fetch(`${baseUrl}/settings`, {
      next: { revalidate: 60 },
    })

    return await res.json()
  } catch (error) {
    console.error("Error fetching settings:", error)
  }
}


// export async function getSettings() {
//   try {
//     const baseUrl = process.env.BASE_URL

//     if (!baseUrl) {
//       console.warn("BASE_URL environment variable is not set, using mock data")
//       return getMockSettingsResponse()
//     }

//     console.log(`Fetching settings from: ${baseUrl}/settings`)

//     // Add specific headers to handle CORS
//     const res = await fetch(`${baseUrl}/settings`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // Add any authentication headers if needed
//         // 'Authorization': 'Bearer your-token-here',
//       },
//       cache: "no-store",
//       // Add mode: 'cors' explicitly
//       mode: "cors",
//     })

//     if (!res.ok) {
//       console.warn(`API returned status ${res.status}, using mock data`)
//       return getMockSettingsResponse()
//     }

//     return await res.json()
//   } catch (error) {
//     console.error("Error fetching site settings:", error)

//     // Check specifically for CORS errors
//     if (error instanceof TypeError && error.message.includes("CORS")) {
//       console.warn(
//         "CORS error detected. This might be because the settings endpoint has different CORS configuration than other endpoints.",
//       )
//     }

//     console.info("Falling back to mock data")
//     return getMockSettingsResponse()
//   }
// }

// // Mock settings response
// function getMockSettingsResponse() {
//   console.log("Returning mock settings data")
//   return {
//     success: true,
//     message: "Site settings fetched successfully (MOCK DATA)",
//     data: [
//       {
//         _id: "settings1",
//         title: "E-commerce Store | Quality Products",
//         favicon: "/favicon.ico",
//         logo: "/logo.png",
//         footer_text: "© 2023 E-commerce Store. All rights reserved.",
//         contact_email: "contact@example.com",
//         contact_phone: "+1 (123) 456-7890",
//         address: "123 Main Street, City, Country",
//         social_media: {
//           facebook: "https://facebook.com/ecommercestore",
//           twitter: "https://twitter.com/ecommercestore",
//           instagram: "https://instagram.com/ecommercestore",
//         },
//       },
//     ],
//   }
// }

