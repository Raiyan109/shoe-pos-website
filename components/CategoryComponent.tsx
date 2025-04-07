'use client'

import { Brand, Product } from "@/lib/types"
import ProductCard from "./ProductCard"
import { ProductFilters } from "./ProductFilters"
import { useState } from "react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface IBrand {
    success: boolean
    message: string
    data: Brand[]
}

const CategoryComponent = ({ brands, categoryProducts }: { brands: IBrand, categoryProducts: Product[] }) => {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string>>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
        setCurrentPage(1);
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

    const totalPages = Math.ceil(filteredCategoryProducts.length / itemsPerPage);
    const paginatedProducts = filteredCategoryProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-64 shrink-0">
                    <ProductFilters brands={brands?.data} products={categoryProducts} onFilterChange={handleFilterChange} />
                </div>

                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedProducts?.map((product: Product) => (
                            <ProductCard key={product?._id} product={product} />
                        ))}
                    </div>

                    {paginatedProducts?.length === 0 && (
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
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handlePreviousPage()
                                    }}
                                >
                                    Previous
                                </button>
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <button
                                        className={`px-3 py-1 rounded-md border ${currentPage === i + 1 ? 'bg-gray-200 font-semibold' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setCurrentPage(i + 1)
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <button
                                    className="px-3 py-1 rounded-md border disabled:opacity-50"
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleNextPage()
                                    }}
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