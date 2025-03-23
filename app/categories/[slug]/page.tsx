import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductCard from "@/components/ProductCard"
import { ProductFilters } from "@/components/ProductFilters"
import { Category, Product } from "@/lib/types"
import { getBrands, getCategories, getProducts } from "@/lib/api"
import Image from "next/image"


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const categories = await getCategories()
  const {slug} = await params
  const category = categories?.data?.find((c:Category) => c.category_slug === slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category?.category_name} | E-commerce Store`,
    description: `Browse our collection of ${category?.category_name}`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const categories = await getCategories()
  const products = await getProducts()
  const brands = await getBrands()
  const {slug} = await params
  const category = categories?.data?.find((c:Category) => c?.category_slug === slug)
  

  if (!category) {
    notFound()
  }

  const categoryProducts = products?.data?.filter((product:Product) => product.category_id?._id === category?._id)

  // Mock promotional banner for this category
  const promotionalBanner = {
    title: `${category.category_name} Special Offers`,
    description: `Discover amazing deals on our ${category.category_name} collection`,
    image: category?.category_logo,
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Category Promotional Banner */}
      <div className="mb-8 relative h-[200px] overflow-hidden rounded-lg">
        <Image
          src={promotionalBanner.image || "/placeholder.svg"}
          alt={promotionalBanner.title}
          fill
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="p-6 text-gray-100">
            <h2 className="font-poppins text-3xl font-bold mb-2">{promotionalBanner.title}</h2>
            <p className="font-inter text-lg">{promotionalBanner.description}</p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">{category?.category_name}</h1>
        <p className="font-inter text-[#666666]">
          Browse our collection of high-quality {category?.category_name.toLowerCase()}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <ProductFilters brands={brands?.data} products={products?.data} />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts?.map((product:Product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>

          {categoryProducts?.length === 0 && (
            <div className="text-center py-12">
              <h3 className="font-poppins text-xl font-semibold text-[#444444] mb-2">No products found</h3>
              <p className="font-inter text-[#666666]">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

