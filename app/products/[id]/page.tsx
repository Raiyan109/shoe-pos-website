
import ProductDetailsPage from "@/components/ProductDetailsPage"
import { getCategories, getProducts } from "@/lib/api"
import { Category, Product } from "@/lib/types"


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const page = 1
  const limit =20
  const products = await getProducts({page,limit})
  const categories = await getCategories()
  const {id} = await params

  const product = products?.data?.find((p:Product) => p?._id === id)
  const category = categories?.data?.find((c:Category) => c?._id === product?.category_id?._id)
 
  return (
    <>
    <ProductDetailsPage product={product} category={category} />
    </>
  )
}

