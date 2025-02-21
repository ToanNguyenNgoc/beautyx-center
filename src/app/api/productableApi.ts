import { Productable } from "app/interface";
import { axiosV3Client } from "app/configs";
import { QrProductable, ResponseList } from "app/@types";

export const productableApi = {
  getAll: (qr: QrProductable) => {
    return axiosV3Client.get('/productables', { params: qr }).then<ResponseList<Productable[]>>(res => res.data.context)
  }
}