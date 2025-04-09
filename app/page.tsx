import Image from "next/image"
import Link from "next/link"
import BannerCarousel from "@/components/BannerCarousel"
import { Product } from "@/lib/types"
import { getBanners, getCategories, getProducts } from "@/lib/api"
import ProductCard from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import BannerCarousel2 from "@/components/BannerCarousel2"

interface IProps {
  _id: string
  category_name: string
  category_slug: string
  category_logo: string
  total_product: number
}

export default async function Home() {
  const page = 1
  const limit =20
  const banners = await getBanners()
  const categories = await getCategories()
  const products = await getProducts({page, limit})


  return (
    <main className="flex-1">
      {/* Hero Carousel Section */}
      <section className="relative">
        {/* <BannerCarousel banners={banners?.data} /> */}
        <BannerCarousel2 banners={banners?.data} />
      </section>

      {/* Categories Section */}
      {/* <section className="container mx-auto px-4 py-16">
        <h2 className="font-poppins text-3xl font-bold text-[#222222] mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories?.data?.map((category: Category) => (
            <Link
              key={category?._id}
              href={`/categories/${category?.category_slug}`}
              className="group relative h-64 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={category?.category_logo || "/placeholder.svg"}
                alt={category?.category_name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <h3 className="font-poppins text-xl font-semibold text-white p-6">{category?.category_name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section> */}

      {/* Featured Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-poppins text-3xl font-bold text-[#222222] mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories?.data?.map((category: IProps) => {
            if(category?.total_product > 0)
            return (
              <Link
              key={category._id}
              href={`/categories/${category.category_slug}`}
              className="group relative h-64 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                src={category.category_logo || "/placeholder.svg"}
                alt={category.category_name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
                <div className="p-6">
                  <h3 className="font-poppins text-xl font-semibold text-white mb-1">{category.category_name}</h3>
                  <p className="font-inter text-sm text-white/80">{category?.total_product} products</p>
                </div>
              </div>
            </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-poppins text-3xl font-bold text-[#222222]">Featured Products</h2>
          <Button
            asChild
            variant="outline"
            className="border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600] hover:text-white transition-all"
          >
            <Link href="/products">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.data?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="container mx-auto px-4 py-16">
        <h2 className="font-poppins text-3xl font-bold text-[#222222] mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-inter text-[#666666] mb-4">
                "The quality of the products exceeded my expectations. Fast shipping and excellent customer service!"
              </p>
              <div className="font-poppins font-semibold">Happy Customer {i}</div>
            </div>
          ))}
        </div>
      </section> */}
    </main>
  )
}

