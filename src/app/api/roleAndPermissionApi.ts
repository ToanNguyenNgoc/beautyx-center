import { axiosClient } from "configs";

export interface RequestRole {
  name?: string;
  permissions_id: number[]
}
export const roleAndPermissionApi = {
  roles: () => axiosClient.get('/roles'),
  role: (id: number) => axiosClient.get(`/roles/${id}/permissions`),
  roleCreate: (body: RequestRole) => axiosClient.post('/roles', body),
  roleUpdate: (id: number, body: RequestRole) => axiosClient.patch(`/roles/${id}`, body),
  roleDelete: (id: number) => axiosClient.delete(`/roles/${id}`),

  permissions: () => axiosClient.get('/permissions'),
}