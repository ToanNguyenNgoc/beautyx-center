export type ReqPostForgot = {
  telephone: string
  new_password: string
  code: string
  verification_id: string
}
export type ReqPostRegister = {
  fullname: string
  email: string
  telephone: string
  password: string
  platform: string
  code: string
  verification_id: string
}
export type ReqPostLogin = {
  email: string
  password: string
  platform: string
}
export type ReqPutProfile = {
  fullname?: string
  media?: number
}


export type ReqPutApprove = {
  status: "PENDING" | "REJECT" | "APPROVED" | "REVIEW",
  log?: string
}

export type ReqPostDiscount = {
  title: string,
  coupon_code: string,
  description: string,
  platform: string,
  discount_type: string,
  discount_unit: string,
  items?: number[] | string[],
  organizations?: number | string,
  is_campaign: number,
  valid_from: string,
  valid_util: string,
  discount_value: number | string,
  total?: number,
  limit?: number,
  minimum_order_value?: number
}
export type ReqPromotionBody = {
  name?: string;
  content?: string;
  main_media_id?: number;
  thumbnail_media_id?: number;
  discounts?: Array<number> | Array<string>;
  productables?: Array<number> | Array<string>;
  is_popup?: 0 | 1;
  valid_from?: string;
  valid_util?: string
}
export type ReqPostPost = {
  content: string;
  organization_id?: number;
  media_ids?: number[];
  status?: number;
  tag_id?: number;
  service_ids?: number[]
}
export type ReqPostNotification = {
  title?: string;
  description?: string;
  type?: string | number;
  link?: string;
  payload_id?: string
}
export type ReqAdminUser = {
  fullname?: string;
  email?: string;
  telephone?: string;
  password?: string;
  is_active?: boolean;
  roles_id?: number[]
}
export type ReqBrandApp = {
  name?: string,
  bundle_id?: string,
  status?: boolean,
  media_id?: number
}
export type ReqBrandAppVersion = {
  version: string,
  os_platform: string,
  status: boolean,
  media_id?: number
}

export type ReqTrend = {
  organization_id?: number;
  title?: string;
  content?: string;
  media_id?: number;
  media_thumbnail_id?: number;
  productables?: number[];
  discounts?: number[];
  status?: boolean;
  priority?: number;
}

export type ReqPostMood = {
  name?: string;
  priority?: number;
  media_id?: number;
  status?: boolean;
}

export type ReqLoginGovBtx = {
  UserName: string;
  PassWord: string;
}