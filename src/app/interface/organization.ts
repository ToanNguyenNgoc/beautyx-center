
export interface IBranch {
    address: string;
    created_at: string;
    district: string | null;
    district_code: string | null;
    full_address: string;
    id: number;
    image: string | null;
    image_url: string;
    latitude: number;
    longitude: number;
    name: string;
    organization_id: number;
    origin_id: number;
    province: number | string | null;
    province_code: number | string | null;
    telephone: string;
    ward: string | null;
    ward_code: string | null;
}

export interface IOrganization {
    id: number;
    name: string;
    subdomain: string;
    latitude: number;
    longitude: number;
    address: string;
    min_price: number;
    max_price: number;
    image: string;
    is_momo_ecommerce_enable: boolean;
    created_at: string;
    updated_at: string;
    province_code: number;
    district_code: number;
    ward_code: number;
    full_address: string;
    image_url: string;
    branches: IBranch[];
    opening_time: any;
    favorites_count: number;
    is_favorite?: boolean | null;
    favorites: any[];
    distance?: number;
    tags: any[];
    telephone?: string[];
}
export const initOrg = {
    id: 0,
    name: "",
    subdomain: "",
    latitude: 0,
    longitude: 0,
    address: "",
    min_price: 0,
    max_price: 0,
    image: "",
    is_momo_ecommerce_enable: false,
    created_at: "",
    updated_at: "",
    province_code: 0,
    district_code: 0,
    ward_code: 0,
    full_address: "",
    image_url: "",
    branches: [],
    opening_time: [],
    favorites_count: 0,
    is_favorite: false,
    favorites: [],
    distance: 0,
    tags: [],
    telephone: [],
}
export interface IResponseProductOrg {
    id: number;                          // Unique product identifier
    product_code: string;                // Product code (e.g., "00001")
    product_sku: string;                 // SKU code (e.g., "ITE0000154")
    product_name: string;                // Name of the product
    origin_price: string;                // Original price as a string (e.g., "0.00")
    retail_price: string;                // Retail price as a string (e.g., "1400000.00")
    special_price: string;               // Special discounted price, "-1.00" indicates no special price
    special_price_momo: string;          // Special price for MoMo ecommerce
    description: string;                 // Description of the product, with embedded HTML or special characters
    brand_id: number;                    // Brand ID associated with the product
    product_category_id: number;         // ID of the product category
    product_order: number;               // Order of the product in the listing
    product_type: number;                // Type of the product (e.g., 0 for standard)
    unit_id: number;                     // Unit ID for product measurement
    commission_percen: number;           // Commission percentage
    commission_money: string;            // Commission amount as a string
    reward_percent: number;              // Reward percentage
    reward_money: string;                // Reward amount as a string
    commission_plan: number;             // Commission plan identifier
    image: string;                       // File name of the product's image
    status: boolean;                     // Status of the product (true for active, false for inactive)
    medicine: number;                    // Indicates whether the product is a medicine (0 for no, 1 for yes)
    deleted: boolean;                    // Deleted status (true if deleted, false otherwise)
    created_date: string;                // Creation date in ISO format
    modified_date: string;               // Last modified date in ISO format
    created_by_id: number;               // User ID of the creator
    branch_id: number;                   // Branch ID associated with the product
    is_featured: boolean;                // Whether the product is featured
    unit2_id: number;                    // Secondary unit ID
    unit_ratio: number;                  // Ratio between primary and secondary units
    is_momo_ecommerce_enable: boolean;   // Whether MoMo ecommerce is enabled
    is_moba_ecommerce_enable: boolean;   // Whether MoBa ecommerce is enabled
    is_displayed_home: number;           // Whether the product is displayed on the home page (0 for no, 1 for yes)
    tags: string[] | null;               // List of tags or null if none
    other_branch_ids: string[] | null;   // IDs of other branches associated with the product or null
    favorites_count: number;             // Number of times the product has been marked as a favorite
    image_url: string;                   // Full URL to the product image
    rating: number;                      // Rating of the product (e.g., 3.6 out of 5)
    is_favorite: boolean;                // Whether the product is marked as a favorite
    category: {
        id: number;                        // ID of the product category
        name: string;                      // Name of the category
        product_category_order: number;    // Order of the category
        deleted: boolean;                  // Whether the category is deleted
        branch_id: number;                 // Branch ID associated with the category
        created_date: string;              // Category creation date
        modified_date: string;             // Category modification date
        created_by_id: number;             // User ID of the category creator
        other_branch_ids: string[] | null; // IDs of other branches associated with the category or null
    };
}

