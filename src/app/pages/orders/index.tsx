import { Autocomplete, Avatar, Box, CircularProgress, Dialog, FormControl, InputLabel, MenuItem, TextField } from '@mui/material'
import Select from '@mui/material/Select'
import { useDebounce, useGetRolesAndPermissions, useGetServiceDetail } from 'app/hooks'
import { IOrderOrg, IOrganization, ITems } from 'app/interface'
import { formatPrice, formatSalePriceService, onErrorImg, ORDER_STATUS, OrderStatusElement, PLAT_FORM } from 'app/util'
import { FlatFormOrder, PaymentMethod, PermissionLayout, XPagination } from 'app/components'
import TitlePage from 'app/components/TitlePage'
import { identity, pickBy } from 'lodash'
import moment from 'moment'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import queryString from "query-string"
import './order.scss'
import { QrAdminOrder, ResponseDetail, ResponseList } from 'app/@types'
import { adminApi, orgApi } from 'app/api'

const Orders = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = queryString.parse(location.search) as QrAdminOrder
  const keyword = useDebounce(query['filter[keyword]'] || '', 800)
  const params: QrAdminOrder = {
    ...query,
    page: query['page'] || 1,
    limit: 15,
    'filter[keyword]': keyword,
    'include': 'items|organization|branch|user|paymentMethod',
    'sort': query['sort'] || '-created_at'
  }
  const { hasEnabled } = useGetRolesAndPermissions()
  const { data, isLoading } = useQuery<ResponseDetail<ResponseList<IOrderOrg[]>>>({
    queryKey: ['adminApi.adminOrders', params],
    queryFn: () => adminApi.adminOrders(params).then(res => res.data),
    enabled: hasEnabled('v1.admin.orders.index'),
    staleTime: 0
  })
  const orderData = data?.context.data || []

  const onChangePage = (page: number) => {
    const newQuery = { ...query, page: page }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  const [detail, setDetail] = useState<IOrderOrg>()
  return (
    <PermissionLayout permissions={['v1.admin.orders.index']} showEmpty>
      <TitlePage
        title={`Danh sách đơn hàng`}
        element={
          <div className='order-title flex-row align-items-center justify-content-end'>
            <span style={{ whiteSpace: 'nowrap' }} className='text-gray-400 fw-bold fs-7 gs-0'>
              Bộ lọc:
            </span>
          </div>
        }
      />
      <div className='card'>
        <div className='p-8'>
          <Filter query={query} />
          <div className='filter-list'>
          </div>
        </div>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>{`Tổng đơn hàng (${data?.context?.total || 0})`}</span>
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
                    <th className='min-w-120px'>Cửa hàng</th>
                    <th className='min-w-120px'>Nền tảng</th>
                    <th className='min-w-120px'>Tổng đơn</th>
                    <th className='min-w-100px'>Ngày mua</th>
                    <th className='min-w-120px'>Trạng thái</th>
                    <th className='min-w-40px text-end'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.map((item: IOrderOrg) => (
                    <tr key={item.id}>
                      <td>
                        <Link to='#' className='text-dark fw-bold  fs-6'>
                          {item?.id}
                        </Link>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            <Avatar src={item.user?.avatar || item.user?.fullname} alt={item.user?.fullname} />
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <span className='text-dark fw-bold fs-6'>
                              {item.user?.fullname}
                            </span>
                            <span className='fw-semobold text-muted d-block fs-6'>
                              {item.user?.telephone}
                            </span>
                            <span className='fw-semobold text-muted d-block fs-7'>
                              {item.user?.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.organization?.name}
                      </td>
                      <td>
                        <FlatFormOrder platForm={item.platform} />
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
      <div className='mt-5'>
        <XPagination
          totalPage={data?.context.last_page || 1}
          onChangePage={onChangePage}
          defaultPage={query?.page ?? 1}
        />
      </div>
      <OrderDetailShow detail={detail} onClose={() => setDetail(undefined)} />
    </PermissionLayout>
  )
}

const Filter: FC<{ query: QrAdminOrder }> = ({
  query
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSortOrder = (value: string) => {
    const newQuery = {
      ...query,
      sort: value,
      page: 1,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  const handleStatusFilter = (value: string) => {
    const newQuery = {
      ...query,
      "filter[status]": value,
      page: 1,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  const handlePlatformFilter = (value: string) => {
    const newQuery = {
      ...query,
      "filter[platform]": value,
      page: 1,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  const onChangeSearch = (value: string) => {
    const newQuery = {
      "filter[keyword]": value,
      page: 1,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  const [keywordOrg, setKeyOrg] = useState('')
  const keyword = useDebounce(keywordOrg, 800)
  const { data } = useQuery<ResponseList<IOrganization[]>>({
    queryKey: ['ORG', keyword],
    queryFn: () => orgApi.getAll({ limit: 8, keyword }).then(res => res.data.context)
  })
  const onChangeOrg = (org: IOrganization | null) => {
    const newQuery = {
      ...query,
      "filter[organization_id]": org?.id,
      page: 1,
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  const { data: dataOrg } = useQuery<ResponseDetail<IOrganization>>({
    queryKey: ['ORG_ID', query['filter[organization_id]']],
    queryFn: () => orgApi.getOrgById(Number(query['filter[organization_id]'])).then(res => res.data),
    enabled: !!(query["filter[organization_id]"])
  })
  return (
    <div>
      <div className="filter-list pb-6">
        <div className="filter-item">
          <input
            value={query['filter[keyword]'] || ''}
            onChange={e => onChangeSearch(e.target.value)} type="text"
            className="form-control form-control-solid" placeholder='Tìm kiếm Tên, email, phone...'
          />
        </div>
      </div>
      <div className='filter-list'>
        <div className='filter-item'>
          <Autocomplete
            size='small'
            id="country-select-demo"
            options={data?.data || []}
            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(_event, newValue) => onChangeOrg(newValue)}
            value={dataOrg?.context || null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  {option.name}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cửa hàng"
                onChange={e => setKeyOrg(e.target.value)}
              />
            )}
          />
        </div>
        <div className='filter-item'>
          <FormControl style={{ width: '100%' }} size='small'>
            <InputLabel id='demo-select-small-label'>Xắp xếp theo</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              label='Mới nhất'
              value={query['sort'] || '-created_at'}
              onChange={e => handleSortOrder(e.target.value)}
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
              value={query['filter[status]'] || ""}
              onChange={e => handleStatusFilter(e.target.value)}
            >
              <MenuItem value=''>Tất cả</MenuItem>
              {
                Object.values(ORDER_STATUS).map(status => (
                  <MenuItem key={status} value={status}>
                    <OrderStatusElement status={status} />
                  </MenuItem>
                ))
              }
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
              value={query['filter[platform]'] || ''}
              onChange={e => handlePlatformFilter(e.target.value)}
            >
              <MenuItem value=''>Tất cả</MenuItem>
              {
                Object.values(PLAT_FORM).map(platform => (
                  <MenuItem key={platform} value={platform}>
                    {platform}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
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

export default Orders
