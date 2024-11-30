import {CircularProgress} from '@mui/material'
import {KTSVG} from '_metronic/helpers'
import {TablesWidget12, TablesWidget13} from '_metronic/partials/widgets'
import {API_ROUTE} from 'app/api/api-route'
import orderApi from 'app/api/orders'
import {useGetParamUrl, useSwr} from 'app/hooks'
import {IORDER_BY_ORG_ID, IOrderDetail, IOrderOrg, IUserOrder} from 'app/interface'
import {paramsOrderById} from 'app/query-params'
import {formatPrice} from 'app/util'
import {QR_KEY} from 'common'
import TitlePage from 'components/TitlePage'
import React, {useState} from 'react'
import {useQuery} from 'react-query'
import {Link, useParams} from 'react-router-dom'

export function OrgOrders() {
  const paramsUrl: any = useParams()
  const query: any = useGetParamUrl() ?? {}
  const org = useSwr(true, API_ROUTE.ORGANIZATIONS_ID(paramsUrl.id)).response
  const [openAlert, setOpenAlert] = useState<{
    open: boolean
    title: string
    severity: 'success' | 'info' | 'warning' | 'error'
  }>({
    open: false,
    title: '',
    severity: 'success',
  })

  const PARAMS: IORDER_BY_ORG_ID = {
    ...paramsOrderById,
    org: org?.id,
    page: query?.page ?? 1,
    limit: '15',
    is_user: true,
    include: 'details | user',
    sort: '-created_date',
  }

  const {data, isLoading, refetch} = useQuery({
    queryKey: [QR_KEY.ORDER_ORG],
    queryFn: () => {
      if (!org?.id) return Promise.reject('Organization ID is missing')
      return orderApi.getOrderOrgById(PARAMS)
    },
    keepPreviousData: true,
    onSuccess: (data) => {},
    onError: (error) => {
      setOpenAlert({open: true, title: `Lỗi: ${error}`, severity: 'error'})
    },
    enabled: !!org?.id,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 2,
  })
  const orderData = data?.context?.data || []
  console.log(orderData)

  return (
    <>
      <TitlePage
        title={`${org?.name}`}
        element={
          <div className='d-flex align-items-center position-relative  search-service'>
            <span className='svg-icon svg-icon-1 position-absolute ms-4'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  opacity='0.5'
                  x='17.0365'
                  y='15.1223'
                  width='8.15546'
                  height='2'
                  rx='1'
                  transform='rotate(45 17.0365 15.1223)'
                  fill='currentColor'
                ></rect>
                <path
                  d='M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z'
                  fill='currentColor'
                ></path>
              </svg>
            </span>
            <input
              // onChange={() => handleChangeSearch()}
              // ref={refSearch}
              type='text'
              data-kt-ecommerce-product-filter='search'
              className='form-control form-control-solid w-200px ps-14'
              placeholder='Tìm kiếm đơn hàng'
            />
          </div>
        }
      />
      <div className='card'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>{`Tổng đơn hàng (${orderData.length})`}</span>
            {/* <span className='text-muted mt-1 fw-semobold fs-7'>{orderData.length}</span> */}
          </h3>
          <div></div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Order Id</th>
                  <th className='min-w-140px'>Tên KH</th>
                  <th className='min-w-120px'>Email</th>
                  <th className='min-w-120px'>SĐT</th>
                  <th className='min-w-120px'>Tổng đơn</th>
                  <th className='min-w-100px'>Ngày mua</th>
                  <th className='min-w-120px'>Trạng thái</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {orderData?.map((orders: IOrderOrg, index: number) => (
                  <tr key={index}>
                    {/* order id  */}
                    <td>
                      <Link to='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        {orders?.details?.map((detailItem: IOrderDetail, index: number) => (
                          <span key={index}>{detailItem?.order_id}</span>
                        ))}
                      </Link>
                    </td>
                    {/* name */}
                    <td>
                      <span className='text-dark fw-bold  d-block fs-7 '>
                        {orders?.user?.fullname}
                      </span>
                    </td>
                    {/* email  */}
                    <td>
                      <span className='text-dark fw-bold  d-block fs-7 '>
                        {orders?.user?.email}
                      </span>
                    </td>
                    {/* phone  */}
                    <td>
                      <span className='text-dark fw-bold  d-block fs-7 '>
                        {orders?.user?.telephone}
                      </span>
                    </td>
                    {/* total */}
                    <td className='text-dark fw-bold fs-6'>{formatPrice(orders?.total_money)}đ</td>
                    {/* buy day */}
                    <td>
                      <span className='text-dark fw-bold  d-block fs-7  fs-7'>
                        {orders?.created_date}
                      </span>
                    </td>
                    {/* status */}
                    <td>
                      <span className='badge badge-light-success'>Approved</span>
                    </td>
                    {/* action */}
                    <td className='text-end'>
                      <Link
                        to='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen019.svg'
                          className='svg-icon-3'
                        />
                      </Link>
                      <Link
                        to='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                      </Link>
                      <Link
                        to='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </Link>
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
        {/* begin::Body */}
      </div>
    </>
  )
}
