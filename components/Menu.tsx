import Navbar from "./Navbar";
import { getCategories, getProducts, getSettings } from "@/lib/api";

export async function MenuNav() {
  const categories = await getCategories()
  const products = await getProducts({})
  const settings = await getSettings()
    const settingsData = settings?.data[0]

  return (
    <>
      <Navbar categories={categories?.data} products={products?.data} settingsData={settingsData?.title} />
    </>
  )
}

