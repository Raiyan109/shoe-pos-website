'use client'

import { Product } from "@/lib/types"
import ProductCard from "./ProductCard"
import { useRouter, useSearchParams } from 'next/navigation'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"

interface IProps {
    data: Product[],
    success: boolean
    message: string
}

const AllProductComponent = ({ products, limit, totalCount }: {
    products: IProps
    limit: number
    totalCount: number
}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1;

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        params.set('limit', limit.toString())

        router.push(`/products?${params.toString()}`)
    }
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {products?.data?.map((product: Product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

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
    )
}

export default AllProductComponent