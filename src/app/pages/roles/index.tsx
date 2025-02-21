import TitlePage from 'app/components/TitlePage';
import { useGetRoles } from 'app/hooks'
import { KTSVG } from '../../../_metronic/helpers';
import { InitAlert, PermissionLayout } from 'app/components'
import { useNavigate } from 'react-router-dom';
import { roleAndPermissionApi } from 'app/api';
import { Button } from '@mui/material';
import { SUPER_ADMIN } from 'app/util';

function Roles() {
  const navigate = useNavigate()
  const { roles, refetch } = useGetRoles()

  const onDelete = (id: number) => {
    roleAndPermissionApi.roleDelete(id)
      .then(() => {
        InitAlert.open({ title: 'Xóa thành công !' });
        refetch()
      })
      .catch(() => InitAlert.open({ title: 'Có lỗi xảy ra !' }))
  }
  return (
    <PermissionLayout permissions={['v1.roles.index']} showEmpty>
      <TitlePage
        title='Phân quyền'
        element={
          <PermissionLayout permissions={['v1.roles.store']}>
            <Button
              onClick={() => navigate('/pages/roles-form')}
              variant="contained"
              size="large"
            >
              Tạo mới quyền
            </Button>
          </PermissionLayout>
        }
      />
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted bg-light'>
                  <th className='ps-4 min-w-120px rounded-start'>#</th>
                  <th className='min-w-250px'>Tên quyền</th>
                  <th className='min-w-100px'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  roles.filter(i => i.guard_name === 'api').map((role, index) => (
                    <tr key={role.id}>
                      <td>{index + 1}</td>
                      <td>{role.name}</td>
                      <td>
                        {
                          role.name !== SUPER_ADMIN &&
                          <>
                            <PermissionLayout permissions={['v1.roles.show', 'v1.roles.patch']}>
                              <button
                                onClick={() => navigate(`/pages/roles-form/${role.id}`, { state: role.name })}
                                aria-label='Xem chi tiết'
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                              >
                                <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                              </button>
                            </PermissionLayout>
                            <PermissionLayout permissions={['v1.roles.destroy']}>
                              <button
                                onClick={() => onDelete(role.id)}
                                aria-label='Xem chi tiết'
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                              >
                                <KTSVG path='/media/icons/duotune/general/gen027.svg'
                                  className='svg-icon-3'
                                />
                              </button>
                            </PermissionLayout>
                          </>
                        }
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PermissionLayout>
  );
}

export default Roles;