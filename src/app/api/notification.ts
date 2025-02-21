import { ReqPostNotification } from "app/@types";
import { axiosClient } from "app/configs";

export const notificationApi={
  post:(body:ReqPostNotification)=> axiosClient.post('/beautyx/notification', body).then(res => res.data)
}