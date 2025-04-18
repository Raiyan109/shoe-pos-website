import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Category } from "@/lib/types"
import { getBrands, getCategories, getProducts } from "@/lib/api"
import CategoryComponent from "@/components/CategoryComponent"


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const categories = await getCategories()
  const { slug } = await params
  const category = categories?.data?.find((c: Category) => c.category_slug === slug)

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

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ page?: number; limit?: number; }> }) {
  const { slug } = await params
  const { page = 1, limit = 10 } = await searchParams

  const categories = await getCategories()
  const brands = await getBrands()
  const category = categories?.data?.find((c: Category) => c?.category_slug === slug)


  if (!category) {
    notFound()
  }
  // const products = await getProducts({page:page, limit:limit})
  const products = await getProducts({
    page: page,
    limit: limit,
    categoryId: category._id // Pass category ID to filter at the API level
  })


  // const categoryProducts = products?.data?.filter((product:Product) => product.category_id?._id === category?._id)
  const categoryProducts = products?.data
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">{category?.category_name}</h1>
        <p className="font-inter text-[#666666]">
          Browse our collection of high-quality {category?.category_name.toLowerCase()}
        </p>
      </div>

      <CategoryComponent
        brands={brands}
        categoryProducts={categoryProducts}
        // currentPage={page}
        limit={limit}
        totalCount={products?.totalData}
        slug={slug}
      />
    </div>
  )
}

