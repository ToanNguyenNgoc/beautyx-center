// import './style.scss'
import TitlePage from 'components/TitlePage'
import { Link } from 'react-router-dom'
import { KTSVG } from '_metronic/helpers'
import { useMutation, useQuery } from 'react-query'
import tipAPI from 'app/api/tipApi'
import { Tips } from 'app/interface'
import { QR_KEY } from 'common'
import { queryClient } from 'index'
import { InitAlert, PermissionLayout } from 'components'
function TipPage() {
  const { data } = useQuery({
    queryKey: [QR_KEY.TIP_PAGE],
    queryFn: () => tipAPI.getAll(),
  })
  const { mutate } = useMutation({
    mutationFn: (id: number) => tipAPI.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QR_KEY.TIP_PAGE])
    },
    onError: (error) => InitAlert.open({ title: 'Có lỗi xảy ra', 'type': 'error' }),
  })
  const tips: Tips[] = data?.context?.data ?? []
  return (
    <>
      <TitlePage
        element={
          <PermissionLayout permissions={['v1.beautyx.tips.store']}>
            <Link to={{ pathname: '/pages/tips-form' }} className='btn btn-sm btn-primary'>
              Tạo mới
            </Link>
          </PermissionLayout>
        }
        title='Danh sách Tip'
      />
      <div className='row g-5 gx-xxl-8 table-banner'>
        <div className={`card mb-5 mb-xl-8`}>
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Tips</span>
            </h3>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body py-3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
              {/* begin::Table */}
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                {/* begin::Table head */}
                <thead>
                  <tr className='fw-bolder fs-6 text-gray-800'>
                    <th className='w-25px'>#</th>
                    <th className='min-w-150px'>Tên</th>
                    <th className='min-w-140px'>Loại</th>
                    <th className='min-w-140px'>Độ ưu tiên</th>
                    <th className='min-w-100px text-end'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tips.map((item: Tips, index: number) => (
                    <tr key={item?.id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{item?.name}</td>
                      <td>{item?.type}</td>
                      <td>{item?.priority}</td>
                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <PermissionLayout permissions={['v1.beautyx.tips.update']}>
                            <Link
                              to={{
                                pathname: `/pages/tips-form/${item?.id}`,
                              }}
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            >
                              <KTSVG
                                path='/media/icons/duotune/art/art005.svg'
                                className='svg-icon-3'
                              />
                            </Link>
                          </PermissionLayout>
                          <PermissionLayout permissions={['v1.beautyx.tips.destroy']}>
                            <Link
                              to='#'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                              onClick={() => mutate(item?.id)}
                            >
                              <KTSVG
                                path='/media/icons/duotune/general/gen027.svg'
                                className='svg-icon-3'
                              />
                            </Link>
                          </PermissionLayout>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* end::Table body */}
              </table>
              {/* end::Table */}
            </div>
            {/* end::Table container */}
          </div>
        </div>
      </div>
    </>
  )
}
export default TipPage