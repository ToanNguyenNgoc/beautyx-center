import { ORDER_STATUS, PLAT_FORM } from "app/util";


export type QrPage = {
  'page'?: number | string;
  'limit'?: number | string;
}
export type QrDiscount = QrPage & {
  'filter[platform]'?: string;
  'filter[keyword]'?: string;
  'filter[discount_type]'?: "SUB_TOTAL" | "FINAL_PRICE" | "PRODUCT" | "" | string;
  'filter[organization_id]'?: number | string;
  'filter[location]'?: string;
  'sort'?: string;
  'filter[filter_all]'?: boolean;
  'append'?: "" | "user_available_purchase_count"
}
export type QrDiscountDetail = {
  id: string;
  'filter[organization_id]'?: number | string
}
export type QrDiscountCode = {
  'page'?: number | string;
  'limit'?: number | string;
  'uuid'?: string
}
export type QrProductable = QrPage & {
  'keyword'?: string;
  'type'?: 1 | 2 | 3 | 4; //SERVICE:1|PRODUCT:2|PREPAY CARD:3|TREATMENT COMBO:4;
  'organization_id'?: number | string;
  'on_ecommerce'?: boolean;
  'is_demo'?: boolean;
  'discount_price'?: boolean;
  'discount_ecommerce_price'?: boolean;
  'sort'?: string
}
export type QrPromotion = QrPage
export type QrCommunity = QrPage & {
  'filter[organization_id]'?: number | string;
  'filter[status]'?: boolean;
  'filter[tag_id]'?: number | string;
  'sort'?: '-created_at' | 'created_at';
  'append'?: string
}
export type QrCustomer = QrPage & {
  'platform'?: string;
  'from_date'?: string;
  'to_date'?: string;
  'sort'?: string;
}
export type QrCustomerEvent = QrPage & {
  'subdomain'?: string
}
export type QrAdminAccount = QrPage & {
  "filter[keyword]"?: string;
  "filter[roles_count]"?: any;
  "include"?: string;
  "sort"?: string;
}

export type QrAdminOrder = QrPage & {
  "filter[keyword]"?: string;
  "filter[status]"?: keyof typeof ORDER_STATUS;
  "filter[platform]"?:keyof typeof PLAT_FORM;
  "filter[withServicesSold]"?:boolean;
  "filter[productable]"?:boolean;
  "filter[organization_id]"?:number;
  "include"?:string;
  "sort"?:string;
  "append"?:string;
}