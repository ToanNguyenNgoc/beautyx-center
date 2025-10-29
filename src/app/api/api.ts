/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QrAdminAccount,
  ReqAdminUser,
  QrAdminOrder,
  QrBrandApp,
  ReqBrandApp,
  QrBrandAppVersion,
  ReqBrandAppVersion,
  ResponseList,
  ResponseDetail,
  QrAppointment,
  ReqPutApprove,
  ReqPostLogin,
  ReqPostRegister,
  ReqPostForgot,
  ReqPutProfile,
  QrCommunity,
  ReqPostPost,
  QrDiscount,
  QrDiscountDetail,
  ReqPostDiscount,
  QrDiscountCode
} from "app/@types";
import { AxiosInstance } from "app/configs";
import { ResBanner, ResCouponCodeCampaign, ResDiscountPar, ResPost } from "app/interface";
import { ResAppointment } from "app/interface/appointment";

type ResPaginate<T> = ResponseDetail<ResponseList<T>>;

const paramsGetBanner = {
  "page": 1,
  "limit": 15,
  "platform": "MOMO",
  "include": "origin",
  "sort": "-priority",
}

export const Api = {
  Admin: {
    adminUsers: (params?: QrAdminAccount) => AxiosInstance().get('/admin/users', { params }),
    adminUser: (id: number) => AxiosInstance().get(`/admin/users/${id}`, { params: { 'include': 'roles' } }),
    adminUserCreate: (body: ReqAdminUser) => AxiosInstance().post('/admin/users', body),
    adminUserUpdate: (id: number, body: ReqAdminUser) => AxiosInstance().put(`/admin/users/${id}`, body),
    adminUserDelete: (id: number) => AxiosInstance().delete(`/admin/users/${id}`),
    adminOrders: (params?: QrAdminOrder) => AxiosInstance().get('/admin/orders', { params }),
    getBrandApps: (params?: QrBrandApp) => AxiosInstance().get('/brand_apps', { params }).then(res => res.data),
    getBrandApp: (id: number) => AxiosInstance().get(`/brand_apps/${id}`).then(res => res.data),
    postBrandApp: (data: ReqBrandApp) => AxiosInstance().post('/brand_apps', data).then(res => res.data),
    putBrandApp: (id: number, data: ReqBrandApp) => AxiosInstance().put(`/brand_apps/${id}`, data).then(res => res.data),
    deleteBrandApp: (id: number) => AxiosInstance().delete(`/brand_apps/${id}`),
    getBrandAppVersion: (bundle_id: string, params?: QrBrandAppVersion) => AxiosInstance().get(`/brand_apps/${bundle_id}/versions`, { params }).then(res => res.data),
    postBrandAppVersion: (bundle_id: string, data: ReqBrandAppVersion) => AxiosInstance().post(`/brand_apps/${bundle_id}/versions`, data).then(res => res.data)
  },
  Appointment: {
    get: (params?: QrAppointment) => AxiosInstance().get('/admin/appointments', { params }).then<ResPaginate<ResAppointment[]>>(res => res.data),
  },
  Approve: {
    put: (id: number, body: ReqPutApprove) => AxiosInstance().put(`/approves/${id}`, body),
  },
  Auth: {
    login: (body: ReqPostLogin) => AxiosInstance().post('/auth/login', { ...body, platform: 'BEAUTYX' }),
    register: (body: ReqPostRegister) => AxiosInstance().post('/auth/register', body),
    getProfile: (token?: string) => AxiosInstance({ token }).get('/auth/profile'),
    putProfile: (body: ReqPutProfile) => AxiosInstance().put('/auth/profile', body),
    forgotPassword: (body: ReqPostForgot) => AxiosInstance().post('/auth/forgot', body),
    getRoles: () => AxiosInstance().get('/users/roles'),
  },
  Banner: {
    get: () => AxiosInstance().get('/banners', { params: paramsGetBanner }).then<ResPaginate<ResBanner[]>>(res => res.data),
    getDetail: (id: number) => AxiosInstance().get(`/banners/${id}`).then<ResponseDetail<ResBanner>>(res => res.data),
    post: (body: any) => AxiosInstance().post('/banners', body),
    put: (id: number, body: any) => AxiosInstance().put(`/banners/${id}`, body),
    delete: (id: number) => AxiosInstance().delete(`/banners/${id}`),
  },
  Post: {
    get: (params?: QrCommunity) => AxiosInstance().get('/posts', { params }).then<ResPaginate<ResPost[]>>(res => res.data),
    getDetail: (id: number) => AxiosInstance().get(`/posts/${id}`, { params: { 'append': 'media_url' } }).then<ResponseDetail<ResPost>>(res => res.data),
    post:(body: ReqPostPost) => AxiosInstance().post(`/posts`, body).then<ResponseDetail<ResPost>>(res => res.data),
  },
  Discount:{
    get:(params?:QrDiscount) => AxiosInstance().get('/discounts',{params}).then<ResPaginate<ResDiscountPar[]>>(res => res.data),
    detDetail:(params:QrDiscountDetail) => AxiosInstance().get(`/discounts/${params.id}`,{params}).then<ResponseDetail<ResDiscountPar>>(res => res.data),
    post:(body: ReqPostDiscount) => AxiosInstance().post('/discounts', body).then<ResponseDetail<ResDiscountPar>>(res => res.data),
    put:(id: number|string, body: ReqPostDiscount) => AxiosInstance().put(`/discounts/${id}`, body).then<ResponseDetail<ResDiscountPar>>(res => res.data),
    delete:(id: number|string) => AxiosInstance().delete(`/discounts/${id}`).then(res => res.data),
    getCodeCampaign:(params: QrDiscountCode) => AxiosInstance().get('/discounts/id/campaigncode',{params}).then<ResPaginate<ResCouponCodeCampaign[]>>(res => res.data),
  }
}