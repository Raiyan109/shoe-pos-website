"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
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
import * as React from "react"
import { Category } from "@/lib/types"

const components: { title: string; href: string; }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
       
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
       
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
       
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        
    },
]

export default function Navbar({categories}: {categories: Category[]}) {
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
                        {/* <Link href="/" className="font-inter text-[#444444] hover:text-[#ff6600] transition-colors">
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
                        </Link> */}
                        <NavigationMenu>
                        <NavigationMenuList>
                        <NavigationMenuItem>
                                <Link href="/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Home
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {categories.map((component:Category) => (
                                            <ListItem
                                                key={component?._id}
                                                title={component?.category_name}
                                                href={`/categories/${component?.category_slug}`}
                                            >
                                                {/* {component.description} */}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
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
                                        <Input placeholder="Search products..." className="font-inter" style={{ width: '250px' }} />
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