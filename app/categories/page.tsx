import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { categories } from "@/lib/data"

export const metadata: Metadata = {
  title: "Categories | E-commerce Store",
  description: "Browse all product categories in our store",
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#222222] mb-4">All Categories</h1>
        <p className="font-inter text-[#666666]">Browse our wide range of product categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative h-80 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="font-poppins text-xl font-semibold text-white mb-2">{category.name}</h3>
                <p className="font-inter text-white/80 text-sm">{category.productCount} products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

