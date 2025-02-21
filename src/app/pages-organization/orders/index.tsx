/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularProgress, Dialog, FormControl, InputLabel, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { API_ROUTE } from 'app/api/api-route'
import orderApi from 'app/api/orders'
import { useGetParamUrl, useGetServiceDetail, useSwr } from 'app/hooks'
import { IOrderOrg, IRES_ORDER_BY_ORGID, ITems, ResponseType } from 'app/interface'
import { formatPrice, formatSalePriceService, onErrorImg, OrderStatusElement } from 'app/util'
import { QR_KEY } from 'app/common'
import { PaymentMethod, XPagination } from 'app/components'
import TitlePage from 'app/components/TitlePage'
import { identity, pickBy } from 'lodash'
import moment from 'moment'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './order.scss'

export function OrgOrders() {
  const paramsUrl: any = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const query: any = useGetParamUrl() ?? {}
  const [selectedSort, setSelectedSort] = useState<string>(query?.sort || '-created_at')
  const [selectedStatus, setSelectedStatus] = useState<string>(query?.status || '')
  const [selectedPlatform, setSelectedPlatform] = useState<string>(query?.platform || '')

  const org = useSwr(true, API_ROUTE.ORGANIZATIONS_ID(paramsUrl.id)).response
  const paramQuery = {
    page: query?.page || 1,
    sort: query?.sort || '',
  }
  const [, setOpenAlert] = useState<{
    open: boolean
    title: string
    severity: 'success' | 'info' | 'warning' | 'error'
  }>({
    open: false,
    title: '',
    severity: 'success',
  })

  const PARAMS: IRES_ORDER_BY_ORGID = {
    page: query?.page || 1,
    limit: '15',
    'filter[status]': selectedStatus || undefined,
    'filter[platform]': selectedPlatform || undefined,
    'filter[organization_id]': org?.id,
    include: 'items|organization|branch|user|paymentMethod',
    sort: query?.sort || '-created_at',
  }

  const { data, isLoading } = useQuery({
    queryKey: [QR_KEY.ORDER_ORG, org?.id, query?.page, query?.sort, query?.status, query.platform],
    queryFn: () => {
      if (!org?.id) return Promise.reject('Organization ID is missing')
      return orderApi.getOrderOrgById(PARAMS)
    },
    keepPreviousData: true,
    onSuccess: () => { },
    onError: (error) => {
      setOpenAlert({ open: true, title: `Lỗi: ${error}`, severity: 'error' })
    },
    enabled: !!org?.id,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 2,
  })
  const orderData = data?.context?.data || []

  const onChangePage = (page: number) => {
    const paramsPage = {
      ...paramQuery,
      page: page,
    }

    delete paramsPage.sort
    setSelectedSort('')

    const url = `${new URLSearchParams(pickBy(paramsPage, identity)).toString()}`
    navigate({
      pathname: location.pathname,
      search: url,
    })
  }

  const getTotalPage = (data: ResponseType<IOrderOrg[]>) => {
    return data?.context?.last_page ?? 1
  }

  let totalPage = 1

  if (data) {
    totalPage = getTotalPage(data)
  }

  const handleSortOrder = (e: SelectChangeEvent) => {
    const newSort = e.target.value as string
    setSelectedSort(newSort)

    const newQuery = {
      ...query,
      sort: newSort,
      page: 1,
    }

    navigate({
      pathname: window.location.pathname,
      search: new URLSearchParams(pickBy(newQuery, identity)).toString(),
    })
  }

  const handleStatusFilter = (e: SelectChangeEvent) => {
    const newStatus = e.target.value as string
    setSelectedStatus(newStatus)

    const newQuery = {
      ...query,
      status: newStatus,
      page: 1,
    }

    navigate({
      pathname: window.location.pathname,
      search: new URLSearchParams(pickBy(newQuery, identity)).toString(),
    })
  }

  const handlePlatformFilter = (e: SelectChangeEvent) => {
    const newPlatform = e.target.value as string
    setSelectedPlatform(newPlatform)

    const newQuery = {
      ...query,
      platform: newPlatform,
      page: 1,
    }

    navigate({
      pathname: window.location.pathname,
      search: new URLSearchParams(pickBy(newQuery, identity)).toString(),
    })
  }
  const [detail, setDetail] = useState<IOrderOrg>()

  return (
    <>
      <TitlePage
        title={`${org?.name}`}
        element={
          <div className='order-title flex-row align-items-center justify-content-end'>
            <span style={{ whiteSpace: 'nowrap' }} className='text-gray-400 fw-bold fs-7 gs-0'>
              Bộ lọc:
            </span>
            <div className='filter-list'>
              <div className='filter-item'>
                <FormControl style={{ width: '100%' }} size='small'>
                  <InputLabel id='demo-select-small-label'>Xắp xếp theo</InputLabel>
                  <Select
                    labelId='demo-select-small-label'
                    id='demo-select-small'
                    label='Mới nhất'
                    value={selectedSort}
                    onChange={handleSortOrder}
                  >
                    <MenuItem value='-created_at'>Mới nhất</MenuItem>
                    <MenuItem value='id'>Theo ID</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='filter-item'>
                <FormControl style={{ width: '100%' }} size='small'>
                  <InputLabel id='status-select-label'>Status</InputLabel>
                  <Select
                    labelId='status-select-label'
                    id='status-select'
                    label='Tất cả'
                    value={selectedStatus}
                    onChange={handleStatusFilter}
                  >
                    <MenuItem value=''>Tất cả</MenuItem>
                    <MenuItem value='PAID'>Đã thanh toán</MenuItem>
                    <MenuItem value='PENDING'>Chờ thanh toán</MenuItem>
                    <MenuItem value='ERROR'>Lỗi</MenuItem>
                    {/* <MenuItem value='COMPLETED'>Hoàn thành</MenuItem> */}
                    <MenuItem value='CANCELLED'>Đã hủy</MenuItem>
                    <MenuItem value='PROCESSING'>Đang xử lý</MenuItem>
                    <MenuItem value='FAILED'>Thất bại</MenuItem>
                    <MenuItem value='REFUNDED'>Đã hoàn tiền</MenuItem>
                    <MenuItem value='WAITING'>Đang chờ</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='filter-item'>
                <FormControl style={{ width: '100%' }} size='small'>
                  <InputLabel id='platform-select-label'>Platform</InputLabel>
                  <Select
                    labelId='platform-select-label'
                    id='platform-select'
                    label='Tất cả'
                    value={selectedPlatform}
                    onChange={handlePlatformFilter}
                  >
                    <MenuItem value=''>Tất cả</MenuItem>
                    <MenuItem value='MOMO'>MOMO</MenuItem>
                    <MenuItem value='MOBA'>MOBA</MenuItem>
                    <MenuItem value='BEAUTYX'>BEAUTYX</MenuItem>
                    <MenuItem value='BEAUTYX MOBILE'>BEAUTYX MOBILE</MenuItem>
                    <MenuItem value='TIKI'>TIKI</MenuItem>
                    <MenuItem value='MYSPA CHECKIN'>MYSPA CHECKIN</MenuItem>
                    <MenuItem value='MBBANK'>MBBANK</MenuItem>
                    <MenuItem value='ZALO MOBA'>ZALO MOBA</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        }
      />
      <div className='card'>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>{`Tổng đơn hàng (${data?.context?.total || 0
              })`}</span>
          </h3>
          <div></div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            {isLoading ? (
              <div className='d-flex justify-content-center py-3'>
                <CircularProgress size='30px' style={{ color: 'var(--beautyx)' }} />
              </div>
            ) : (
              <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                <thead>
                  <tr className='fw-bold text-muted'>
                    <th className='min-w-80px'>Order Id</th>
                    <th className='min-w-140px'>Tên KH</th>
                    <th className='min-w-120px'>Email</th>
                    <th className='min-w-120px'>SĐT</th>
                    <th className='min-w-120px'>Tổng đơn</th>
                    <th className='min-w-100px'>Ngày mua</th>
                    <th className='min-w-120px'>Trạng thái</th>
                    <th className='min-w-40px text-end'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.map((item: IOrderOrg ) => (
                    <tr key={item.id}>
                      <td>
                        <Link to='#' className='text-dark fw-bold  fs-6'>
                          {item?.id}
                        </Link>
                      </td>
                      <td>
                        <Link to='#' className='text-dark fw-bold  d-block mb-1 fs-6'>
                          {item?.user?.fullname || item?.user?.telephone}
                        </Link>
                        {/* <span className='text-muted fw-semobold text-muted d-block fs-7'>
                        id: {item?.user_id}
                      </span> */}
                      </td>
                      <td>
                        <Link to='#' className='text-dark fw-bold  d-block mb-1 fs-6'>
                          {item?.user?.email || 'Chưa cập nhật'}
                        </Link>
                        {/* <span className='text-muted fw-semobold text-muted d-block fs-7'>
                        Code: Paid
                      </span> */}
                      </td>
                      <td>
                        <Link to='#' className='text-dark fw-bold  d-block mb-1 fs-6'>
                          {item?.user?.telephone}
                        </Link>
                        {/* <span className='text-muted fw-semobold text-muted d-block fs-7'>
                        Web, UI/UX Design
                      </span> */}
                      </td>
                      <td className='text-dark fw-bold  fs-6'>{formatPrice(item?.amount - item.discount_value)}đ</td>
                      <td className='text-dark fw-bold  fs-6'>
                        {moment(item?.created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')}
                      </td>
                      <td>
                        <OrderStatusElement status={item?.status} />
                      </td>
                      <td className='text-end'>
                        <div
                          onClick={() => setDetail(item)}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        >
                          <i className='bi bi-eye fs-4'></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {/* pagination */}
      <div className='mt-5'>
        <XPagination
          totalPage={totalPage}
          onChangePage={onChangePage}
          defaultPage={query?.page ?? 1}
        />
      </div>
      {/* close pagination */}
      <OrderDetailShow detail={detail} onClose={() => setDetail(undefined)} />
    </>
  )
}

interface OrderDetailShowProps {
  detail?: IOrderOrg;
  onClose?: () => void
}

const OrderDetailShow: FC<OrderDetailShowProps> = ({
  detail,
  onClose = () => { }
}) => {
  console.log(detail)
  const items = detail?.items || []
  return (
    <Dialog open={!!detail} onClose={onClose}>
      <div className='order_detail_cnt'>
        <div className="section_cnt">
          <p className='section_title'>Trạng thái đơn hàng</p>
          <OrderStatusElement status={detail?.status || ''} />
        </div>
        <div className="section_cnt">
          <span className="section_title">Thông tin khách hàng</span>
          <div className='d-flex'>
            <div className="wrap-item w-50 p-3">
              <label className="form-label">Tên khách hàng</label>
              <input
                value={detail?.user?.fullname || ''}
                className="form-control form-control-solid"
                disabled
                readOnly
              />
            </div>
            <div className="wrap-item w-50 p-3">
              <label className="form-label">Số điện thoại</label>
              <input
                value={detail?.user.telephone}
                className="form-control form-control-solid"
                disabled
                readOnly
              />
            </div>
          </div>
          <div className='d-flex'>
            <div className="wrap-item w-50 p-3">
              <label className="form-label">Email</label>
              <input
                value={detail?.user?.email || ''}
                className="form-control form-control-solid"
                disabled
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="section_cnt">
          <p className="section_title">Phương thức thanh toán</p>
          <PaymentMethod payment_method_id={Number(detail?.payment_method_id)} />
        </div>
        <div className="section_cnt">
          <span className="section_title">Danh sách item</span>
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-120px'>Mã</th>
                <th className='min-w-200px'>Dịch vụ</th>
                <th className='min-w-140px'>Giá gốc</th>
                <th className='min-w-120px'>Giá giảm</th>
                <th className='min-w-140px'>Giá mua</th>
                <th className='min-w-120px'>Số lượng</th>
                <th className='min-w-120px'>Tổng</th>
              </tr>
            </thead>
            <tbody>
              {
                items.map(item => (
                  <ItemRow key={item.id} item={item} organization_id={Number(detail?.organization_id)} />
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="section_cnt">
          <p className="section_title">Chi tiết thanh toán</p>
          <div className="d-flex justify-content-end">
            <div className="w-50">
              <div className="d-flex justify-content-between mt-3">
                <span className='fs-5'>Tạm tính</span>
                <span className='fw-bold fs-4'>{formatPrice(detail?.amount)}đ</span>
              </div>
              {
                detail && detail?.discount_value > 0 ?
                  <div className="d-flex justify-content-between mt-3">
                    <span className='fs-5'>Giảm giá</span>
                    <span className='fw-bold fs-4'>{formatPrice(detail?.discount_value)}đ</span>
                  </div>
                  :
                  null
              }
              <div className="d-flex justify-content-between mt-3">
                <span className='fs-5'>Thanh toán</span>
                <span className='fw-bold fs-4'>{formatPrice(Number(detail?.amount) - Number(detail?.discount_value))}đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

const ItemRow: FC<{ item: ITems, organization_id: number }> = ({
  organization_id,
  item
}) => {
  const { detail } = useGetServiceDetail({ org_id: organization_id, id: Number(item.productable_id) })
  if (!detail) return <></>
  return (
    <tr>
      <td>
        <span className='text-dark fw-bold d-block mb-1 fs-7'># {item.id}</span>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <div className="symbol symbol-50px">
            <img
              onError={(e) => onErrorImg(e)}
              className='symbol-label'
              src={detail?.image_url}
              alt=''
            />
          </div>
          <span className="ms-5 text-dark fs-5 fw-bold text-hover-success">{detail?.service_name}</span>
        </div>
      </td>
      <td>
        <span className="text-dark fs-5 fw-bold">{formatPrice(detail?.price)}đ</span>
      </td>
      <td>
        <span className="text-dark fs-5 fw-bold">
          {formatPrice(formatSalePriceService(Number(detail?.special_price), Number(detail?.special_price_momo)))}đ
        </span>
      </td>
      <td>
        <span className="text-dark fs-5 fw-bold">
          {formatPrice(item.base_price)}đ
        </span>
      </td>
      <td>
        <span className="text-dark fs-5 fw-bold">
          {item.quantity}
        </span>
      </td>
      <td>
        <span className="text-dark fs-5 fw-bold">
          {formatPrice(item.base_price * item.quantity)}đ
        </span>
      </td>
    </tr>
  )
}
