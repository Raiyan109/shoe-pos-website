'use client'

import { Brand, Product } from "@/lib/types"
import ProductCard from "./ProductCard"
import { ProductFilters } from "./ProductFilters"
import { useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { useRouter, useSearchParams } from 'next/navigation'

interface IBrand {
    success: boolean
    message: string
    data: Brand[]
}

const CategoryComponent = ({ brands, categoryProducts,
    // currentPage,
    limit,
    totalCount,
    slug }: {
        brands: IBrand
        categoryProducts: Product[]
        // currentPage: number
        limit: number
        totalCount: number
        slug: string
    }) => {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string>>>({});

    const handleFilterChange = (attributeName: string, value: string, isChecked: boolean) => {
        setSelectedFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            if (!newFilters[attributeName]) {
                newFilters[attributeName] = new Set();
            }

            if (isChecked) {
                newFilters[attributeName].add(value); // Add value if checked
            } else {
                newFilters[attributeName].delete(value); // Remove value if unchecked
            }

            return newFilters;
        });
    };

    const filterProducts = (products: Product[], filters: Record<string, Set<string>>) => {
        return products.filter(product => {
            return Object.entries(filters).every(([attributeName, selectedValues]) => {
                // Ensure 'selectedValues' is treated as a Set<string>
                const productAttributeValues = product?.attributes_details?.filter(attr => attr.attribute_name === attributeName)
                    .flatMap(attr => attr?.attribute_values?.map(value => value.attribute_value_name));

                // Check if the product has all the selected values for the attribute
                return selectedValues.size === 0 || [...selectedValues].every((value: string) => productAttributeValues?.includes(value)); // Explicitly type 'value' as string
            });
        });
    };


    // Filter the category products based on selected filters
    const filteredCategoryProducts = filterProducts(categoryProducts, selectedFilters);

    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1;

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        params.set('limit', limit.toString())

        router.push(`/categories/${slug}?${params.toString()}`)
    }


    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-64 shrink-0">
                    <ProductFilters brands={brands?.data} products={categoryProducts} onFilterChange={handleFilterChange} />
                </div>

                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCategoryProducts?.map((product: Product) => (
                            <ProductCard key={product?._id} product={product} />
                        ))}
                    </div>

                    {filteredCategoryProducts?.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="font-poppins text-xl font-semibold text-[#444444] mb-2">No products found</h3>
                            <p className="font-inter text-[#666666]">Try adjusting your filters or check back later.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
                <div className="mt-5 flex items-center justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <button
                                    className="px-3 py-1 rounded-md border disabled:opacity-50"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Previous
                                </button>
                            </PaginationItem>

                            {Array.from({ length: Math.ceil(totalCount / limit) }, (_, i) => {
                                const pageNumber = i + 1;
                                return (
                                    <PaginationItem key={i}>
                                        <button
                                            className={`px-3 py-1 rounded-md border cursor-pointer ${currentPage === pageNumber ? "bg-gray-200 font-semibold" : ""
                                                }`}
                                            onClick={() => handlePageChange(pageNumber)}
                                        >
                                            {pageNumber}
                                        </button>
                                    </PaginationItem>
                                );
                            })}


                            <PaginationItem>
                                <button
                                    className="px-3 py-1 rounded-md border disabled:opacity-50"
                                    disabled={currentPage === Math.ceil(totalCount / limit)}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

            </div>
        </div>
    )
}

export default CategoryComponent