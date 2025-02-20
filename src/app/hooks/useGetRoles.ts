import { roleAndPermissionApi } from "app/api";
import { UserRole } from "app/modules/auth";
import { useQuery } from "react-query";
import { useGetRolesAndPermissions } from "./useGetRolesAndPermissions";

export function useGetRoles() {
  const { hasEnabled } = useGetRolesAndPermissions()
  const query = useQuery<{ context: UserRole[] }>({
    queryKey: ['roleAndPermissionApi.roles'],
    queryFn: () => roleAndPermissionApi.roles().then(res => res.data),
    enabled: hasEnabled('v1.roles.index')
  })
  return Object.assign(query, {
    roles: query.data?.context || []
  })
}