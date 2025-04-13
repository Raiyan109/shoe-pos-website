import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/api"
import { Product } from "@/lib/types"
import SearchForm from "@/components/SearchForm"
import ProductCard from "@/components/ProductCard"

interface SearchPageProps {
  searchParams: Promise<{ query?: string }>
}

export const generateMetadata = async ({ searchParams }: SearchPageProps): Promise<Metadata> => {
  const {query} = await searchParams
  return {
    title: query ? `Search results for "${query}" | E-commerce Store` : "Search | E-commerce Store",
    description: query
      ? `Browse search results for "${query}" in our online store`
      : "Search for products in our online store",
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const products = await getProducts({page: 1, limit: 20})
    const {query = ""} = await searchParams 

  // Filter products based on search query
  const searchResults =
    query.trim() === ""
      ? []
      : products?.data?.filter(
          (product: Product) =>
            product.product_name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
        )

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center font-inter text-[#666666] hover:text-[#ff6600] mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">
          Search Results {query ? `for "${query}"` : ""}
        </h1>
        <p className="font-inter text-[#666666]">
          {searchResults.length > 0
            ? `Found ${searchResults.length} products matching your search`
            : query
              ? "No products found matching your search"
              : "Search for products by name or description"}
        </p>
      </div>

      {/* Search form */}
      <div className="mb-8">
        <SearchForm initialQuery={query} />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* {query && (
          <div className="w-full md:w-64 shrink-0">
            <ProductFilters />
          </div>
        )} */}

        <div className="flex-1">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="font-poppins text-xl font-semibold text-[#444444] mb-2">No products found</h3>
              <p className="font-inter text-[#666666] mb-6">
                We couldn&quot;t find any products matching &quot;{query}&quot;. Try using different keywords or browse our categories.
              </p>
              <Button asChild className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium">
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="font-poppins text-xl font-semibold text-[#444444] mb-2">Enter a search term</h3>
              <p className="font-inter text-[#666666]">Type in the search box above to find products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
