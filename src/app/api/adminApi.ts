import { QrAdminAccount, QrAdminOrder, QrBrandApp, QrBrandAppVersion, ReqAdminUser, ReqBrandApp, ReqBrandAppVersion } from "app/@types";
import { axiosClient } from "app/configs";

export const adminApi = {
  adminUsers: (params?: QrAdminAccount) => axiosClient.get('/admin/users', { params }),
  adminUser: (id: number) => axiosClient.get(`/admin/users/${id}`, { params: { 'include': 'roles' } }),
  adminUserCreate: (body: ReqAdminUser) => axiosClient.post('/admin/users', body),
  adminUserUpdate: (id: number, body: ReqAdminUser) => axiosClient.put(`/admin/users/${id}`, body),
  adminUserDelete: (id: number) => axiosClient.delete(`/admin/users/${id}`),

  adminOrders: (params?: QrAdminOrder) => axiosClient.get('/admin/orders', { params }),

  //Brand App & Bundle version
  getBrandApps: (params?: QrBrandApp) => axiosClient.get('/brand_apps', { params }).then(res => res.data),
  getBrandApp: (id: number) => axiosClient.get(`/brand_apps/${id}`).then(res => res.data),
  postBrandApp: (data: ReqBrandApp) => axiosClient.post('/brand_apps', data).then(res => res.data),
  putBrandApp: (id: number, data: ReqBrandApp) => axiosClient.put(`/brand_apps/${id}`, data).then(res => res.data),
  deleteBrandApp: (id: number) => axiosClient.delete(`/brand_apps/${id}`),

  getBrandAppVersion: (bundle_id: string, params?: QrBrandAppVersion) => axiosClient.get(`/brand_apps/${bundle_id}/versions`, { params }).then(res => res.data),
  postBrandAppVersion: (bundle_id: string, data: ReqBrandAppVersion) => axiosClient.post(`/brand_apps/${bundle_id}/versions`, data).then(res => res.data)
}