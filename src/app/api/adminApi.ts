import { QrAdminAccount, QrAdminOrder, ReqAdminUser } from "@types";
import { axiosClient } from "configs";

export const adminApi = {
  adminUsers: (params?: QrAdminAccount) => axiosClient.get('/admin/users', { params }),
  adminUser: (id: number) => axiosClient.get(`/admin/users/${id}`, { params: { 'include': 'roles' } }),
  adminUserUpdate: (id: number, body: ReqAdminUser) => axiosClient.put(`/admin/users/${id}`, body),
  adminOrders: (params?: QrAdminOrder) => axiosClient.get('/admin/orders', { params })
}