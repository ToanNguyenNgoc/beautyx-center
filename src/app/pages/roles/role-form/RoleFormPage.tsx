import { RequestRole, roleAndPermissionApi } from "app/api";
import { useGetPermissions, useGetRolesAndPermissions } from "app/hooks";
import { FC, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TitlePage from "components/TitlePage";
import { Checkbox, Tooltip } from "@mui/material";
import { IPermission } from "app/interface";
import { InitAlert, PermissionLayout, XButton } from "components";

const RoleFormPage: FC = () => {
  const navigate = useNavigate()
  const { hasEnabled } = useGetRolesAndPermissions()
  const locationName = useLocation().state as string
  const params = useParams() as { id?: Number }
  const type = params?.id ? 'update' : 'store'

  const [name, setName] = useState(locationName || '')
  const [permissionsSelect, setPermissionsSelect] = useState<IPermission[]>([])

  useQuery({
    queryKey: ['roleAndPermissionApi.role', params.id],
    queryFn: () => roleAndPermissionApi.role(Number(params.id)).then(res => res.data),
    enabled: !!(type === 'update' && hasEnabled('v1.roles.show')),
    onSuccess: (dataRes) => {
      setPermissionsSelect(dataRes.context)
    }
  })
  const { mutate, isLoading } = useMutation<any, any, RequestRole>({
    mutationFn: (body) => type === 'update' ? roleAndPermissionApi.roleUpdate(Number(params.id), body) : roleAndPermissionApi.roleCreate(body),
    onSuccess: () => {
      InitAlert.open({ title: 'Thành công', type: 'success' });
      setTimeout(() => navigate(-1), 1000)
    },
    onError: () => InitAlert.open({ title: 'Có lỗi xảy ra', type: 'error' })
  })
  const { permissionsGroup } = useGetPermissions()
  const onSelect = (e: IPermission | IPermission[]) => {
    if (Array.isArray(e)) {
      e.forEach((item) => toggleSelect(item))
    } else {
      toggleSelect(e)
    }
  }
  const toggleSelect = (e: IPermission) => {
    setPermissionsSelect(prev => {
      let newPrev = [...prev]
      if (prev.findIndex(i => i.id === e.id) < 0) {
        newPrev = [...newPrev, e]
      } else {
        newPrev = newPrev.filter(i => i.id !== e.id)
      }
      return newPrev
    })
  }
  const checkIsAll = (permissions: IPermission[]) => {
    return !!(permissions.filter(i => permissionsSelect.map(j => j.name).includes(i.name)).length === permissions.length)
  }
  const onSubmit = () => {
    if (name.trim() === '') return InitAlert.open({ title: 'Vui lòng nhập tên', type: 'warning' });
    mutate({
      name: locationName === name ? undefined : name,
      permissions_id: permissionsSelect.map(i => i.id)
    })
  }

  return (
    <PermissionLayout permissions={type === 'store' ? ['v1.roles.store'] : ['v1.roles.show', 'v1.roles.patch']} showEmpty>
      <div>
        <TitlePage
          title={type === 'store' ? 'Thêm mới' : 'Cập nhật'}
        />
        <div className="card p-6">
          <div className="flex-row-sp input-wrap w-50">
            <div className="wrap-item mb-4 w-100">
              <label className="form-label fw-bold">Tên quyền</label>
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                name="priority"
                className="form-control form-control-solid w-100"
                placeholder="Tên quyền"
              />
            </div>
          </div>
          <div className='post d-flex flex-column-fluid' id="kt_post">
            <div className="w-100">
              {
                permissionsGroup.map(parent => (
                  <div key={parent.name} className="mb-4">
                    <span className="fw-bold">{parent.desc}</span>
                    <div className="w-100 d-flex">
                      <div style={{ width: '14.2%', cursor: 'pointer' }} onClick={() => {
                        if (checkIsAll(parent.permissions)) {
                          onSelect(parent.permissions)
                        } else {
                          onSelect(parent.permissions.filter(i => !permissionsSelect.map(j => j.name).includes(i.name)))
                        }
                      }}>
                        <Tooltip title='all' placement='top' arrow>
                          <div>
                            <Checkbox readOnly checked={checkIsAll(parent.permissions)} />
                            <span>Tất cả</span>
                          </div>
                        </Tooltip>
                      </div>
                      {
                        sortPermissions(parent.permissions).map(permission => (
                          <div key={permission.id} style={{ width: '14.2%', cursor: 'pointer' }} onClick={() => onSelect(permission)}>
                            <Tooltip title={permission.name} placement='top' arrow>
                              <div>
                                <Checkbox readOnly checked={!!(permissionsSelect.find(i => i.id === permission.id))} />
                                <Method name={permission.name} />
                              </div>
                            </Tooltip>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <XButton
              onClick={onSubmit}
              loading={isLoading}
              title={type === 'store' ? 'Thêm mới' : 'Cập nhật'}
              color="success"
            />
          </div>
        </div>
      </div>
    </PermissionLayout>
  )
}
export default RoleFormPage

const sortPermissions = (permissions: IPermission[]): IPermission[] => {
  const sortArr = ['index', 'show', 'store', 'update', 'patch', 'destroy','sendNotification']
  return sortArr.map(i => {
    const permission = permissions.find(per => per.name.includes(i))
    return permission
  }).filter(Boolean) as IPermission[]
}

const Method: FC<{ name: string }> = ({ name }) => {
  const renderName = () => {
    let tName = '';
    if (name.includes('index')) tName = 'Danh sách';
    if (name.includes('show')) tName = 'Chi tiết';
    if (name.includes('store') || name.includes('sendNotification')) tName = 'Tạo mới';
    if (name.includes('patch') || name.includes('update')) tName = 'Cập nhật';
    if (name.includes('destroy')) tName = 'Xóa';
    return tName
  }
  return (
    <span>
      {renderName()}
    </span>
  )
}