"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4",
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="font-poppins text-2xl font-bold text-[#222222]">
                        Store<span className="text-[#ff6600]">Name</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="font-inter text-[#444444] hover:text-[#ff6600] transition-colors">
                            Home
                        </Link>
                        <Link href="/categories" className="font-inter text-[#444444] hover:text-[#ff6600] transition-colors">
                            Categories
                        </Link>
                        <Link href="#" className="font-inter text-[#444444] hover:text-[#ff6600] transition-colors">
                            New Arrivals
                        </Link>
                        <Link href="#" className="font-inter text-[#444444] hover:text-[#ff6600] transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Search and Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-[#444444]">
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon" className="text-[#444444]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px] pl-2">
                                <SheetTitle className="hidden">Menu</SheetTitle>
                                <div className="flex flex-col h-full">
                                    <div className="py-6">
                                        <Link href="/" className="font-poppins text-2xl font-bold text-[#222222]">
                                            Store<span className="text-[#ff6600]">Name</span>
                                        </Link>
                                    </div>

                                    <div className="mb-6">
                                        <Input placeholder="Search products..." className="font-inter" style={{width: '250px'}} />
                                    </div>

                                    <nav className="flex flex-col space-y-6">
                                        <Link href="/" className="font-inter text-lg text-[#444444] hover:text-[#ff6600] transition-colors">
                                            Home
                                        </Link>
                                        <Link
                                            href="/categories"
                                            className="font-inter text-lg text-[#444444] hover:text-[#ff6600] transition-colors"
                                        >
                                            Categories
                                        </Link>
                                        <Link href="#" className="font-inter text-lg text-[#444444] hover:text-[#ff6600] transition-colors">
                                            New Arrivals
                                        </Link>
                                        <Link href="#" className="font-inter text-lg text-[#444444] hover:text-[#ff6600] transition-colors">
                                            Contact
                                        </Link>
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}

