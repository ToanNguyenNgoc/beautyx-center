import { QrProductable, ResponseList } from "@types";
import { orgApi, productableApi, statisticApi } from "app/api";
import { IApprove, IOrganization } from "app/interface";
import { QR_CACHE, QR_KEY } from "common";
import { useQuery } from "react-query";
import { useSwr } from "./useSwr";
import { API_ROUTE } from "app/api/api-route";
import { paramApproves } from "app/query-params";
import dayjs from "dayjs";

export function useGetStatistics() {
  const { data: dataStatistic } = useQuery({
    queryKey: [QR_KEY.Statistic],
    queryFn: () => statisticApi.statistic(),
    staleTime: QR_CACHE
  })
  const paramsOrg = {
    'filter[is_momo_ecommerce_enable]': true
  }
  const { data: dataOrgs } = useQuery<{ context: ResponseList<IOrganization[]> }>({
    queryKey: [QR_KEY.Organization, paramsOrg],
    queryFn: () => orgApi.getAll(paramsOrg).then(res => res.data),
    staleTime: QR_CACHE
  })
  const { data: dataCustomers } = useQuery({
    queryKey: [QR_KEY.CUSTOMER],
    queryFn: () => statisticApi.customers({ page: 1, limit: 15 }),
    staleTime: QR_CACHE
  })

  const { responseArray } = useSwr(true, API_ROUTE.APPROVES, {
    ...paramApproves,
    "include": undefined,
    "page": 1,
    "limit": 150
  })
  const organizationsOpenCurrentMonth: IApprove[] = responseArray
    .filter((i: IApprove) => (i.type === 'ECOMMERCE_ON' && i.status === 'APPROVED' && dayjs(i.updated_at).format('YYYY-MM') === dayjs().format('YYYY-MM')))

  const paramsProductable: QrProductable = {
    'page': 1,
    'limit': 15,
    'type': 1,
    'on_ecommerce': true
  }
  const { data: dataService } = useQuery({
    queryKey: [QR_KEY.Productable],
    queryFn: () => productableApi.getAll(paramsProductable),
    staleTime: QR_CACHE
  })
  const totalOrder = Math.floor(new Date().getTime() * 0.0000000001)

  return {
    statistic: dataStatistic?.context,
    dataOrgs,
    dataCustomers,
    dataService,
    totalOrder,
    organizationsOpenCurrentMonth
  }
}