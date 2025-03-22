import Navbar from "./Navbar";

// Function to fetch categories from API
async function getCategories(){
    try {
      const baseUrl = process.env.BASE_URL 
      const res = await fetch(`${baseUrl}/category`, {
        cache: "no-store",
      })
  
      return await res.json()
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  // Function to fetch products from API
async function getProducts(){
  try {
    const baseUrl = process.env.BASE_URL 
    const res = await fetch(`${baseUrl}/product`, {
      cache: "no-store",
    })

    return await res.json()
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}

export async function MenuNav() {
    const categories = await getCategories()
    const products = await getProducts()
    return (
        <>
            <Navbar categories={categories?.data} products={products?.data} />
        </>
    )
}

