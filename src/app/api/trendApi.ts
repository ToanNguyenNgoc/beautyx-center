import { QrTrend, ReqTrend, ResponseDetail, ResponseList } from "app/@types";
import { AxiosInstance } from "app/configs";
import { ResTrend } from "app/interface/trend";

export const TrendApi = {
  get: (params: QrTrend) => AxiosInstance().get('/trends', { params }).then<ResponseDetail<ResponseList<ResTrend[]>>>(res => res.data),
  getById: (id: number, params?: QrTrend) => AxiosInstance().get(`/trends/${id}`, { params }).then(res => res.data),
  post: (data: ReqTrend) => AxiosInstance().post('/trends', data).then(res => res.data),
  update: (id: number, data: ReqTrend) => AxiosInstance().put(`/trends/${id}`, data).then(res => res.data),
  delete: (id: number) => AxiosInstance().delete(`/trends/${id}`).then(res => res.data),
}