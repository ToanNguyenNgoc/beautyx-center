import { QrAdminAccount, QrAdminOrder, ReqAdminUser } from "app/@types";
import { axiosClient } from "app/configs";

export const adminApi = {
  adminUsers: (params?: QrAdminAccount) => axiosClient.get('/admin/users', { params }),
  adminUser: (id: number) => axiosClient.get(`/admin/users/${id}`, { params: { 'include': 'roles' } }),
  adminUserCreate: (body: ReqAdminUser) => axiosClient.post('/admin/users', body),
  adminUserUpdate: (id: number, body: ReqAdminUser) => axiosClient.put(`/admin/users/${id}`, body),
  adminUserDelete: (id: number) => axiosClient.delete(`/admin/users/${id}`),

  adminOrders: (params?: QrAdminOrder) => axiosClient.get('/admin/orders', { params })
}