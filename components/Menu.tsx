import { getMockCategoriesResponse, getMockProductsResponse } from "@/lib/data";
import Navbar from "./Navbar";
import { getCategories, getProducts } from "@/lib/api";



export async function MenuNav() {
  const categories = await getCategories()
  const products = await getProducts()
  return (
    <>
      <Navbar categories={categories?.data} products={products?.data} />
    </>
  )
}

