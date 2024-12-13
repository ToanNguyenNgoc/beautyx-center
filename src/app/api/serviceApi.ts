import {pickBy, identity} from 'lodash'
import {axiosClient} from 'configs'
import {ISERVICE_BY_ORG_ID, ISERVICE_UPDATE_STATUS} from 'app/interface/service_models'
import {ResponseType, IService} from 'app/interface'

class ServiceApi {
  getByOrgId = (values: ISERVICE_BY_ORG_ID) => {
    const url = `/organizations/${values.org}/services`
    const paramsOb = {
      org: values.org,
      page: values.page,
      limit: values.limit,
      'filter[keyword]': values.filter?.keyword,
      'filter[service_group_id]': '',
      'filter[special]': false,
      'filter[special_ecommerce]': false,
      'filter[is_momo_ecommerce_enable]': false,
      'filter[is_moba_ecommerce_enable]': false,
      'filter[is_featured]': false,
      include: 'category|favorites_count',
      append: 'is_favorite|rating|bought_count',
    }
    const params = pickBy(paramsOb, identity)
    if (values.org) {
      return axiosClient.get(url, {params}).then<ResponseType<IService[]>>((res) => res.data)
    }
  }
  updateServiceStatus = (values: ISERVICE_UPDATE_STATUS) => {
    const url = `/organizations/${values.org}/services/${values.id}/update`
    const paramsOb = {is_momo_ecommerce_enable: values.is_momo_ecommerce_enable}
    return axiosClient.patch(url, paramsOb)
  }
}

const servicesApi = new ServiceApi()
export default servicesApi
