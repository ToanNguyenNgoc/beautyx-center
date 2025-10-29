import { QrMood, ReqPostMood, ResponseDetail, ResponseList } from "app/@types";
import { AxiosInstance } from "app/configs";
import { ResGmupMood } from "app/interface/mood";

export const MoodApi = {
  getMoods: (params?: QrMood) => AxiosInstance({ version: 'v4' }).get('/moods', { params }).then<ResponseList<ResponseDetail<ResGmupMood[]>>>(res => res.data),
  getMood: (id: number) => AxiosInstance({ version: 'v4' }).get(`/moods/${id}`).then<ResponseDetail<ResGmupMood>>(res => res.data),
  createMood: (payload: ReqPostMood) => AxiosInstance({ version: 'v4' }).post('/moods', payload).then<ResponseDetail<ResGmupMood>>(res => res.data),
  updateMood: (id: number, payload: ReqPostMood) => AxiosInstance({ version: 'v4' }).put(`/moods/${id}`, payload).then<ResponseDetail<ResGmupMood>>(res => res.data),
  deletedMood: (id: number) => AxiosInstance({ version: 'v4' }).delete(`/moods/${id}`).then(res => res.data),
}