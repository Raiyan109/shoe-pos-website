
import ProductDetailsPage from "@/components/ProductDetailsPage"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
  

  return (
    <>
    <ProductDetailsPage id={id} />
    </>
  )
}

