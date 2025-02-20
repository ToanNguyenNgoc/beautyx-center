import dataJson from './permissions.json'

export const permissions = dataJson

const permissionsArray = Object.keys(permissions)
export const permissionsGroup = [
  {
    name: 'roles',
    desc: 'Nhóm quyền',
    permissions: permissionsArray.filter(i => i.includes('roles'))
  }
]

export type PermissionType = keyof typeof permissions