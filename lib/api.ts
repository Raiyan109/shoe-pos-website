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
        cache: "no-store",
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
  export async function getProducts() {
    try {
      const baseUrl = process.env.BASE_URL
      if (!baseUrl) {
        console.warn("BASE_URL environment variable is not set, using mock data")
        return getMockProductsResponse()
      }
  
      const res = await fetch(`${baseUrl}/product`, {
        cache: "no-store",
      })
  
      if (!res.ok) {
        console.warn(`API returned status ${res.status}, using mock data`)
        return getMockProductsResponse()
      }
  
      return await res.json()
    } catch (error) {
      console.error("Error fetching products:", error)
      console.info("Falling back to mock data")
      // Return mock data as fallback
      return getMockProductsResponse()
    }
  }


  // Function to fetch banners from API
export async function getBanners() {
    try {
      const baseUrl = process.env.BASE_URL 
      const res = await fetch(`${baseUrl}/banner`, {
        cache: "no-store",
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
export async function getBrands(){
    try {
      const baseUrl = process.env.BASE_URL 
      const res = await fetch(`${baseUrl}/brand`, {
        cache: "no-store",
      })
  
      return await res.json()
    } catch (error) {
      console.error("Error fetching brands:", error)
    }
  }