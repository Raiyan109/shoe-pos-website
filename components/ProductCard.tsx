import Image from "next/image"
import Link from "next/link"

import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-[#ff6600] text-white text-xs font-medium px-2 py-1 rounded">New</div>
        )}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-poppins text-lg font-semibold text-[#333333] mb-1 transition-colors group-hover:text-[#ff6600]">
            {product.name}
          </h3>
        </Link>

        <p className="font-inter text-sm text-[#666666] mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="font-poppins font-bold text-[#ff6600]">
            ${product.price.toFixed(2)}
            {product.oldPrice && (
              <span className="ml-2 text-sm line-through text-[#666666]">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-[#444444] hover:text-[#ff6600] hover:bg-[#ff6600]/10"
          >
            <Link href={`/products/${product.id}`}>View</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

