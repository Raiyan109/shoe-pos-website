export default function ProductCardSkeleton() {
    return (
        <div className="group relative bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
            {/* Image placeholder */}
            <div className="relative aspect-square bg-gray-200"></div>

            {/* Content placeholder */}
            <div className="p-4">
                {/* Title placeholder */}
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>

                {/* Description placeholder */}
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>

                {/* Price and button placeholder */}
                <div className="flex items-center justify-between">
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        </div>
    )
}
