
import ProductDetailsPage from "@/components/ProductDetailsPage"
import { Category, Product } from "@/lib/types"

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
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const products = await getProducts()
  const categories = await getCategories()
  const {id} = await params
  console.log(products);
  const product = products?.data?.find((p:Product) => p?._id === id)
  const category = categories?.data?.find((c:Category) => c._id === product.category_id?._id)
  console.log(category);
  

  return (
    <>
    <ProductDetailsPage product={product} category={category} />
    </>
  )
}

