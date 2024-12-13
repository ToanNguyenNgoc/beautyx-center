import {CircularProgress, FormControl, InputLabel, MenuItem} from '@mui/material'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import {API_ROUTE} from 'app/api/api-route'
import orderApi from 'app/api/orders'
import {useGetParamUrl, useSwr} from 'app/hooks'
import {IOrderOrg, IRES_ORDER_BY_ORGID, ResponseType} from 'app/interface'
import {formatPrice, OrderStatusElement} from 'app/util'
import {QR_KEY} from 'common'
import {XPagination} from 'components'
import TitlePage from 'components/TitlePage'
import {identity, pickBy} from 'lodash'
import moment from 'moment'
import {useState} from 'react'
import {useQuery} from 'react-query'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
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
  console.log(query, query?.sort)
  const [openAlert, setOpenAlert] = useState<{
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
    include: 'items|organization|branch|user',
    sort: query?.sort || '-created_at',
  }

  const {data, isLoading} = useQuery({
    queryKey: [QR_KEY.ORDER_ORG, org?.id, query?.page, query?.sort, query?.status, query.platform],
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

  return (
    <>
      <TitlePage
        title={`${org?.name}`}
        element={
          <div className='order-title flex-row align-items-center justify-content-end'>
            <span style={{whiteSpace: 'nowrap'}} className='text-gray-400 fw-bold fs-7 gs-0'>
              Bộ lọc:
            </span>
            <div className='filter-list'>
              <div className='filter-item'>
                <FormControl style={{width: '100%'}} size='small'>
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
                <FormControl style={{width: '100%'}} size='small'>
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
                    <MenuItem value='COMPLETED'>Hoàn thành</MenuItem>
                    <MenuItem value='CANCELLED'>Đã hủy</MenuItem>
                    <MenuItem value='PROCESSING'>Đang xử lý</MenuItem>
                    <MenuItem value='FAILED'>Thất bại</MenuItem>
                    <MenuItem value='REFUNDED'>Đã hoàn tiền</MenuItem>
                    <MenuItem value='WAITING'>Đang chờ</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='filter-item'>
                <FormControl style={{width: '100%'}} size='small'>
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
            <span className='card-label fw-bold fs-3 mb-1'>{`Tổng đơn hàng (${
              data?.context?.total || 0
            })`}</span>
          </h3>
          <div></div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            {isLoading ? (
              <div className='d-flex justify-content-center py-3'>
                <CircularProgress size='30px' style={{color: 'var(--beautyx)'}} />
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
                  {orderData?.map((item: IOrderOrg, index: number) => (
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
                      <td className='text-dark fw-bold  fs-6'>{formatPrice(item?.amount)}đ</td>
                      <td className='text-dark fw-bold  fs-6'>
                        {moment(item?.created_at, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')}
                      </td>
                      <td>
                        <OrderStatusElement status={item?.status} />
                      </td>
                      <td className='text-end'>
                        <Link
                          to={'#'}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        >
                          <i className='bi bi-eye fs-4'></i>
                        </Link>
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
    </>
  )
}
