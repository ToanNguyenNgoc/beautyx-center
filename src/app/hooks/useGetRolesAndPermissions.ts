/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRoot } from "app/redux/interface"
import { SUPER_ADMIN } from "app/util"
import { PermissionType } from "app/components/PermissionLayout/permission"
import { useSelector } from "react-redux"

export function useGetRolesAndPermissions() {
  const ACCOUNT = useSelector((state: IRoot) => state.ACCOUNT)
  const roles = ACCOUNT.userRole || [];
  let permissions: string[] = []
  try {
    permissions = roles.flatMap(i => i.permissions)
  } catch (error) {

  }

  const hasEnabled = (permission: PermissionType) => (permissions.includes(permission) || roles.map(i => i.name).includes(SUPER_ADMIN))
  // const hasEnabled = (permission: PermissionType) => true;
  return {
    roles,
    permissions,
    hasEnabled
  }
}