interface AttributeValue {
  _id: string;
  attribute_value_name?: string;
}

export interface Attribute {
  _id: string;
  attribute_name?: string;
  attribute_values?: AttributeValue[];
}

export interface AdditionalImage {
  _id: string;
  additional_image?: string;
  additional_image_key?: string;
}

export interface MetaKeyword {
  keyword?: string;
}

export interface Product {
  _id?: string;
  product_name: string;
  product_slug: string;
  product_sku?: string;
  product_status: "active" | "in-active";
  category_id: Category;
  brand_id?: string;
  attributes_details?: Attribute[];
  barcode?: string;
  barcode_image?: string;
  description: string;
  thumbnail_image: string;
  thumbnail_image_key?: string;
  additional_images?: AdditionalImage[];
  product_price?: number;
  product_buying_price?: number;
  product_discount_price?: number;
  product_quantity?: number;
  product_alert_quantity?: number;
  is_variation?: boolean;
  product_warrenty?: string;
  product_return?: string;
  unit?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: MetaKeyword[];
  variations: Variation[]
}

  
  export interface Category {
    _id: string
    category_name: string
    category_slug: string
    category_logo: string
    // productCount: number
  }
  
  export interface Brand {
    _id: string
    brand_name: string
    brand_slug: string
    brand_logo: string
    // productCount: number
  }

  export interface Variation {
    _id?: any;
    variation_name: string;
    product_id: string;
    variation_price: number;
    variation_discount_price?: number;
    variation_buying_price?: number;
    variation_quantity: number;
    variation_alert_quantity?: number;
    variation_barcode?: string;
    variation_barcode_image?: string;
    variation_image?: string;
    variation_image_key?: string;
    variation_sku?: string;
  }
  
  export interface OrderDetails {
    productName: string
    productId: string
    price: number
    quantity: number
    color: string
    size: string
  }
