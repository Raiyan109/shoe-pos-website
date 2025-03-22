import Image from "next/image"
import Link from "next/link"

import type { Product, Variation } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default function ProductCard({ product }: { product: Product }) {
 
  // Check if variations exist before mapping
  const variationDiscountPrices = product?.variations
    ? product.variations
        .map((variation: Variation) => variation?.variation_discount_price)
        .filter((price): price is number => price !== undefined)
    : [];

  const variationBuyingPrices = product?.variations
    ? product.variations
        .map((variation: Variation) => variation?.variation_price)
        .filter((price): price is number => price !== undefined)
    : [];

  // Get the first available discount & buying price
  const firstDiscountPrice = variationDiscountPrices.length > 0 ? variationDiscountPrices[0] : undefined;
  const firstBuyingPrice = variationBuyingPrices.length > 0 ? variationBuyingPrices[0] : undefined;
  console.log(firstDiscountPrice);
  
  
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product?._id}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product?.thumbnail_image || "/placeholder.svg"}
          alt={product?.product_name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* {product.isNew && (
          <div className="absolute top-2 left-2 bg-[#ff6600] text-white text-xs font-medium px-2 py-1 rounded">New</div>
        )}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )} */}
      </Link>

      <div className="p-4">
        <Link href={`/products/${product?._id}`}>
          <h3 className="font-poppins text-lg font-semibold text-[#333333] mb-1 transition-colors group-hover:text-[#ff6600]">
            {product?.product_name}
          </h3>
        </Link>

        {/* <p className="font-inter text-sm text-[#666666] mb-3 line-clamp-2">{product.description}</p> */}

        <div className="flex items-center justify-between">
        <div className="font-poppins font-bold text-[#ff6600]">
            {product?.product_price ? (
              `$${product?.product_price}`
            ) : firstDiscountPrice && firstDiscountPrice >0  ? (
              `$${firstDiscountPrice}`
            ) : (
              "0"
            )}

            {firstBuyingPrice && firstBuyingPrice > 0 ? (
              <span className="ml-2 text-sm line-through text-[#666666]">${firstBuyingPrice}</span>
            ) : (
              <span className="ml-2 text-sm line-through text-[#666666]"></span>
            )}
          </div>
          {/* <div className="font-poppins font-bold text-[#ff6600]">
            ${product?.product_price ? product?.product_price : variationDiscountPrice[0]}
            {product?.product_price ? product?.product_price : variationBuyingPrice[0] && (
              <span className="ml-2 text-sm line-through text-[#666666]">${variationBuyingPrice[0]}</span>
            )}
          </div> */}

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-[#444444] hover:text-[#ff6600] hover:bg-[#ff6600]/10"
          >
            <Link href={`/products/${product?._id}`}>View</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

