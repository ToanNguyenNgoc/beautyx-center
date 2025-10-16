import { useQuery } from "react-query"
import { useGetRolesAndPermissions } from "./useGetRolesAndPermissions"
import { roleAndPermissionApi } from "app/api"
import { IPermission } from "app/interface"

export function useGetPermissions() {
  const { hasEnabled } = useGetRolesAndPermissions()
  const { data } = useQuery<{ context: IPermission[] }>({
    queryKey: ['roleAndPermissionApi.permissions'],
    queryFn: () => roleAndPermissionApi.permissions().then(res => res.data),
    enabled: hasEnabled('v1.permissions.index')
  })
  const permissions = data?.context || []
  const permissionsGroup = [
    {
      name: 'roles',
      desc: 'Phân quyền',
      permissions: permissions.filter(i => i.name.includes('roles'))
    },
    {
      name: 'permissions',
      desc: 'Permissions',
      permissions: permissions.filter(i => i.name.includes('permissions'))
    },
    {
      name: 'admin.users',
      desc: 'Người dùng',
      permissions: permissions.filter(i => i.name.includes('admin.users'))
    },
    {
      name: 'banners',
      desc: 'Banner',
      permissions: permissions.filter(i => i.name.includes('banners'))
    },
    {
      name: 'discounts',
      desc: 'Giảm giá',
      permissions: permissions.filter(i => i.name.includes('discounts'))
    },
    {
      name: 'promotions',
      desc: 'Promotions',
      permissions: permissions.filter(i => i.name.includes('promotions'))
    },
    {
      name: 'beautyx.tips',
      desc: 'BeautyX tips',
      permissions: permissions.filter(i => i.name.includes('beautyx.tips'))
    },
    {
      name: 'trends',
      desc: 'BeautyX Video',
      permissions: permissions.filter(i => i.name.includes('trends'))
    },
    {
      name: 'beautyx.notification',
      desc: 'Push thông báo BeautyX',
      permissions: permissions.filter(i => i.name.includes('beautyx.notification'))
    },
    {
      name: 'organizations.updateECommerce',
      desc: 'Cửa hàng',
      permissions: permissions.filter(i => i.name.includes('organizations.updateECommerce'))
    },
    {
      name: 'admin.orders',
      desc: 'Danh sách đơn hàng',
      permissions: permissions.filter(i => i.name.includes('admin.orders'))
    },
    {
      name: 'admin.appointments',
      desc: 'Danh sách lịch hẹn',
      permissions: permissions.filter(i => i.name.includes('admin.appointments'))
    },
    {
      name: 'admin.comments',
      desc: 'Danh sách bình luận',
      permissions: permissions.filter(i => i.name.includes('admin.comments'))
    },
    {
      name: 'versions',
      desc: 'Danh sách phiên bản phần mềm',
      permissions: permissions.filter(i => i.name.includes('versions'))
    },
    {
      name: 'brand_apps',
      desc: 'Danh sách phiên bản App thương hiệu',
      permissions: permissions.filter(i => i.name.includes('brand_apps'))
    },
    {
      name: 'brand_app_versions',
      desc: 'Danh sách phiên bản Bundle app thương hiệu',
      permissions: permissions.filter(i => i.name.includes('brand_app_versions'))
    },
  ]
  return {
    permissions,
    permissionsGroup
  }
}