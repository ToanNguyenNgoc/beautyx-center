/* eslint-disable @typescript-eslint/no-explicit-any */
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


// query order By ID
export interface IRES_ORDER_BY_ORGID {
  page: number
  limit: '15'
  'filter[status]'?:
    | 'PAID'
    | 'PENDING'
    | 'ERROR'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'PROCESSING'
    | 'FAILED'
    | 'REFUNDED'
    | 'WAITING' | string
  'filter[platform]'?:
    | 'MOMO'
    | 'MOBA'
    | 'BEAUTYX'
    | 'BEAUTYX MOBILE'
    | 'TIKI'
    | 'MYSPA CHECKIN'
    | 'MBBANK'
    | 'ZALO MOBA'
    | string
  'filter[withServicesSold]'?: boolean | string // Dịch vụ đã bán
  'filter[productable]'?: boolean | string // Sản phẩm liên quan
  'filter[organization_id]': number
  include?:
    | 'items'
    | 'organization'
    | 'branch'
    | 'user'
    | 'paymentMethod'
    | 'deliveryAddress'
    | 'appointments'
    | 'btxReward'
    | string
  sort?: 'id' | '-created_at' | string
  user_id?: number
  append?: 'qr_link' | 'origin '
}

// orderOrg ---------------------------------------
interface ExtraData {
  redirectUrl: string
  payUrl: string
  deeplink: string
  qrCodeUrl: string | null
  deeplinkMiniApp: string
}

interface PaymentGateway {
  id: number
  status: string
  amount: number
  amount_paid: number
  description: string
  transaction_uuid: string
  extra_data: ExtraData
  payment_method_id: number
  paymentable_type: string
  paymentable_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  amount_second: number | null
  payment_method_second_id: number | null
}

interface OpeningTime {
  from_time_opening: string
  to_time_opening: string
  time_opening: string
}

interface Organization {
  id: number
  name: string
  subdomain: string
  domain: string
  latitude: number
  longitude: number
  telephone: string[]
  address: string
  min_price: number
  max_price: number
  image: string
  is_momo_ecommerce_enable: boolean
  is_moba_register_requested: boolean
  opening_status: boolean
  opening_time: OpeningTime[]
  created_at: string
  updated_at: string
  province_code: number
  district_code: number
  ward_code: number | null
  priority: number
  timezone: string | null
  is_demo: boolean
  description: string
  mc_user_id: number
  content: string
  full_address: string
  image_url: string
  is_favorite: boolean
  location: string
}

interface PaymentMethod {
  id: number
  name_key: string
  is_changeable: boolean
  created_at: string
  updated_at: string
}

interface BTXReward {
  id: number
  type: string
  rewardable_type: string
  rewardable_id: number
  reward_points: number
  spentable_type: string | null
  spentable_id: number | null
  spent_points: number
  expired_at: string
  deleted_at: string | null
  created_at: string
  updated_at: string
  user_id: number
}

export interface IOrderOrg {
  id: number
  status: string
  amount: number
  description: string | null
  payment_method_id: number
  organization_id: number
  user_id: number
  origin_id: number
  branch_id: number | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  platform: string
  discount_value: number
  user_address_id: number | null
  myspa_fee: number
  amount_second: number | null
  payment_method_second_id: number | null
  is_review: number
  payment_gateway: PaymentGateway
  items: ITems[]
  organization: Organization
  branch: string | null
  user: User
  payment_method: PaymentMethod
  delivery_address: string | null
  appointments: any[]
  btx_reward: BTXReward
}
