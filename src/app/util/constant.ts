import queryString from "query-string"
export const TYPE = {
  PROMOTION: { type: 'PROMOTION', id: 16, title: 'Promotion' },
  ORG: { type: 'ORGANIZATION', id: 17, title: 'Doanh nghiệp' },
  DEAL: { type: 'DEAL', id: 18, title: 'Danh sách deal HOT' },
  DISCOUNT:{type:'DISCOUNT', id:19, title:'Chi tiết deal HOT'}
}
export const dev = 'dev'

export const NOTI_TYPES = [
  TYPE.PROMOTION, TYPE.ORG, TYPE.DEAL, TYPE.DISCOUNT
]
export const getEnvParam = () => {
  const params = queryString.parse(window.location.search)
  return params.env
}
export const QR_STALE_TIME = 1000 * 60 * 2