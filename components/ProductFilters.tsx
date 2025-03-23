"use client"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Brand, Product } from "@/lib/types"

interface ProductFiltersProps {
  brands: Brand[];
  products: Product[];
  onFilterChange: (attributeName: string, value: string, isChecked: boolean) => void;
}


export function ProductFilters({ brands, products, onFilterChange }: ProductFiltersProps) {
  // const [priceRange, setPriceRange] = useState([0, 500])
  const productAttributes = products?.map((product) => product?.attributes_details) || [];

  const attributeMap = productAttributes.flatMap((productAttr) =>
    productAttr?.map((attr) => ({
      name: attr?.attribute_name,
      values: attr?.attribute_values || []
    }))
  ).reduce((acc: Record<string, Set<string>>, attr) => {
    if (!attr || !attr.name) return acc; // Ensure attr is valid before using it
    if (!acc[attr.name]) {
      acc[attr.name] = new Set();
    }
    attr.values.forEach(value => {
      if (value?.attribute_value_name) {
        if (!attr || !attr.name) return acc;
        acc[attr.name].add(value.attribute_value_name); // Add the attribute_value_name (string) to the Set
      }
    });
    return acc;
  }, {});

  const attributesArray = Object.entries(attributeMap).map(([name, values]) => ({
    name,
    values: Array.from(values)
  }));

  console.log(attributesArray);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-poppins text-lg font-semibold text-[#333333] mb-4">Filters</h3>
        <Button variant="outline" className="w-full justify-between text-[#666666]">
          Clear All Filters
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Accordion type="multiple" className="w-full">
        {/* <AccordionItem value="price">
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
        </AccordionItem> */}


        {attributesArray.map(({ name, values }) => (
          <AccordionItem key={name} value={name.toLowerCase()}>
            <AccordionTrigger className="font-poppins text-[#444444]">
              {name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {values.map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox 
                    id={`${name}-${value.toLowerCase()}`}
                    onCheckedChange={(checked: boolean) => onFilterChange(name, value, checked)}
                      />
                    <Label htmlFor={`${name}-${value.toLowerCase()}`} className="font-inter text-sm text-[#666666]">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* <AccordionItem value="brand">
          <AccordionTrigger className="font-poppins text-[#444444]">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands?.map((brand) => (
                <div key={brand?._id} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand?.brand_name.toLowerCase().replace(/\s+/g, "-")}`} />
                  <Label
                    htmlFor={`brand-${brand?.brand_name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-inter text-sm text-[#666666]"
                  >
                    {brand?.brand_name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  )
}

