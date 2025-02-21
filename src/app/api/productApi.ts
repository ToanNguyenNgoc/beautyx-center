import {pickBy, identity} from 'lodash'
import {AUTH_HEADER_PARAM_GET} from './config_header'
import {AUTH_LOCATION} from './config_header'

// interface import
import {
  IPRODUCT_GET_ALL,
  IPRODUCT_DETAIL_BY_ID,
  IPRODUCT_BY_ORG_ID,
  IPRODUCT_UPDATE_STATUS,
} from './product_models'
// import {axiosClient} from 'configs'
import {IResponseProductOrg, ResponseType} from 'app/interface'
import { axiosClient } from 'app/configs'
// end
class ProductApi {
  getByOrgId = (values: IPRODUCT_BY_ORG_ID) => {
    const url = `/organizations/${values.org}/products`
    const paramsOb = {
      org: values.org,
      page: values.page || 1,
      limit: values.limit,
      'filter[keyword]': values.filter?.keyword,
      'filter[product_category_id]': '',
      'filter[special]': '',
      'filter[special_ecommerce]': '',
      'filter[is_momo_ecommerce_enable]': '',
      'filter[is_moba_ecommerce_enable]': '',
      'filter[is_featured]': '',
      include: 'favorites_count|category',
      append: 'is_favorite|rating',
    }
    const params = pickBy(paramsOb, identity)
    if (values.org) {
      return axiosClient.get(url, {params}).then<ResponseType<IResponseProductOrg[]>>((res) => res.data)
    }
  }
  getDetailById = (values: IPRODUCT_DETAIL_BY_ID) => {
    const url = `/organizations/${values.org}/products/${values.id}`
    const params = {
      include: 'category|favorites_count',
      append: 'is_favorite|rating',
    }
    if (values.org && values.id) {
      return axiosClient.get(url, AUTH_HEADER_PARAM_GET(params))
    }
  }
  getProductsAll = (values: IPRODUCT_GET_ALL) => {
    const url = `/products`
    const LOCATION = AUTH_LOCATION()
    const paramsOb = {
      page: values.page || 1,
      limit: values.limit || 15,
      'filter[keyword]': values.keyword,
      'filter[min_price]': values.min_price || 1000,
      'filter[max_price]': values.max_price,
      'filter[special_min_price]': values.special_min_price || 1000,
      'filter[special_max_price]': values.special_max_price,
      'filter[discount_percent]': values.discount_percent,
      'filter[special_price]': values.special_price,
      'filter[is_momo_ecommerce_enable]': true,
      'filter[location]': values.sort === 'distance' ? LOCATION : null,
      sort: values.sort === 'distance' ? null : values.sort,
    }
    const params = pickBy(paramsOb, identity)
    return axiosClient.get(url, {params})
  }

  updateProductStatus = (values: IPRODUCT_UPDATE_STATUS) => {
    const url = `/organizations/${values.org}/products/${values.id}/update`
    const paramsOb = {is_momo_ecommerce_enable: values.is_momo_ecommerce_enable}
    return axiosClient.patch(url, paramsOb)
  }
}
const productsApi = new ProductApi()
export default productsApi
