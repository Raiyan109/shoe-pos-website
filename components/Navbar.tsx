"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import * as React from "react"
import { Category, Product, Variation } from "@/lib/types"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar({ categories, products, settingsData }: { categories: Category[], products: Product[], settingsData: string }) {
    const [isScrolled, setIsScrolled] = useState(false)
    // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    const mobileSearchInputRef = React.useRef<HTMLInputElement>(null)
    const pathname = usePathname()

    useEffect(() => {
        // Focus the search input when search is opened
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [isSearchOpen])

    // Handle search
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([])
            return
        }

        const query = searchQuery.toLowerCase()
        const filtered = products.filter((product) => product?.product_name.toLowerCase().includes(query))
        setSearchResults(filtered)
    }, [searchQuery])

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen)
        if (!isSearchOpen) {
            // Reset search when opening
            setSearchQuery("")
            setSearchResults([])
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Function to handle product click in mobile view
    const handleProductClick = () => {
        setIsSheetOpen(false)
        setSearchQuery("")
    }

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
                        {settingsData}
                        {/* <span className="text-[#ff6600]">Name</span> */}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href="/" legacyBehavior passHref>
                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/" ? "bg-accent" : "")}>
                                            Home
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <div className="hidden lg:flex items-center justify-center gap-1">
                                    {categories?.map((category: Category) => {
                                        if (category?.total_product > 0) {
                                            const categoryPath = `/categories/${category?.category_slug}`
                                            const isActive = pathname === categoryPath || pathname.startsWith(`${categoryPath}/`)
                                            return (
                                                <NavigationMenuItem key={category?._id}>
                                                    <Link href={categoryPath} legacyBehavior passHref>
                                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), isActive ? "bg-accent px-2" : " px-2")}>
                                                            {category?.category_name}
                                                        </NavigationMenuLink>
                                                    </Link>
                                                </NavigationMenuItem>
                                            )
                                        }
                                    })}
                                </div>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-accent">All Categories</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {categories?.map((category: Category) => {
                                                if (category?.total_product > 0)
                                                    return (
                                                        <ListItem
                                                            key={category?._id}
                                                            title={category?.category_name}
                                                            href={`/categories/${category?.category_slug}`}
                                                        >

                                                        </ListItem>
                                                    )
                                            })}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>


                    {/* Search and Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-[#444444] cursor-pointer" onClick={toggleSearch}>
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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


                                    {/* Mobile Search */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between">
                                            <div className="relative flex-1">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    placeholder="Search products..."
                                                    className="pl-9 font-inter"
                                                    ref={mobileSearchInputRef}
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                            {searchQuery && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="ml-2 text-[#444444]"
                                                    onClick={() => setSearchQuery("")}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>

                                        {/* Mobile Search Results - Integrated into the sheet content flow */}
                                        {searchQuery.trim() !== "" && (
                                            <div className="mt-4 mb-6 border rounded-md overflow-hidden">
                                                {searchResults?.length > 0 ? (
                                                    <div className="max-h-[50vh] overflow-y-auto">
                                                        {searchResults.slice(0, 5).map((product) => {
                                                            // Check if variations exist before mapping
                                                            const variationDiscountPrices = product?.variations
                                                                ? product?.variations
                                                                    ?.map((variation: Variation) => variation?.variation_discount_price)
                                                                    .filter((price): price is number => price !== undefined)
                                                                : []

                                                            const variationBuyingPrices = product?.variations
                                                                ? product.variations
                                                                    ?.map((variation: Variation) => variation?.variation_price)
                                                                    .filter((price): price is number => price !== undefined)
                                                                : []

                                                            // Get the first available discount & buying price
                                                            const firstDiscountPrice =
                                                                variationDiscountPrices?.length > 0 ? variationDiscountPrices[0] : undefined
                                                            const firstBuyingPrice =
                                                                variationBuyingPrices?.length > 0 ? variationBuyingPrices[0] : undefined

                                                            return (
                                                                <Link
                                                                    key={product?._id}
                                                                    href={`/products/${product?._id}`}
                                                                    className="flex items-center p-3 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                                                                    onClick={handleProductClick}
                                                                >
                                                                    <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                                                        <Image
                                                                            src={product?.thumbnail_image || "/placeholder.svg"}
                                                                            alt={product?.product_name}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-3 flex-1">
                                                                        <h3 className="font-poppins text-sm font-medium text-[#333333] line-clamp-2">
                                                                            {product?.product_name}
                                                                        </h3>
                                                                        <div className="font-poppins font-bold text-[#ff6600]">
                                                                            {product?.product_price
                                                                                ? `$${product?.product_price}`
                                                                                : firstDiscountPrice && firstDiscountPrice > 0
                                                                                    ? `$${firstDiscountPrice}`
                                                                                    : "0"}

                                                                            {firstBuyingPrice && firstBuyingPrice > 0 ? (
                                                                                <span className="ml-2 text-sm line-through text-[#666666]">
                                                                                    ${firstBuyingPrice}
                                                                                </span>
                                                                            ) : (
                                                                                <span className="ml-2 text-sm line-through text-[#666666]"></span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        })}
                                                        {searchResults.length > 5 && (
                                                            <div className="p-3 text-center border-t">
                                                                <Link
                                                                    href={`/search?query=${encodeURIComponent(searchQuery)}`}
                                                                    className="text-[#ff6600] text-sm font-medium hover:underline"
                                                                    onClick={() => setIsSheetOpen(false)}
                                                                >
                                                                    View all {searchResults.length} results
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-6 px-4">
                                                        <p className="font-inter text-[#666666]">
                                                            No products found matching &quot;{searchQuery}&quot;
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <nav className="flex flex-col space-y-2">
                                        <Link
                                            href="/"
                                            className="font-inter text-lg text-[#444444] hover:text-[#ff6600] transition-colors p-2 rounded-md hover:bg-gray-100"
                                            onClick={() => setIsSheetOpen(false)}
                                        >
                                            Home
                                        </Link>

                                        {/* Categories Accordion */}
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="categories" className="border-none">
                                                <AccordionTrigger className="font-inter text-lg text-[#444444] hover:text-[#ff6600] transition-colors p-2 rounded-md hover:bg-gray-100 py-2">
                                                    Categories
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="pl-4 py-2 space-y-2">
                                                        {categories?.map((category) => {
                                                            if (category?.total_product > 0)
                                                                return (
                                                                    <Link
                                                                        key={category?._id}
                                                                        href={`/categories/${category?.category_slug}`}
                                                                        className="font-inter text-[#444444] hover:text-[#ff6600] transition-colors flex items-center p-2 rounded-md hover:bg-gray-100"
                                                                        onClick={() => setIsSheetOpen(false)}
                                                                    >
                                                                        <ChevronRight className="h-4 w-4 mr-2 text-[#ff6600]" />
                                                                        {category?.category_name}
                                                                    </Link>
                                                                )
                                                        })}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>

            {/* Search Panel */}
            <div className={cn(
                "absolute left-0 right-0 bg-white shadow-md transition-all duration-300 overflow-hidden",
                isSearchOpen ? "max-h-[80vh] border-t" : "max-h-0",
            )}>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="relative flex-1 max-w-2xl">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                ref={searchInputRef}
                                placeholder="Search products..."
                                className="pl-10 font-inter"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="ml-2 text-[#444444]" onClick={toggleSearch}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Search Results */}
                    {searchQuery.trim() !== "" && (
                        <div className="mt-4 max-h-[60vh] overflow-y-auto">
                            {searchResults?.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {searchResults?.map((product) => {
                                        // Check if variations exist before mapping
                                        const variationDiscountPrices = product?.variations
                                            ? product?.variations
                                                ?.map((variation: Variation) => variation?.variation_discount_price)
                                                .filter((price): price is number => price !== undefined)
                                            : [];

                                        const variationBuyingPrices = product?.variations
                                            ? product.variations
                                                ?.map((variation: Variation) => variation?.variation_price)
                                                .filter((price): price is number => price !== undefined)
                                            : [];

                                        // Get the first available discount & buying price
                                        const firstDiscountPrice = variationDiscountPrices?.length > 0 ? variationDiscountPrices[0] : undefined;
                                        const firstBuyingPrice = variationBuyingPrices?.length > 0 ? variationBuyingPrices[0] : undefined;
                                        return (
                                            <Link
                                                key={product?._id}
                                                href={`/products/${product?._id}`}
                                                className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsSearchOpen(false)}
                                            >
                                                <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={product?.thumbnail_image || "/placeholder.svg"}
                                                        alt={product?.product_name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <h3 className="font-poppins text-sm font-medium text-[#333333] line-clamp-2">{product?.product_name}</h3>
                                                    <div className="font-poppins font-bold text-[#ff6600]">
                                                        {product?.product_price ? (
                                                            `$${product?.product_price}`
                                                        ) : firstDiscountPrice && firstDiscountPrice > 0 ? (
                                                            `$${firstDiscountPrice}`
                                                        ) : (
                                                            "0"
                                                        )}

                                                        {firstBuyingPrice && firstBuyingPrice > 0 ? (
                                                            <span className="ml-2 text-sm line-through text-[#666666]">${firstBuyingPrice}</span>
                                                        ) : (
                                                            <span className="ml-2 text-sm line-through text-[#666666]"></span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="font-inter text-[#666666]">No products found matching &quot;{searchQuery}&quot;</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"