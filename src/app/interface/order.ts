import {IService} from './service'
import {IPRODUCT} from './product_models'
import {IOrganization} from './organization'
import {User} from './account_models'

export interface ITems {
  id: number
  order_id: number
  base_price: number
  quantity: number
  productable_type: string
  productable_id: number
  productable: IService | IPRODUCT
  created_at: string
  updated_at: string
  origin_id: null | number
  services_count: number
  discount_value: number
  discount_id: null | number
}
export interface IOrderOrigin {
  id: number
  uid: number
  status: number
  type: number
  payment_method_id: number
  payment_methods: string
  sub_total_money: string
  tax_money: string
  discount_percent: number
  discount_money: number
  happy_hour_code: string
  coupon_code: string
  coupon_discount_money: string
  total_money: number
  total_commission: number
  note: string
  uid_confirmed: string
  date_time_confirmed: string
  bed_ids: string
  signature_image: string
  check_in: string
  check_out: string
  deleted: boolean
  created_date: string
  created_by_id: number
  branch_id: number
  order_code: string
  discount_symbol: string
  tax: number
  tax_symbol: number
  referral_uid: string
  is_new_customer: boolean
  platform?: string
  delivery_address: string
  myspa_fee_momo: number
  myspa_percent_momo: number
  delivery_status: number
  currency_id: number
}
export interface IOrderV2 {
  id: number
  status: string
  amount: number
  description: string
  payment_method_id: number
  organization_id: number
  organization: IOrganization
  user_id: number
  user: User
  origin_id: null | number
  branch_id: null | number
  created_at: string
  updated_at: string
  deleted_at: null | string
  platform: string
  discount_value: number
  items_count: number
  qr_link: string
  payment_gateway: {
    id: number
    status: string
    amount: number
    description: string
    transaction_uuid: string
    extra_data: {
      redirectUrl: string
      payUrl: string | null
      deeplink: string | null
      qrCodeUrl: null | string
      deeplinkMiniApp: string | null
    }
    payment_method_id: number
    paymentable_type: string
    paymentable_id: number
    created_at: string
    updated_at: string
    deleted_at: null
    items: ITems[]
  }
  origin?: IOrderOrigin
}

interface IORDER_ID_ORG {
  org: string | number
  id: string | number
}

interface FilterOrderOptions {
  from_date?: string
  to_date?: string
}
export interface IORDER_BY_ORG_ID extends Omit<IORDER_ID_ORG, 'id'> {
  page: number
  limit: number | string
  platform: string
  is_user: boolean | string
  filter?: FilterOrderOptions
  include?: string
  append?: string
  sort?: string
}

// orderOrg ---------------------------------------
export interface IUserOrder {
  id: number
  email: string
  facebook: string
  fullname: string
  telephone: string
  birthday: string
  sex: number
  height: number
  weight: number
  address: string
  nationality: number
  province: number
  district: number
  ward: number
  job: string
  identify_number: string
  image: string
  identify_img: string
  issue_date: string
  issue_area: string
  status: boolean
  created_date: string
  modified_date: string
  created_by_id: number
  branch_id: number
  customer_backup_code: string
  due_date: string | null
  loginable: boolean | null
  stage_name: string
  vocative: string
  brand_app: number
  platform: string
  sip_user: string | null
  has_omicall: boolean
  gs_line_to: number
  acc_name: string
  bank_name: string
  account_number: string
  profile_tag_id: string
  level_id: number
  member_from: string | null
  summary: IUserSummaryOrder
}

interface IUserSummaryOrder {
  id: number
  uid: number
  total_paid_order: number
  total_paid_service_card: number
  total_paid_prepay_card: number
  service_used: string | null
  user_level_id: number | null
  level: string | null
}

interface ItemableOrder {
  id: number
  uid: number
  sid: number
  times: number
  remain_time: number
  final_price: number
  price: number
  discount: number
  total_price: number
  status: boolean
  note: string
  commission_percen: number
  commission_money: number
  reward_percent: number
  reward_money: number
  service_card_value_id: number
  service_combo_id: number
  promotion: number
  time_expired: string
  unlimited: boolean
  deleted: boolean
  created_date: string
  modified_date: string
  created_by_id: number
  branch_id: number
  transfer_id: string | null
  referral_uid: number
  is_new_customer: number
  platform: string | null
  order_id: number
  other_branch_ids: string | null
  service: IServiceOrder
  treatmentCombo: string | null
  parent: string | null
}

interface IServiceOrder {
  id: number
  service_code: string
  service_backup_code: string
  service_name: string
  duration: number
  price: string
  special_price: string
  special_price_momo: string
  description: string
  service_group_id: number
  service_order: boolean
  commission_percen: number
  commission_money: string
  reward_percent: number
  reward_money: string
  commission_plan: number
  image: string
  status: boolean
  deleted: boolean
  created_date: string
  modified_date: string
  created_by_id: number
  branch_id: number
  booking_online: boolean
  service_cost_type: number
  is_featured: boolean
  is_momo_ecommerce_enable: boolean
  is_moba_ecommerce_enable: boolean
  video: string | null
  is_displayed_home: number
  tags: string | null
  limit_room: number
  service_class: string | null
  hide_service_customer: number
  other_branch_ids: string | null
  image_url: string
  video_url: string | null
  rating: number
}

export interface IOrderDetail {
  id: number
  order_id: number
  item_id: number
  item_name: string
  quantity: number
  treatment_program: number
  temp_card_data: string
  remain_time: number
  price: number
  discount: number
  discount_unit: string
  price_discount: number
  price_after_discount: number
  sub_total: number
  prepay: number | null
  commission: number
  reward_percent: number
  reward_money: number
  duration: number
  brand: string
  type: number
  status: boolean
  happy_hour_code: string
  created_date: string
  created_by_id: number
  deleted: boolean
  note: string
  pet_id: number
  promotion_id: number | null
  hide_item_moba: number
  itemable: ItemableOrder
}

export interface IOrderOrg {
  id: number
  uid: number
  status: number
  type: number
  payment_method_id: number
  payment_methods: string
  sub_total_money: number
  tax_money: number
  discount_percent: number
  discount_money: number
  happy_hour_code: string
  coupon_code: string
  coupon_discount_money: string
  total_money: number
  given_money: string
  total_commission: number
  note: string
  uid_confirmed: number
  date_time_confirmed: string
  bed_ids: string
  signature_image: string
  check_in: string
  check_out: string
  deleted: boolean
  created_date: string
  created_by_id: number
  branch_id: number
  order_code: number
  discount_symbol: number
  tax: number
  tax_symbol: number
  referral_uid: number
  is_new_customer: boolean
  platform: string | null
  pet_id: number
  delivery_address: string | null
  myspa_fee_momo: number
  myspa_percent_momo: number
  delivery_status: number
  log: string | null
  list_prepay_card: string | null
  locker_id: string | null
  details: IOrderDetail[]
  user: IUserOrder
}
