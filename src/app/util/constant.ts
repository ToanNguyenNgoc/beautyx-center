import queryString from "query-string"
export const TYPE = {
  PROMOTION: { type: 'PROMOTION', id: 16, title: 'Promotion' },
  ORG: { type: 'ORGANIZATION', id: 17, title: 'Doanh nghiệp' },
  DEAL: { type: 'DEAL', id: 18, title: 'Danh sách deal HOT' },
  DISCOUNT: { type: 'DISCOUNT', id: 19, title: 'Chi tiết deal HOT' }
}
export const dev = 'dev'
export const SUPER_ADMIN = 'SUPER_ADMIN'

export const NOTI_TYPES = [
  TYPE.PROMOTION, TYPE.ORG, TYPE.DEAL, TYPE.DISCOUNT
]
export const getEnvParam = () => {
  const params = queryString.parse(window.location.search)
  return params.env
}
export const QR_STALE_TIME = 1000 * 60 * 2
export const PAYMENT_METHOD = {
  MOMO: {
    "id": 1,
    "name_key": "MOMO",
    "is_changeable": false,
    "created_at": "2022-01-07 18:00:07",
    "updated_at": "2022-01-07 18:00:07",
    "name": "Ví MOMO",
    "color":"#A9206D"
  },
  VNPAY: {
    "id": 2,
    "name_key": "VNPAY",
    "is_changeable": false,
    "created_at": "2022-01-07 18:00:07",
    "updated_at": "2022-01-07 18:00:07",
    "name": "VNPAY",
    "color":"#A2CAED"
  },
  VIETTELPAY: {
    "id": 7,
    "name_key": "VIETTELPAY",
    "is_changeable": false,
    "created_at": "2022-01-07 18:00:07",
    "updated_at": "2022-01-07 18:00:07",
    "name": "Viettel Money",
    "color":"#DD1437"
  },
  PAYON: {
    "id": 15,
    "name_key": "PAYON (BeautyX)",
    "is_changeable": false,
    "created_at": "2023-10-13 10:00:00",
    "updated_at": "2023-10-13 10:00:00",
    "name": "PAYON",
    "color":"#1466D8"
  }
}