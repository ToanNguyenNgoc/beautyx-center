import { QrAppointment, ResponseDetail, ResponseList } from "app/@types";
import { AxiosInstance } from "app/configs";
import { ResAppointment } from "app/interface/appointment";

export const AppointmentApi = {
  get: (params?: QrAppointment) => AxiosInstance().get('/admin/appointments', { params }).then<ResponseList<ResponseDetail<ResAppointment[]>>>(res => res.data),
}