import servicesApi from "app/api/serviceApi";
import { IService, Response } from "app/interface";
import { QR_STALE_TIME } from "app/util";
import { useQuery, UseQueryOptions } from "react-query";

type ResponseData = Response<IService>

export function useGetServiceDetail(params: { org_id: number, id: number }, options?: UseQueryOptions<ResponseData>) {
  const query = useQuery<ResponseData>({
    queryKey: ['useGetServiceDetail', params],
    queryFn: () => servicesApi.getDetail(params.org_id, params.id),
    staleTime: QR_STALE_TIME,
    ...options
  })
  return Object.assign(query, {
    detail: query.data?.context
  })
}