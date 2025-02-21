/* eslint-disable @typescript-eslint/no-explicit-any */
import {IRES_ORDER_BY_ORGID, IOrderOrg, ResponseType} from 'app/interface'
import {paramOrder} from 'app/query-params'
import {identity, pickBy} from 'lodash'
import {AUTH_HEADER_PARAM_GET} from './config_header'
import { axiosClient } from 'app/configs'

class Orders {
  getAllOrder = (values: any) => {
    console.log(values)
    const url = `/orders`
    const paramsOb = {
      // page: values.page || 1,
      // limit: 15,
      // "filter[status]": values.status,
      // "filter[platform]": "BEAUTYX",
      // "includes": "items|organization|branch|user",
      // "sort": values.sort,
      // "user_id": values.user_id
      ...paramOrder,
      append: '',
    }
    const params = pickBy(paramsOb, identity)
    return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params))
  }
  getOrderOrgById = (values: IRES_ORDER_BY_ORGID) => {
    const url = `orders/btx`
    const params = pickBy(values, identity)
    return axiosClient.get(url, {params}).then<ResponseType<IOrderOrg[]>>((res) => res.data)
  }
}
const orderApi = new Orders()
export default orderApi
