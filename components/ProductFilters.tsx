"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 500])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-poppins text-lg font-semibold text-[#333333] mb-4">Filters</h3>
        <Button variant="outline" className="w-full justify-between text-[#666666]">
          Clear All Filters
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "color", "size"]} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="font-poppins text-[#444444]">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[0, 500]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <span className="font-inter text-sm text-[#666666]">${priceRange[0]}</span>
                <span className="font-inter text-sm text-[#666666]">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="font-poppins text-[#444444]">Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Black", "White", "Red", "Blue", "Green"].map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox id={`color-${color.toLowerCase()}`} />
                  <Label htmlFor={`color-${color.toLowerCase()}`} className="font-inter text-sm text-[#666666]">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="font-poppins text-[#444444]">Size</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox id={`size-${size.toLowerCase()}`} />
                  <Label htmlFor={`size-${size.toLowerCase()}`} className="font-inter text-sm text-[#666666]">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="font-poppins text-[#444444]">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Brand A", "Brand B", "Brand C", "Brand D"].map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand.toLowerCase().replace(/\s+/g, "-")}`} />
                  <Label
                    htmlFor={`brand-${brand.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-inter text-sm text-[#666666]"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

