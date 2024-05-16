import { ReqPostNotification } from "@types";
import { axiosClient } from "configs";

export const notificationApi={
  post:(body:ReqPostNotification)=> axiosClient.post('/beautyx/notification', body).then(res => res.data)
}