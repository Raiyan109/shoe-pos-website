"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Banner {
    _id: string
    banner_title: string
    banner_logo: string
    banner_path: string
}

interface BannerCarouselProps {
    banners: Banner[]
}

export default function BannerCarousel({ banners = [] }: BannerCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const bannerCount = banners.length

    const nextSlide = useCallback(() => {
        setActiveIndex((current) => (current === bannerCount - 1 ? 0 : current + 1))
    }, [bannerCount])

    const prevSlide = useCallback(() => {
        setActiveIndex((current) => (current === 0 ? bannerCount - 1 : current - 1))
    }, [bannerCount])

    const goToSlide = useCallback((index: number) => {
        setActiveIndex(index)
    }, [])

    // Autoplay functionality
    useEffect(() => {
        if (isPaused || bannerCount <= 1) return

        const interval = setInterval(() => {
            nextSlide()
        }, 5000)

        return () => clearInterval(interval)
    }, [isPaused, nextSlide, bannerCount])

    if (bannerCount === 0) {
        return null
    }

    return (
        <div
            className="relative h-[70vh] overflow-hidden bg-black"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slides */}
            {banners.map((banner, index) => (
                <div
                    key={banner._id || index}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-1000",
                        index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0",
                    )}
                >
                    {/* Banner Image */}
                    <div className="relative w-full h-full">
                        <Image
                            src={banner.banner_logo || "/placeholder.svg?height=800&width=1200"}
                            alt={banner.banner_title || "Banner"}
                            fill
                            className="object-cover brightness-[0.8]"
                            priority={index === 0}
                        />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-4 py-32 text-white">
                            <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-2xl">
                                {banner.banner_title}
                            </h1>

                            {banner.banner_path && (
                                <Link href={banner.banner_path} className="cursor-pointer">
                                    <Button
                                        size="lg"
                                        className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105 cursor-pointer"
                                    >
                                        Shop Now
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {bannerCount > 1 && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 z-20">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
                        onClick={prevSlide}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/40"
                        onClick={nextSlide}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Button>
                </div>
            )}

            {/* Indicators */}
            {bannerCount > 1 && (
                <div className="absolute bottom-4 left-0 right-0 z-20">
                    <div className="flex items-center justify-center gap-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all",
                                    activeIndex === index ? "bg-white scale-110" : "bg-white/50",
                                )}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                <span className="sr-only">Go to slide {index + 1}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
