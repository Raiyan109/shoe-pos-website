'use client'
import { categories, products } from '@/lib/data'
import { sendOrderToWhatsApp } from '@/lib/whatsapp'
import { notFound } from 'next/navigation'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Minus, Plus, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { Category, Product } from '@/lib/types'



const ProductDetailsPage = ({ product,category }: { product: Product, category:Category }) => {
  if (!product) {
    notFound()
  }

  const [quantity, setQuantity] = useState(1)
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  // const handleOrder = () => {
  //   sendOrderToWhatsApp({
  //     productName: product?.product_name,
  //     productId: product?._id,
  //     price: product?.product_price,
  //     quantity,
  //     // color: selectedColor,
  //     // size: selectedSize,
  //   })
  // }
  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href={`/categories/${category?.category_slug}`}
        className="inline-flex items-center font-inter text-[#666666] hover:text-[#ff6600] mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {category?.category_name}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image src={product?.thumbnail_image || "/placeholder.svg"} alt={product?.product_name} fill className="object-cover" />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="font-poppins text-3xl font-bold text-[#222222] mb-2">{product?.product_name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-inter text-sm text-[#666666]">(24 reviews)</span>
          </div>

          <div className="font-poppins text-2xl font-bold text-[#ff6600] mb-6">
            ${product?.product_price}
            {/* {product.oldPrice && (
              <span className="ml-2 text-lg line-through text-[#666666]">${product.oldPrice.toFixed(2)}</span>
            )} */}
          </div>

          <p className="font-inter text-[#666666] mb-6">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-poppins text-sm font-medium text-[#444444] mb-3">Color</h3>
            <div className="flex gap-3">
              {/* {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? "border-[#ff6600]" : "border-transparent"
                    }`}
                >
                  <span className="block w-full h-full rounded-full" style={{ backgroundColor: color }} />
                </button>
              ))} */}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-poppins text-sm font-medium text-[#444444] mb-3">Size</h3>
            <div className="flex gap-3">
              {/* {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex items-center justify-center rounded border ${selectedSize === size
                      ? "border-[#ff6600] bg-[#ff6600]/10 text-[#ff6600]"
                      : "border-gray-300 text-[#666666]"
                    }`}
                >
                  {size}
                </button>
              ))} */}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-poppins text-sm font-medium text-[#444444] mb-3">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity} className="h-10 w-10 rounded-r-none">
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-10 w-14 flex items-center justify-center border-y border-input">{quantity}</div>
              <Button variant="outline" size="icon" onClick={incrementQuantity} className="h-10 w-10 rounded-l-none">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Order Button */}
          <Button
            // onClick={handleOrder}
            size="lg"
            className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105"
          >
            Order via WhatsApp
          </Button>

          {/* Share */}
          <Button variant="ghost" size="sm" className="mt-4 text-[#666666]">
            <Share2 className="mr-2 h-4 w-4" />
            Share this product
          </Button>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description" className="font-poppins">
              Description
            </TabsTrigger>
            <TabsTrigger value="specifications" className="font-poppins">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="font-poppins">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="font-inter text-[#666666] space-y-4">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="font-inter text-[#666666]">
              <ul className="space-y-2">
                <li>
                  <strong>Material:</strong> Premium quality
                </li>
                <li>
                  <strong>Dimensions:</strong> Varies by size
                </li>
                <li>
                  <strong>Care:</strong> Machine washable
                </li>
                <li>
                  <strong>Origin:</strong> Imported
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="font-inter text-[#666666]">
              <p>Customer reviews coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProductDetailsPage