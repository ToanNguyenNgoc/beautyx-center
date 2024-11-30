export interface IPRODUCT_GET_ALL {
  page?: number
  limit?: number
  keyword?: string
  min_price?: string
  max_price?: string
  special_min_price?: string
  special_max_price?: string
  discount_percent?: string
  special_price?: string
  is_momo_ecommerce_enable?: boolean
  sort?:
    | 'distance'
    | 'org_priority'
    | 'product_name'
    | 'discount_percent'
    | 'retail_price'
    | 'modified_date'
    | 'created_date'
    | 'bought_count'
    | 'random'
    | null
}
export interface IPRODUCT_DETAIL_BY_ID {
  org: string | number
  id: string | number
}
export interface IPRODUCT_DETAIL_BY_ORG_ID extends IPRODUCT_DETAIL_BY_ID {
  page?: number
  limit?: number
  keyword?: string
  special?: Boolean
  cate_id?: number | string
  isEnable?: Boolean
}
interface FilterProductOptions {
  keyword?: string
  product_category_id?: string
  special?: boolean | string
  special_ecommerce?: boolean | string
  is_momo_ecommerce_enable?: boolean | string
  is_moba_ecommerce_enable?: boolean | string
  is_featured?: boolean | string
  is_product_order?: boolean | string
}
export interface IPRODUCT_BY_ORG_ID extends Omit<IPRODUCT_DETAIL_BY_ID, 'id'> {
  page: number
  limit: number | string
  filter?: FilterProductOptions
  include?: string
  append?: string
}
export interface IPRODUCT_UPDATE_STATUS extends IPRODUCT_DETAIL_BY_ID {
  is_momo_ecommerce_enable: boolean
}
