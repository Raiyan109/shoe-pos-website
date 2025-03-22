export interface Product {
    id: string
    name: string
    description: string
    price: number
    oldPrice?: number
    image: string
    categoryId: string
    isNew?: boolean
    discount?: number
    colors: string[]
    sizes: string[]
  }
  
  export interface Category {
    _id: string
    category_name: string
    category_slug: string
    category_logo: string
    // productCount: number
  }
  
  export interface OrderDetails {
    productName: string
    productId: string
    price: number
    quantity: number
    color: string
    size: string
  }
