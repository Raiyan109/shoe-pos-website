import type { Product, Category, Brand, Attribute, AttributeValue } from "./types"

// Categories
export const categories: Category[] = [
  {
    _id: "cat1",
    category_name: "Clothing",
    category_slug: "clothing",
    category_logo: "/placeholder.svg?height=600&width=600",
    total_product: 2
  },
  {
    _id: "cat2",
    category_name: "Footwear",
    category_slug: "footwear",
    category_logo: "/placeholder.svg?height=600&width=600",
    total_product: 2
  },
  {
    _id: "cat3",
    category_name: "Accessories",
    category_slug: "accessories",
    category_logo: "/placeholder.svg?height=600&width=600",
    total_product: 2
  },
  {
    _id: "cat4",
    category_name: "Electronics",
    category_slug: "electronics",
    category_logo: "/placeholder.svg?height=600&width=600",
    total_product: 2
  },
  {
    _id: "cat5",
    category_name: "Home & Living",
    category_slug: "home-living",
    category_logo: "/placeholder.svg?height=600&width=600",
    total_product: 2
  },
  {
    _id: "cat6",
    category_name: "Beauty",
    category_slug: "beauty",
    category_logo: "/placeholder.svg?height=600&width=600",
    total_product: 2
  },
]

// Brands
export const brands: Brand[] = [
  {
    _id: "brand1",
    brand_name: "Nike",
    brand_slug: "nike",
    brand_logo: "/placeholder.svg?height=200&width=200&text=Nike",
  },
  {
    _id: "brand2",
    brand_name: "Adidas",
    brand_slug: "adidas",
    brand_logo: "/placeholder.svg?height=200&width=200&text=Adidas",
  },
  {
    _id: "brand3",
    brand_name: "Puma",
    brand_slug: "puma",
    brand_logo: "/placeholder.svg?height=200&width=200&text=Puma",
  },
  {
    _id: "brand4",
    brand_name: "Apple",
    brand_slug: "apple",
    brand_logo: "/placeholder.svg?height=200&width=200&text=Apple",
  },
  {
    _id: "brand5",
    brand_name: "Samsung",
    brand_slug: "samsung",
    brand_logo: "/placeholder.svg?height=200&width=200&text=Samsung",
  },
  {
    _id: "brand6",
    brand_name: "IKEA",
    brand_slug: "ikea",
    brand_logo: "/placeholder.svg?height=200&width=200&text=IKEA",
  },
]

// Common attribute values
const sizeAttributeValues: AttributeValue[] = [
  { _id: "size1", attribute_value_name: "S" },
  { _id: "size2", attribute_value_name: "M" },
  { _id: "size3", attribute_value_name: "L" },
  { _id: "size4", attribute_value_name: "XL" },
  { _id: "size5", attribute_value_name: "XXL" },
]

const colorAttributeValues: AttributeValue[] = [
  { _id: "color1", attribute_value_name: "Black" },
  { _id: "color2", attribute_value_name: "White" },
  { _id: "color3", attribute_value_name: "Red" },
  { _id: "color4", attribute_value_name: "Blue" },
  { _id: "color5", attribute_value_name: "Green" },
]

const materialAttributeValues: AttributeValue[] = [
  { _id: "material1", attribute_value_name: "Cotton" },
  { _id: "material2", attribute_value_name: "Polyester" },
  { _id: "material3", attribute_value_name: "Leather" },
  { _id: "material4", attribute_value_name: "Denim" },
]

// Common attributes
const commonAttributes: Attribute[] = [
  {
    _id: "attr1",
    attribute_name: "Size",
    attribute_values: sizeAttributeValues,
  },
  {
    _id: "attr2",
    attribute_name: "Color",
    attribute_values: colorAttributeValues,
  },
  {
    _id: "attr3",
    attribute_name: "Material",
    attribute_values: materialAttributeValues,
  },
]

// Products
export const products: Product[] = [
  {
    _id: "prod1",
    product_name: "Premium Cotton T-Shirt",
    product_slug: "premium-cotton-t-shirt",
    product_sku: "TS-001",
    product_status: "active",
    category_id: categories[0], // Clothing
    brand_id: brands[0]._id, // Nike
    attributes_details: [
      commonAttributes[0], // Size
      commonAttributes[1], // Color
      commonAttributes[2], // Material
    ],
    barcode: "8901234567890",
    barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode",
    description:
      "Soft and comfortable cotton t-shirt for everyday wear. Made with premium materials for durability and comfort.",
    thumbnail_image: "/placeholder.svg?height=600&width=600",
    thumbnail_image_key: "products/t-shirt-thumb",
    additional_images: [
      {
        _id: "img1",
        additional_image: "/placeholder.svg?height=600&width=600&text=View+1",
        additional_image_key: "products/t-shirt-view1",
      },
      {
        _id: "img2",
        additional_image: "/placeholder.svg?height=600&width=600&text=View+2",
        additional_image_key: "products/t-shirt-view2",
      },
      {
        _id: "img3",
        additional_image: "/placeholder.svg?height=600&width=600&text=View+3",
        additional_image_key: "products/t-shirt-view3",
      },
    ],
    product_price: 29.99,
    product_buying_price: 15.0,
    product_discount_price: 24.99,
    product_quantity: 100,
    product_alert_quantity: 10,
    is_variation: true,
    product_warrenty: "30 days",
    product_return: "14 days",
    unit: "piece",
    meta_title: "Premium Cotton T-Shirt | Store Name",
    meta_description: "High-quality cotton t-shirt for everyday comfort and style.",
    meta_keywords: [{ keyword: "t-shirt" }, { keyword: "cotton" }, { keyword: "premium" }, { keyword: "clothing" }],
    variations: [
      {
        _id: "var1",
        variation_name: "Black / S",
        product_id: "prod1",
        variation_price: 29.99,
        variation_discount_price: 24.99,
        variation_buying_price: 15.0,
        variation_quantity: 20,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567891",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-S-Black",
        variation_image: "/placeholder.svg?height=600&width=600&text=Black-S",
        variation_image_key: "products/t-shirt-black-s",
        variation_sku: "TS-001-BLK-S",
      },
      {
        _id: "var2",
        variation_name: "Black / M",
        product_id: "prod1",
        variation_price: 29.99,
        variation_discount_price: 24.99,
        variation_buying_price: 15.0,
        variation_quantity: 30,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567892",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-M-Black",
        variation_image: "/placeholder.svg?height=600&width=600&text=Black-M",
        variation_image_key: "products/t-shirt-black-m",
        variation_sku: "TS-001-BLK-M",
      },
      {
        _id: "var3",
        variation_name: "White / S",
        product_id: "prod1",
        variation_price: 29.99,
        variation_discount_price: 24.99,
        variation_buying_price: 15.0,
        variation_quantity: 25,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567893",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-S-White",
        variation_image: "/placeholder.svg?height=600&width=600&text=White-S",
        variation_image_key: "products/t-shirt-white-s",
        variation_sku: "TS-001-WHT-S",
      },
      {
        _id: "var4",
        variation_name: "White / M",
        product_id: "prod1",
        variation_price: 29.99,
        variation_discount_price: 24.99,
        variation_buying_price: 15.0,
        variation_quantity: 25,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567894",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-M-White",
        variation_image: "/placeholder.svg?height=600&width=600&text=White-M",
        variation_image_key: "products/t-shirt-white-m",
        variation_sku: "TS-001-WHT-M",
      },
    ],
  },
  {
    _id: "prod2",
    product_name: "Slim Fit Jeans",
    product_slug: "slim-fit-jeans",
    product_sku: "JN-001",
    product_status: "active",
    category_id: categories[0], // Clothing
    brand_id: brands[1]._id, // Adidas
    attributes_details: [
      {
        _id: "attr4",
        attribute_name: "Size",
        attribute_values: [
          { _id: "jsize1", attribute_value_name: "28" },
          { _id: "jsize2", attribute_value_name: "30" },
          { _id: "jsize3", attribute_value_name: "32" },
          { _id: "jsize4", attribute_value_name: "34" },
        ],
      },
      commonAttributes[1], // Color
      commonAttributes[2], // Material
    ],
    barcode: "8901234567895",
    barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-Jeans",
    description: "Classic slim fit jeans with a modern touch. Perfect for casual and semi-formal occasions.",
    thumbnail_image: "/placeholder.svg?height=600&width=600",
    thumbnail_image_key: "products/jeans-thumb",
    additional_images: [
      {
        _id: "img4",
        additional_image: "/placeholder.svg?height=600&width=600&text=Front",
        additional_image_key: "products/jeans-front",
      },
      {
        _id: "img5",
        additional_image: "/placeholder.svg?height=600&width=600&text=Back",
        additional_image_key: "products/jeans-back",
      },
      {
        _id: "img6",
        additional_image: "/placeholder.svg?height=600&width=600&text=Side",
        additional_image_key: "products/jeans-side",
      },
    ],
    product_price: 59.99,
    product_buying_price: 30.0,
    product_discount_price: 49.99,
    product_quantity: 80,
    product_alert_quantity: 10,
    is_variation: true,
    product_warrenty: "30 days",
    product_return: "14 days",
    unit: "piece",
    meta_title: "Slim Fit Jeans | Store Name",
    meta_description: "Stylish slim fit jeans for a modern look.",
    meta_keywords: [{ keyword: "jeans" }, { keyword: "slim fit" }, { keyword: "denim" }, { keyword: "pants" }],
    variations: [
      {
        _id: "var5",
        variation_name: "Blue / 30",
        product_id: "prod2",
        variation_price: 59.99,
        variation_discount_price: 49.99,
        variation_buying_price: 30.0,
        variation_quantity: 20,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567896",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-30-Blue",
        variation_image: "/placeholder.svg?height=600&width=600&text=Blue-30",
        variation_image_key: "products/jeans-blue-30",
        variation_sku: "JN-001-BLU-30",
      },
      {
        _id: "var6",
        variation_name: "Blue / 32",
        product_id: "prod2",
        variation_price: 59.99,
        variation_discount_price: 49.99,
        variation_buying_price: 30.0,
        variation_quantity: 25,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567897",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-32-Blue",
        variation_image: "/placeholder.svg?height=600&width=600&text=Blue-32",
        variation_image_key: "products/jeans-blue-32",
        variation_sku: "JN-001-BLU-32",
      },
      {
        _id: "var7",
        variation_name: "Black / 30",
        product_id: "prod2",
        variation_price: 59.99,
        variation_discount_price: 49.99,
        variation_buying_price: 30.0,
        variation_quantity: 15,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567898",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-30-Black",
        variation_image: "/placeholder.svg?height=600&width=600&text=Black-30",
        variation_image_key: "products/jeans-black-30",
        variation_sku: "JN-001-BLK-30",
      },
      {
        _id: "var8",
        variation_name: "Black / 32",
        product_id: "prod2",
        variation_price: 59.99,
        variation_discount_price: 49.99,
        variation_buying_price: 30.0,
        variation_quantity: 20,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567899",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-32-Black",
        variation_image: "/placeholder.svg?height=600&width=600&text=Black-32",
        variation_image_key: "products/jeans-black-32",
        variation_sku: "JN-001-BLK-32",
      },
    ],
  },
  {
    _id: "prod3",
    product_name: "Running Shoes",
    product_slug: "running-shoes",
    product_sku: "SH-001",
    product_status: "active",
    category_id: categories[1], // Footwear
    brand_id: brands[0]._id, // Nike
    attributes_details: [
      {
        _id: "attr5",
        attribute_name: "Size",
        attribute_values: [
          { _id: "shsize1", attribute_value_name: "7" },
          { _id: "shsize2", attribute_value_name: "8" },
          { _id: "shsize3", attribute_value_name: "9" },
          { _id: "shsize4", attribute_value_name: "10" },
          { _id: "shsize5", attribute_value_name: "11" },
        ],
      },
      commonAttributes[1], // Color
    ],
    barcode: "8901234567900",
    barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-Shoes",
    description:
      "Lightweight running shoes designed for comfort and performance. Perfect for daily runs and training sessions.",
    thumbnail_image: "/placeholder.svg?height=600&width=600",
    thumbnail_image_key: "products/shoes-thumb",
    additional_images: [
      {
        _id: "img7",
        additional_image: "/placeholder.svg?height=600&width=600&text=Side+View",
        additional_image_key: "products/shoes-side",
      },
      {
        _id: "img8",
        additional_image: "/placeholder.svg?height=600&width=600&text=Top+View",
        additional_image_key: "products/shoes-top",
      },
      {
        _id: "img9",
        additional_image: "/placeholder.svg?height=600&width=600&text=Bottom+View",
        additional_image_key: "products/shoes-bottom",
      },
    ],
    product_price: 89.99,
    product_buying_price: 45.0,
    product_discount_price: 79.99,
    product_quantity: 60,
    product_alert_quantity: 10,
    is_variation: true,
    product_warrenty: "60 days",
    product_return: "30 days",
    unit: "pair",
    meta_title: "Running Shoes | Store Name",
    meta_description: "High-performance running shoes for athletes and casual runners.",
    meta_keywords: [
      { keyword: "running shoes" },
      { keyword: "athletic" },
      { keyword: "footwear" },
      { keyword: "sports" },
    ],
    variations: [
      {
        _id: "var9",
        variation_name: "Black / 9",
        product_id: "prod3",
        variation_price: 89.99,
        variation_discount_price: 79.99,
        variation_buying_price: 45.0,
        variation_quantity: 15,
        variation_alert_quantity: 3,
        variation_barcode: "8901234567901",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-9-Black",
        variation_image: "/placeholder.svg?height=600&width=600&text=Black-9",
        variation_image_key: "products/shoes-black-9",
        variation_sku: "SH-001-BLK-9",
      },
      {
        _id: "var10",
        variation_name: "Black / 10",
        product_id: "prod3",
        variation_price: 89.99,
        variation_discount_price: 79.99,
        variation_buying_price: 45.0,
        variation_quantity: 20,
        variation_alert_quantity: 3,
        variation_barcode: "8901234567902",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-10-Black",
        variation_image: "/placeholder.svg?height=600&width=600&text=Black-10",
        variation_image_key: "products/shoes-black-10",
        variation_sku: "SH-001-BLK-10",
      },
      {
        _id: "var11",
        variation_name: "White / 9",
        product_id: "prod3",
        variation_price: 89.99,
        variation_discount_price: 79.99,
        variation_buying_price: 45.0,
        variation_quantity: 12,
        variation_alert_quantity: 3,
        variation_barcode: "8901234567903",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-9-White",
        variation_image: "/placeholder.svg?height=600&width=600&text=White-9",
        variation_image_key: "products/shoes-white-9",
        variation_sku: "SH-001-WHT-9",
      },
      {
        _id: "var12",
        variation_name: "White / 10",
        product_id: "prod3",
        variation_price: 89.99,
        variation_discount_price: 79.99,
        variation_buying_price: 45.0,
        variation_quantity: 13,
        variation_alert_quantity: 3,
        variation_barcode: "8901234567904",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-10-White",
        variation_image: "/placeholder.svg?height=600&width=600&text=White-10",
        variation_image_key: "products/shoes-white-10",
        variation_sku: "SH-001-WHT-10",
      },
    ],
  },
  {
    _id: "prod4",
    product_name: "Leather Wallet",
    product_slug: "leather-wallet",
    product_sku: "WL-001",
    product_status: "active",
    category_id: categories[2], // Accessories
    brand_id: brands[2]._id, // Puma
    attributes_details: [
      commonAttributes[1], // Color
      {
        _id: "attr6",
        attribute_name: "Material",
        attribute_values: [
          { _id: "material3", attribute_value_name: "Leather" },
          { _id: "material5", attribute_value_name: "Synthetic" },
        ],
      },
    ],
    barcode: "8901234567905",
    barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-Wallet",
    description:
      "Genuine leather wallet with multiple card slots and a coin pocket. Slim design fits comfortably in your pocket.",
    thumbnail_image: "/placeholder.svg?height=600&width=600",
    thumbnail_image_key: "products/wallet-thumb",
    additional_images: [
      {
        _id: "img10",
        additional_image: "/placeholder.svg?height=600&width=600&text=Inside+View",
        additional_image_key: "products/wallet-inside",
      },
      {
        _id: "img11",
        additional_image: "/placeholder.svg?height=600&width=600&text=Back+View",
        additional_image_key: "products/wallet-back",
      },
    ],
    product_price: 49.99,
    product_buying_price: 25.0,
    product_discount_price: 39.99,
    product_quantity: 50,
    product_alert_quantity: 10,
    is_variation: false,
    product_warrenty: "1 year",
    product_return: "30 days",
    unit: "piece",
    meta_title: "Leather Wallet | Store Name",
    meta_description: "Genuine leather wallet with multiple card slots and sleek design.",
    meta_keywords: [{ keyword: "wallet" }, { keyword: "leather" }, { keyword: "accessories" }, { keyword: "men" }],
    variations: [],
  },
  {
    _id: "prod5",
    product_name: "Wireless Earbuds",
    product_slug: "wireless-earbuds",
    product_sku: "EB-001",
    product_status: "active",
    category_id: categories[3], // Electronics
    brand_id: brands[3]._id, // Apple
    attributes_details: [
      commonAttributes[1], // Color
    ],
    barcode: "8901234567906",
    barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-Earbuds",
    description:
      "High-quality wireless earbuds with noise cancellation and long battery life. Perfect for music, calls, and workouts.",
    thumbnail_image: "/placeholder.svg?height=600&width=600",
    thumbnail_image_key: "products/earbuds-thumb",
    additional_images: [
      {
        _id: "img12",
        additional_image: "/placeholder.svg?height=600&width=600&text=Case+View",
        additional_image_key: "products/earbuds-case",
      },
      {
        _id: "img13",
        additional_image: "/placeholder.svg?height=600&width=600&text=Earbuds+Only",
        additional_image_key: "products/earbuds-only",
      },
    ],
    product_price: 129.99,
    product_buying_price: 70.0,
    product_discount_price: 109.99,
    product_quantity: 40,
    product_alert_quantity: 8,
    is_variation: true,
    product_warrenty: "1 year",
    product_return: "30 days",
    unit: "piece",
    meta_title: "Wireless Earbuds | Store Name",
    meta_description: "Premium wireless earbuds with noise cancellation and long battery life.",
    meta_keywords: [{ keyword: "earbuds" }, { keyword: "wireless" }, { keyword: "audio" }, { keyword: "electronics" }],
    variations: [
      {
        _id: "var13",
        variation_name: "Black",
        product_id: "prod5",
        variation_price: 129.99,
        variation_discount_price: 109.99,
        variation_buying_price: 70.0,
        variation_quantity: 25,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567907",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-Black",
        variation_image: "/placeholder.svg?height=600&width=600&text=Black",
        variation_image_key: "products/earbuds-black",
        variation_sku: "EB-001-BLK",
      },
      {
        _id: "var14",
        variation_name: "White",
        product_id: "prod5",
        variation_price: 129.99,
        variation_discount_price: 109.99,
        variation_buying_price: 70.0,
        variation_quantity: 15,
        variation_alert_quantity: 3,
        variation_barcode: "8901234567908",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-White",
        variation_image: "/placeholder.svg?height=600&width=600&text=White",
        variation_image_key: "products/earbuds-white",
        variation_sku: "EB-001-WHT",
      },
    ],
  },
  {
    _id: "prod6",
    product_name: "Scented Candle Set",
    product_slug: "scented-candle-set",
    product_sku: "SC-001",
    product_status: "active",
    category_id: categories[4], // Home & Living
    brand_id: brands[5]._id, // IKEA
    attributes_details: [
      {
        _id: "attr7",
        attribute_name: "Scent",
        attribute_values: [
          { _id: "scent1", attribute_value_name: "Vanilla" },
          { _id: "scent2", attribute_value_name: "Lavender" },
          { _id: "scent3", attribute_value_name: "Sandalwood" },
        ],
      },
    ],
    barcode: "8901234567909",
    barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-Candles",
    description: "Set of 3 scented candles for a relaxing atmosphere. Long-lasting and made with natural ingredients.",
    thumbnail_image: "/placeholder.svg?height=600&width=600",
    thumbnail_image_key: "products/candles-thumb",
    additional_images: [
      {
        _id: "img14",
        additional_image: "/placeholder.svg?height=600&width=600&text=Individual+Candles",
        additional_image_key: "products/candles-individual",
      },
      {
        _id: "img15",
        additional_image: "/placeholder.svg?height=600&width=600&text=Packaging",
        additional_image_key: "products/candles-packaging",
      },
    ],
    product_price: 34.99,
    product_buying_price: 18.0,
    product_discount_price: 29.99,
    product_quantity: 30,
    product_alert_quantity: 5,
    is_variation: false,
    product_warrenty: "1 year",
    product_return: "14 days",
    unit: "set",
    meta_title: "Scented Candle Set | Store Name",
    meta_description: "Set of 3 premium scented candles for a relaxing home atmosphere.",
    meta_keywords: [
      { keyword: "candles" },
      { keyword: "scented" },
      { keyword: "home decor" },
      { keyword: "relaxation" },
    ],
    variations: [],
  },
  {
    _id: "prod7",
    product_name: "Facial Serum",
    product_slug: "facial-serum",
    product_sku: "FS-001",
    product_status: "active",
    category_id: categories[5], // Beauty
    brand_id: brands[2]._id, // Puma (just as an example)
    attributes_details: [
      {
        _id: "attr8",
        attribute_name: "Size",
        attribute_values: [
          { _id: "fsize1", attribute_value_name: "30ml" },
          { _id: "fsize2", attribute_value_name: "50ml" },
        ],
      },
      {
        _id: "attr9",
        attribute_name: "Skin Type",
        attribute_values: [
          { _id: "skin1", attribute_value_name: "All Skin Types" },
          { _id: "skin2", attribute_value_name: "Dry" },
          { _id: "skin3", attribute_value_name: "Oily" },
          { _id: "skin4", attribute_value_name: "Combination" },
        ],
      },
    ],
    barcode: "8901234567910",
    barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-Serum",
    description:
      "Hydrating facial serum for all skin types. Enriched with vitamins and antioxidants for a healthy glow.",
    thumbnail_image: "/placeholder.svg?height=600&width=600",
    thumbnail_image_key: "products/serum-thumb",
    additional_images: [
      {
        _id: "img16",
        additional_image: "/placeholder.svg?height=600&width=600&text=Packaging",
        additional_image_key: "products/serum-packaging",
      },
      {
        _id: "img17",
        additional_image: "/placeholder.svg?height=600&width=600&text=Application",
        additional_image_key: "products/serum-application",
      },
    ],
    product_price: 24.99,
    product_buying_price: 12.0,
    product_discount_price: 19.99,
    product_quantity: 45,
    product_alert_quantity: 10,
    is_variation: true,
    product_warrenty: "1 year",
    product_return: "30 days",
    unit: "bottle",
    meta_title: "Facial Serum | Store Name",
    meta_description: "Hydrating facial serum for all skin types with vitamins and antioxidants.",
    meta_keywords: [{ keyword: "serum" }, { keyword: "facial" }, { keyword: "skincare" }, { keyword: "beauty" }],
    variations: [
      {
        _id: "var15",
        variation_name: "30ml",
        product_id: "prod7",
        variation_price: 24.99,
        variation_discount_price: 19.99,
        variation_buying_price: 12.0,
        variation_quantity: 25,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567911",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-30ml",
        variation_image: "/placeholder.svg?height=600&width=600&text=30ml",
        variation_image_key: "products/serum-30ml",
        variation_sku: "FS-001-30",
      },
      {
        _id: "var16",
        variation_name: "50ml",
        product_id: "prod7",
        variation_price: 39.99,
        variation_discount_price: 34.99,
        variation_buying_price: 20.0,
        variation_quantity: 20,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567912",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-50ml",
        variation_image: "/placeholder.svg?height=600&width=600&text=50ml",
        variation_image_key: "products/serum-50ml",
        variation_sku: "FS-001-50",
      },
    ],
  },
  {
    _id: "prod8",
    product_name: "Hooded Sweatshirt",
    product_slug: "hooded-sweatshirt",
    product_sku: "HS-001",
    product_status: "active",
    category_id: categories[0], // Clothing
    brand_id: brands[1]._id, // Adidas
    attributes_details: [
      commonAttributes[0], // Size
      commonAttributes[1], // Color
      commonAttributes[2], // Material
    ],
    barcode: "8901234567913",
    barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-Hoodie",
    description: "Warm and cozy hooded sweatshirt for cold days. Features a kangaroo pocket and adjustable hood.",
    thumbnail_image: "/placeholder.svg?height=600&width=600",
    thumbnail_image_key: "products/hoodie-thumb",
    additional_images: [
      {
        _id: "img18",
        additional_image: "/placeholder.svg?height=600&width=600&text=Back+View",
        additional_image_key: "products/hoodie-back",
      },
      {
        _id: "img19",
        additional_image: "/placeholder.svg?height=600&width=600&text=Side+View",
        additional_image_key: "products/hoodie-side",
      },
      {
        _id: "img20",
        additional_image: "/placeholder.svg?height=600&width=600&text=Hood+Detail",
        additional_image_key: "products/hoodie-hood",
      },
    ],
    product_price: 49.99,
    product_buying_price: 25.0,
    product_discount_price: 39.99,
    product_quantity: 70,
    product_alert_quantity: 15,
    is_variation: true,
    product_warrenty: "30 days",
    product_return: "14 days",
    unit: "piece",
    meta_title: "Hooded Sweatshirt | Store Name",
    meta_description: "Warm and stylish hooded sweatshirt for everyday comfort.",
    meta_keywords: [{ keyword: "hoodie" }, { keyword: "sweatshirt" }, { keyword: "clothing" }, { keyword: "winter" }],
    variations: [
      {
        _id: "var17",
        variation_name: "Black / M",
        product_id: "prod8",
        variation_price: 49.99,
        variation_discount_price: 39.99,
        variation_buying_price: 25.0,
        variation_quantity: 20,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567914",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-M-Black",
        variation_image: "/placeholder.svg?height=600&width=600&text=Black-M",
        variation_image_key: "products/hoodie-black-m",
        variation_sku: "HS-001-BLK-M",
      },
      {
        _id: "var18",
        variation_name: "Black / L",
        product_id: "prod8",
        variation_price: 49.99,
        variation_discount_price: 39.99,
        variation_buying_price: 25.0,
        variation_quantity: 15,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567915",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-L-Black",
        variation_image: "/placeholder.svg?height=600&width=600&text=Black-L",
        variation_image_key: "products/hoodie-black-l",
        variation_sku: "HS-001-BLK-L",
      },
      {
        _id: "var19",
        variation_name: "Gray / M",
        product_id: "prod8",
        variation_price: 49.99,
        variation_discount_price: 39.99,
        variation_buying_price: 25.0,
        variation_quantity: 18,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567916",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-M-Gray",
        variation_image: "/placeholder.svg?height=600&width=600&text=Gray-M",
        variation_image_key: "products/hoodie-gray-m",
        variation_sku: "HS-001-GRY-M",
      },
      {
        _id: "var20",
        variation_name: "Gray / L",
        product_id: "prod8",
        variation_price: 49.99,
        variation_discount_price: 39.99,
        variation_buying_price: 25.0,
        variation_quantity: 17,
        variation_alert_quantity: 5,
        variation_barcode: "8901234567917",
        variation_barcode_image: "/placeholder.svg?height=100&width=200&text=Barcode-L-Gray",
        variation_image: "/placeholder.svg?height=600&width=600&text=Gray-L",
        variation_image_key: "products/hoodie-gray-l",
        variation_sku: "HS-001-GRY-L",
      },
    ],
  },
]

export const featuredProducts = products.filter(
  (product) => product.product_discount_price !== undefined || product.product_status === "active",
)

// Export a function that returns a response object similar to what the API would return
export function getMockProductsResponse() {
  return {
    success: true,
    message: "Products fetched successfully (MOCK DATA)",
    data: products,
    count: products?.length,
  }
}

// Export a function that returns a response object similar to what the API would return
export function getMockCategoriesResponse() {
  return {
    success: true,
    message: "Categories fetched successfully (MOCK DATA)",
    data: categories,
    count: categories?.length,
  }
}

// Fallback banners in case API fails
export function getFallbackBanners() {
  return [
    {
      id: "banner1",
      title: "Discover Quality Products For Your Lifestyle",
      description: "Explore our curated collection of premium products designed to enhance your everyday experience.",
      imageUrl: "/placeholder.svg?height=1080&width=1920",
      link: "/categories",
    },
    {
      id: "banner2",
      title: "New Season Collection",
      description: "Discover the latest trends and styles for the new season.",
      imageUrl: "/placeholder.svg?height=1080&width=1920",
      link: "/categories/clothing",
    },
    {
      id: "banner3",
      title: "Special Offers",
      description: "Limited time deals on our most popular products.",
      imageUrl: "/placeholder.svg?height=1080&width=1920",
      link: "/products",
    },
  ]
}
