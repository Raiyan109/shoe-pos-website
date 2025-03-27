'use client'
import { sendOrderToWhatsApp } from '@/lib/whatsapp'
import { notFound } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Minus, Plus } from "lucide-react"
import parse from "html-react-parser";
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { Category, Product } from '@/lib/types'



const ProductDetailsPage = ({ product, category }: { product: Product, category: Category }) => {
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(product?.thumbnail_image)
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string | null>>(() => {
    const initialAttributes: Record<string, string | null> = {};

    if (product?.attributes_details) {
      for (const attr of product.attributes_details) {
        if (attr?.attribute_name && attr.attribute_values?.length) {
          initialAttributes[attr.attribute_name] =
            attr.attribute_values[0]?.attribute_value_name || null;
        }
      }
    }

    return initialAttributes;
  });
  const [selectedPrice, setSelectedPrice] = useState(product?.product_price || 0);
  const [selectedDiscountPrice, setSelectedDiscountPrice] = useState(product?.product_discount_price || 0);
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))


  if (!product) {
    notFound()
  }


  const findMatchingVariation = useCallback(() => {
    const selectedValues = product?.attributes_details?.map(
      attr => selectedAttributes[attr.attribute_name ?? '']
    );

    if (!selectedValues || selectedValues.some(value => !value)) return null;

    const variationName = selectedValues.join('-');
    return product?.variations?.find(v => v.variation_name === variationName);
  }, [selectedAttributes, product]);

  useEffect(() => {
    const matchingVariation = findMatchingVariation();
    setSelectedPrice(matchingVariation?.variation_price || product?.product_price || 0);
    setSelectedDiscountPrice(matchingVariation?.variation_discount_price || product?.product_discount_price || 0)
  }, [findMatchingVariation, product]);

  const handleSelect = (attributeName: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  const handleOrder = () => {
    // Determine the price based on whether product_price exists or we need to use variations
    let price: number

    if (product?.product_price) {
      // If product has a direct price, use it
      price = product.product_price
    } else if (product?.variations && product.variations?.length > 0) {
      // If product has variations, take the first variation's discount price
      // Use the first non-undefined price or default to 0
      const firstVariationPrice = product.variations[0]?.variation_discount_price
      price = typeof firstVariationPrice === "number" ? firstVariationPrice : 0
    } else {
      // Fallback price if neither is available
      price = 0
    }

    sendOrderToWhatsApp({
      productName: product?.product_name,
      productId: product?._id,
      price: price,
      quantity,
      selectedAttribute: selectedAttributes
    })
  }

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
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image src={currentImage || "/placeholder.svg"} alt={product?.product_name} fill className="object-cover" />
          </div>

          {/* Additional Images */}
          {product?.additional_images && product.additional_images?.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {/* Main thumbnail */}
              <button
                onClick={() => setCurrentImage(product?.thumbnail_image)}
                className={`flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden border-2 ${currentImage === product?.thumbnail_image ? "border-[#ff6600]" : "border-transparent"
                  }`}
              >
                <Image
                  src={product?.thumbnail_image || "/placeholder.svg"}
                  alt={`${product?.product_name} thumbnail`}
                  fill
                  className="object-cover"
                />
              </button>

              {/* Additional images */}
              {product.additional_images?.map((img) => (
                <button
                  key={img._id}
                  onClick={() => setCurrentImage(img?.additional_image || '')}
                  className={`flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden border-2 ${currentImage === img.additional_image ? "border-[#ff6600]" : "border-transparent"
                    }`}
                >
                  <Image
                    src={img.additional_image || "/placeholder.svg"}
                    alt={`${product.product_name} additional view`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="font-poppins text-3xl font-bold text-[#222222] mb-2">{product?.product_name}</h1>
          {/* Reviews */}
          {/* <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-inter text-sm text-[#666666]">(24 reviews)</span>
          </div> */}

          {/* Product price */}
          <div className="font-poppins text-2xl font-bold text-[#ff6600] mb-6">
            <div className="font-poppins text-2xl font-bold text-[#ff6600] mb-6">
              {selectedDiscountPrice}
              <span className="ml-2 text-lg line-through text-[#666666]">
                  {selectedPrice}
                </span>
              {/* {product?.product_discount_price && product.product_discount_price !== selectedDiscountPrice && (
                <span className="ml-2 text-lg line-through text-[#666666]">
                  {selectedDiscountPrice}
                </span>
              )} */}
            </div>
          </div>

          {/* Product Description */}
          <div className="font-inter text-[#666666] mb-6">{parse(product?.description)}</div>

          {/* {product?.attributes_details && product?.attributes_details.map((attr) => (
            <div className="mb-6" key={attr?._id}>
              <h3 className="font-poppins text-sm font-medium text-[#444444] mb-3">{attr?.attribute_name}</h3>
              <div className="flex gap-3">
                {attr?.attribute_values && attr?.attribute_values.map((value) => (
                  <button
                    key={value?._id}
                    onClick={() => setSelectedAttr(value)}
                    className={`w-10 h-10 rounded-full border-2 ${selectedAttr === value ? "border-[#ff6600]" : "border-transparent"
                      }`}
                  >
                    <span className="block w-full h-full rounded-full" style={{ backgroundColor: 'orange' }} />
                  </button>
                ))}
              </div>
            </div>
          ))} */}
          <div>
            {product?.attributes_details?.map((attr) => (
              <div className="mb-6" key={attr?._id}>
                <h3 className="font-poppins text-sm font-medium text-[#444444] mb-3">
                  {attr?.attribute_name}
                </h3>

                <div className="flex gap-3">
                  {attr?.attribute_values?.map((value) => {
                    const isSelected = selectedAttributes[attr.attribute_name ?? ''] === value.attribute_value_name;
                    if (attr.attribute_name && attr.attribute_name.toLowerCase() === "color") {
                      return (
                        <button
                          key={value?._id}
                          onClick={() => {
                            if (attr?.attribute_name && value?.attribute_value_name) {
                              handleSelect(attr.attribute_name, value.attribute_value_name);
                            }
                          }}
                          className={`w-10 h-10 rounded-full border-2 cursor-pointer ${isSelected ? "border-[#ff6600]" : "border-transparent"}`}
                        >
                          <span
                            className="block w-full h-full rounded-full"
                            style={{ backgroundColor: value.attribute_value_name && value.attribute_value_name.toLowerCase() }}
                          />
                        </button>
                      );
                    } else if (attr.attribute_name && attr.attribute_name.toLowerCase() === "size") {
                      return (
                        <button
                          key={value?._id}
                          onClick={() => {
                            if (attr?.attribute_name && value?.attribute_value_name) {
                              handleSelect(attr.attribute_name, value.attribute_value_name);
                            }
                          }}
                          className={`w-10 h-10 flex items-center justify-center rounded border cursor-pointer ${isSelected ? "border-[#ff6600] bg-[#ff6600]/10 text-[#ff6600]" : "border-gray-300 text-[#666666]"
                            }`}
                        >
                          {value.attribute_value_name}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          key={value?._id}
                          onClick={() => {
                            if (attr?.attribute_name && value?.attribute_value_name) {
                              handleSelect(attr.attribute_name, value.attribute_value_name);
                            }
                          }}
                          className={`px-3 py-1 border rounded cursor-pointer ${isSelected ? "border-[#ff6600] bg-[#ff6600]/10 text-[#ff6600]" : "border-gray-300 text-[#666666]"
                            }`}
                        >
                          {value.attribute_value_name}
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>


          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-poppins text-sm font-medium text-[#444444] mb-3">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity} className="h-10 w-10 rounded-r-none cursor-pointer">
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-10 w-14 flex items-center justify-center border-y border-input">{quantity}</div>
              <Button variant="outline" size="icon" onClick={incrementQuantity} className="h-10 w-10 rounded-l-none  cursor-pointer">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Order Button */}
          <Button
            onClick={handleOrder}
            size="lg"
            className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105"
          >
            Order via WhatsApp
          </Button>

          {/* Share */}
          {/* <Button variant="ghost" size="sm" className="mt-4 text-[#666666]">
            <Share2 className="mr-2 h-4 w-4" />
            Share this product
          </Button> */}
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
              <div>{parse(product.description)}</div>
              {/* <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p> */}
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