export interface ISERVICE_DETAIL_BY_ID {
  org: string | number
  id: string | number
}
interface FilterServiceOptions {
  keyword?: string
  service_group_id?: string
  special?: boolean
  special_ecommerce?: boolean
  is_momo_ecommerce_enable?: boolean
  is_moba_ecommerce_enable?: boolean
  is_featured?: boolean
}

export interface ISERVICE_BY_ORG_ID extends Omit<ISERVICE_DETAIL_BY_ID, 'id'> {
  page: number | string
  limit: number | string
  filter?: FilterServiceOptions
  include?: string
  append?: string
}

export interface ISERVICE_UPDATE_STATUS extends ISERVICE_DETAIL_BY_ID {
  is_momo_ecommerce_enable: boolean
}
