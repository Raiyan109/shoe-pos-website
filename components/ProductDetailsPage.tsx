'use client'
import { sendOrderToWhatsApp } from '@/lib/whatsapp'
import { notFound, usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Minus, Plus } from "lucide-react"
import parse from "html-react-parser";
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Product } from '@/lib/types'
import { toast } from "sonner"


const ProductDetailsPage = ({ product }: { product: Product }) => {
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
  const [productPrice, setProductPrice] = useState(product?.product_price || 0);
  const [productDiscountPrice, setProductDiscountPrice] = useState(product?.product_discount_price || 0);
  const [unitPrice, setUnitPrice] = useState(product?.product_discount_price || 0);
  const [selectedQuantity, setSelectedQuantity] = useState(product?.product_quantity || 0);
  const [fullUrl, setFullUrl] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      setFullUrl(origin + pathname)
    }
  }, [pathname])


  const handleBack = () => {
    router.back()
  }


  const incrementQuantity = () => {
    if (quantity >= selectedQuantity) {
      toast.error("Stock not available")
      return
    }
    setQuantity((prev) => prev + 1)
  }
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

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
    // const discountPriceWithQuantity = matchingVariation?.variation_discount_price || product?.product_discount_price || 0
    // const mainPriceWithQuantity = matchingVariation?.variation_price || product?.product_price || 0
    // if (!discountPriceWithQuantity) return
    // if (!mainPriceWithQuantity) return
    // const discountPrice = discountPriceWithQuantity * quantity
    // const mainPrice = mainPriceWithQuantity * quantity
    // setSelectedDiscountPrice(discountPrice)
    // setSelectedPrice(mainPrice);
    // setUnitPrice(matchingVariation?.variation_discount_price || product?.product_discount_price || 0)
    const unitDiscountPrice = matchingVariation?.variation_discount_price || product?.product_discount_price || 0
    const unitMainPrice = matchingVariation?.variation_price || product?.product_price || 0

    // Always calculate both prices with quantity
    const discountPrice = unitDiscountPrice * quantity
    const mainPrice = unitMainPrice * quantity

    setSelectedDiscountPrice(discountPrice)
    setSelectedPrice(mainPrice)
    setProductDiscountPrice(unitDiscountPrice)
    setProductPrice(unitMainPrice)
    setUnitPrice(unitDiscountPrice || unitMainPrice)
    // setSelectedPrice(matchingVariation?.variation_price || product?.product_price || 0);
    // setSelectedDiscountPrice(matchingVariation?.variation_discount_price || product?.product_discount_price || 0)
    if (matchingVariation) {
      setSelectedQuantity(matchingVariation.variation_quantity || 0)
    } else {
      setSelectedQuantity(product?.product_quantity || 0)
    }
  }, [findMatchingVariation, product, quantity, selectedQuantity]);

  // useEffect(() => {
  //   const matchingVariation = findMatchingVariation()
  //   const newStockQuantity = matchingVariation?.variation_quantity || 0

  //   // If current quantity exceeds available stock, adjust it
  //   if (quantity > newStockQuantity && newStockQuantity > 0) {
  //     setQuantity(newStockQuantity)
  //     toast.info(`Quantity adjusted to maximum available stock (${newStockQuantity})`)
  //   }

  //   setSelectedQuantity(newStockQuantity)
  // }, [selectedAttributes, findMatchingVariation])
  useEffect(() => {
    const matchingVariation = findMatchingVariation()
    // If there's a matching variation, use its quantity
    if (matchingVariation) {
      const newStockQuantity = matchingVariation.variation_quantity || 0

      // If current quantity exceeds available stock, adjust it
      if (quantity > newStockQuantity && newStockQuantity > 0) {
        setQuantity(newStockQuantity)
        toast.info(`Quantity adjusted to maximum available stock (${newStockQuantity})`)
      }

      setSelectedQuantity(newStockQuantity)
    } else {
      // For products without variations, use product_quantity
      const productQuantity = product?.product_quantity || 0

      // If current quantity exceeds available stock, adjust it
      if (quantity > productQuantity && productQuantity > 0) {
        setQuantity(productQuantity)
        toast.info(`Quantity adjusted to maximum available stock (${productQuantity})`)
      }

      setSelectedQuantity(productQuantity)
    }
  }, [selectedAttributes, findMatchingVariation, product, quantity])


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
      // const firstVariationPrice = product.variations[0]?.variation_discount_price
      // price = typeof firstVariationPrice === "number" ? firstVariationPrice : 0
      price = unitPrice
    } else {
      // Fallback price if neither is available
      price = 0
    }

    sendOrderToWhatsApp({
      productName: product?.product_name,
      productLink: fullUrl,
      price: price,
      quantity,
      selectedAttribute: selectedAttributes
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* <Link
        href={`/categories/${category?.category_slug}`}
        className="inline-flex items-center font-inter text-[#666666] hover:text-[#ff6600] mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {category?.category_name}
      </Link> */}
      <button
        onClick={handleBack}
        className="inline-flex items-center font-inter text-[#666666] hover:text-[#ff6600] mb-8 cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go Back
      </button>

      <div className="flex justify-between flex-col lg:flex-row gap-16 lg:gap-56">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full lg:w-3/4">
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

            {/* Product price */}
            <div className="font-poppins text-2xl font-bold text-[#ff6600] mb-6">
              <div className="font-poppins text-2xl font-bold text-[#ff6600] mb-6">
                <span>৳ {productDiscountPrice > 0 ? new Intl.NumberFormat("en-IN").format(productDiscountPrice) : new Intl.NumberFormat("en-IN").format(productPrice)}</span>
                {productDiscountPrice > 0 &&
                  <span className="ml-2 text-lg line-through text-[#666666]">
                    ৳ {new Intl.NumberFormat("en-IN").format(productPrice)}
                  </span>
                }
                {/* <span>৳ {selectedDiscountPrice > 0 ? new Intl.NumberFormat("en-IN").format(selectedDiscountPrice) : new Intl.NumberFormat("en-IN").format(selectedPrice)}</span>
                {selectedDiscountPrice > 0 &&
                  <span className="ml-2 text-lg line-through text-[#666666]">
                    ৳ {new Intl.NumberFormat("en-IN").format(selectedPrice)}
                  </span>
                } */}

              </div>
            </div>

            {/* Product Description */}
            {/* <div className="font-inter text-[#666666] mb-6">{parse(product?.description)}</div> */}

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

            {/* Attributes */}
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

            {/* Available Stock */}
            <h1 className={`font-poppins text-sm  ${selectedQuantity < 1 ? 'text-red-600 font-bold' : 'text-[#444444] font-medium'} mb-3`}>Available stock: {selectedQuantity}</h1>

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
            {/* <Button
              onClick={handleOrder}
              size="lg"
              className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105"
            >
              Order via WhatsApp
            </Button> */}

            {/* Share */}
            {/* <Button variant="ghost" size="sm" className="mt-4 text-[#666666]">
            <Share2 className="mr-2 h-4 w-4" />
            Share this product
          </Button> */}
          </div>
        </div>

        {/* Order summary */}
        {
          selectedQuantity > 0 ? (
            <div className="w-full lg:w-2/4">
              <div className="border rounded-lg shadow-sm p-6">
                <h1 className="text-center text-2xl font-semibold mb-6 text-[#222222]">Order Summary</h1>

                <div className="space-y-4">
                  {/* Product summary */}
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={currentImage || "/placeholder.svg"}
                        alt={product?.product_name || "Product"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#222222] line-clamp-2">{product?.product_name}</h3>
                      {Object.entries(selectedAttributes).length > 0 && (
                        <div className="text-sm text-[#666666] mt-1">
                          {Object.entries(selectedAttributes).map(
                            ([key, value]) =>
                              value && (
                                <span key={key} className="mr-2">
                                  {key}: {value}
                                </span>
                              ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-2 pb-4 border-b">
                    <div className="flex justify-between text-[#666666]">
                      <span>Price</span>
                      <span>৳ {new Intl.NumberFormat("en-IN").format(selectedPrice)}</span>
                    </div>
                    <div className="flex justify-between text-[#666666]">
                      <span>Quantity</span>
                      <span>{quantity}</span>
                    </div>
                    {selectedDiscountPrice > 0 && selectedPrice !== selectedDiscountPrice / quantity && (
                      <div className="flex justify-between text-[#666666]">
                        <span>Discount</span>
                        <span className="text-green-600">৳
                          -{(selectedPrice - selectedDiscountPrice).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#ff6600]">৳ {selectedDiscountPrice > 0 ? new Intl.NumberFormat("en-IN").format(selectedDiscountPrice) : new Intl.NumberFormat("en-IN").format(selectedPrice)}</span>
                  </div>

                  {/* Order button for mobile */}
                  <div className="mt-4">
                    <Button
                      disabled={selectedQuantity < 1}
                      onClick={handleOrder}
                      size="lg"
                      className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105 cursor-pointer"
                    >
                      Order via WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* <p className='text-red-500 text-2xl'>Stock is not available.</p> */}
            </div>
          )
        }

      </div>
      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description" className="font-poppins">
              Description
            </TabsTrigger>
            {/* <TabsTrigger value="specifications" className="font-poppins">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="font-poppins">
              Reviews
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="font-inter text-[#666666] space-y-4">
              <div className='prose'>{parse(product.description)}</div>
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