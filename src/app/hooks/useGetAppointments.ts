import { QrAppointment, ResponseDetail, ResponseList } from "app/@types"
import { QR_KEY } from "app/common";
import { AxiosInstance } from "app/configs";
import { ResAppointment } from "app/interface/appointment"
import { useQuery, UseQueryOptions } from "react-query";

type ResponseQuery = ResponseDetail<ResponseList<ResAppointment[]>>

export function useGetAppointments(params?: QrAppointment, options?: UseQueryOptions<ResponseQuery>) {

  const query = useQuery({
    queryKey: [QR_KEY.Comments, params],
    queryFn: () => AxiosInstance().get('/admin/appointments', { params }).then<ResponseQuery>(res => res.data),
    retry: false,
    ...options,
  });

  const appointments = query.data?.context?.data || [];

  return {
    ...query,
    appointments,
  }
}