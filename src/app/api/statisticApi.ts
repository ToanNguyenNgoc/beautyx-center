import { QrCustomer, ResponseDetail, ResponseList } from "@types";
import { Customer, Statistic } from "app/interface";
import { axiosClient } from "configs";

type ResponseListCustomer = ResponseList<Customer[]> & {
  from_date: string;
  to_date: string
}


export const statisticApi = {
  statistic: () => axiosClient
    .get('/statistics')
    .then<ResponseDetail<Statistic>>(res => res.data),

  customers: (qr: QrCustomer) => axiosClient.get('/statistics/auth/customers', { params: qr })
    .then<ResponseListCustomer>(res => ({
      ...res.data.context,
      from_date: qr.from_date,
      to_date: qr.to_date
    })),

}