import AllProductComponent from "@/components/AllProductComponent"
import { getProducts } from "@/lib/api"


const ProductsPage = async ({searchParams}:{searchParams: Promise<{ page?: number; limit?: number; }>}) => {
  const { page = 1, limit = 10 } = await searchParams

  const products = await getProducts({page:page, limit:limit})
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">All Products</h1>

        <AllProductComponent products={products}
        limit={limit}
        totalCount={products?.totalData}
        />
      </div>
    </div>
  )
}

export default ProductsPage