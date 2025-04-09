"use client"

import { useState, useEffect } from "react"
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

export default function BannerCarousel({ banners }: BannerCarouselProps) {
    const [current, setCurrent] = useState(0)
    const [autoplay, setAutoplay] = useState(true)

    const next = () => {
        setCurrent((current) => (current === banners?.length - 1 ? 0 : current + 1))
    }

    const prev = () => {
        setCurrent((current) => (current === 0 ? banners?.length - 1 : current - 1))
    }

    useEffect(() => {
        if (!autoplay) return

        const interval = setInterval(next, 5000)
        return () => clearInterval(interval)
    }, [autoplay, banners?.length])

    // Pause autoplay on hover
    const handleMouseEnter = () => setAutoplay(false)
    const handleMouseLeave = () => setAutoplay(true)

    // Handle shop now button click
    const handleShopNowClick = (e: React.MouseEvent, path: string) => {
        e.stopPropagation() // Stop event propagation
        console.log("Shop Now clicked, navigating to:", path)
        window.location.href = path // Direct navigation as a fallback
    }

    return (
        <div className="relative h-[70vh] overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {banners?.map((banner, index) => (
                    <div key={banner?._id} className="w-full h-full flex-shrink-0 relative">
                        <Image
                            src={banner?.banner_logo || "/placeholder.svg"}
                            alt={banner?.banner_title}
                            fill
                            className="object-cover brightness-[0.8]"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 flex items-center pointer-events-none">
                            <div className="container mx-auto px-4 py-32 text-white">
                                <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-2xl">
                                    {banner?.banner_title}
                                </h1>
                                {/* <Button
                                    asChild
                                    size="lg"
                                    className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105 cursor-pointer"
                                >
                                    <Link href={banner?.banner_path} className="cursor-pointer">Shop Now</Link>
                                </Button> */}
                                {/* Fixed button with link */}
                                {/* {banner?.banner_path && (
                                    <Link href={banner.banner_path}>
                                        <Button
                                            
                                            size="lg"
                                            className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105 cursor-pointer z-[999]"
                                            onClick={() => console.log('clicked')
                                            }
                                        >
                                            Shop Now
                                        </Button>
                                    </Link>
                                )} */}
                                {banner?.banner_path && (
                                    <div className="pointer-events-auto relative z-10">
                                        <Button
                                            size="lg"
                                            className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-medium transition-transform hover:scale-105 cursor-pointer"
                                            onClick={(e) => handleShopNowClick(e, banner.banner_path)}
                                        >
                                            Shop Now
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/10 cursor-pointer"
                    onClick={prev}
                >
                    <ChevronLeft className="h-8 w-8" />
                    <span className="sr-only">Previous slide</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-black/20 text-white hover:bg-black/10 cursor-pointer"
                    onClick={next}
                >
                    <ChevronRight className="h-8 w-8" />
                    <span className="sr-only">Next slide</span>
                </Button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0">
                <div className="flex items-center justify-center gap-2">
                    {banners?.map((_, index) => (
                        <button
                            key={index}
                            className={cn(
                                "w-3 h-3 rounded-full transition-all",
                                current === index ? "bg-white scale-110" : "bg-white/50",
                            )}
                            onClick={() => setCurrent(index)}
                        >
                            <span className="sr-only">Go to slide {index + 1}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

