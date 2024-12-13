import { CircularProgress } from '@mui/material'
import { API_ROUTE } from 'app/api/api-route'
import servicesApi from 'app/api/serviceApi'
import { useGetParamUrl, useSwr } from 'app/hooks'
import { IService, ISERVICE_BY_ORG_ID, ResponseType } from 'app/interface'
import { paramService } from 'app/query-params'
import { RootStore } from 'app/redux/store'
import { formatPrice, formatSalePriceService, onErrorImg, StatusElement } from 'app/util'
import { QR_KEY } from 'common'
import { SnackAlert, XPagination, XSwitch } from 'components'
import TitlePage from 'components/TitlePage'
import { queryClient } from 'index'
import { debounce, identity, pickBy } from 'lodash'
import { useCallback, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

export function OrgServices() {
  const location = useLocation()
  const navigate = useNavigate()
  const query: any = useGetParamUrl() ?? {}
  const paramsUrl: any = useParams()
  const [keyWord, setKeyWord] = useState<string>()
  const [openAlert, setOpenAlert] = useState<{
    open: boolean
    title: string
    severity: 'success' | 'info' | 'warning' | 'error'
  }>({
    open: false,
    title: '',
    severity: 'success',
  })
  const refSearch = useRef<HTMLInputElement | null>(null)
  const isServiceTabActive = location.pathname.includes('/services')
  const isProductTabActive = location.pathname.includes('/products')
  const paramQuery = {
    page: query?.page,
    sort: query?.sort,
  }

  const { detail: org } = useSelector((state: RootStore) => state.ORGANIZATION)

  const PARAMS: ISERVICE_BY_ORG_ID = {
    ...paramService,
    org: Number(org?.id),
    page: query?.page ?? 1,
    limit: '15',
    filter: {
      keyword: keyWord,
    },
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QR_KEY.SERVICE_BY_ID, query?.page, keyWord, org?.id],
    queryFn: () => {
      if (!org?.id) return Promise.reject('Organization ID is missing')
      return servicesApi.getByOrgId(PARAMS)
    },
    keepPreviousData: true,
    onSuccess: (data) => { },
    onError: (error) => {
      setOpenAlert({ open: true, title: `Lỗi: ${error}`, severity: 'error' })
    },
    enabled: !!org?.id,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 2,
  })

  const { mutate } = useMutation(
    (item: IService) => {
      const values = {
        org: Number(org?.id),
        id: item?.id,
        is_momo_ecommerce_enable: item?.is_momo_ecommerce_enable,
      }
      return servicesApi.updateServiceStatus(values)
    },
    {
      onSuccess: () => {
        refetch()
        setOpenAlert({ open: true, title: 'Thay đổi trạng thái thành công', severity: 'success' })
        queryClient.invalidateQueries([QR_KEY.SERVICE_BY_ID])
      },
      onError: (error) => {
        setOpenAlert({ open: true, title: `Lỗi: ${error}`, severity: 'error' })
      },
    }
  )

  const switchHandler = (item: IService) => {
    const updatedItem = {
      ...item,
      is_momo_ecommerce_enable: !item.is_momo_ecommerce_enable,
    }
    mutate(updatedItem)
  }

  const onChangePage = (page: number) => {
    const paramsPage = {
      ...paramQuery,
      page: page,
    }

    const url = `${new URLSearchParams(pickBy(paramsPage, identity)).toString()}`
    navigate({
      pathname: location.pathname,
      search: url,
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDebounceSearch = useCallback(
    debounce((text) => setKeyWord(text), 600),
    []
  )

  const handleChangeSearch = () => {
    onDebounceSearch(refSearch?.current?.value)
  }

  const getTotalPage = (data: ResponseType<IService[]>) => {
    return data?.context?.last_page ?? 1
  }

  let totalPage = 1

  if (data) {
    totalPage = getTotalPage(data)
  }

  return (
    <>
      {/* title */}
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
              onChange={() => handleChangeSearch()}
              ref={refSearch}
              type='text'
              data-kt-ecommerce-product-filter='search'
              className='form-control form-control-solid w-200px ps-14'
              placeholder='Tìm kiếm dịch vụ'
            />
          </div>
        }
      />
      {/* close title */}
      <div className='row g-5 gx-xxl-8 table-banner'>
        <div className={`card mb-5 mb-xl-8`}>
          <div className='card-header border-0 pt-5'>
            <ul className='nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6 w-100'>
              <li className='nav-item'>
                <Link
                  to={`/pages/organizations/${org?.id}/services`}
                  className={`nav-link ${
                    isServiceTabActive ? 'active fw-bold text-primary' : 'fw-bold'
                  }`}
                >
                  Dịch vụ
                </Link>
              </li>
              {/* <li className='nav-item'>
                <Link
                  to={`/pages/organizations/${org?.id}/products`}
                  className={`nav-link ${
                    isProductTabActive ? 'active fw-bold text-primary' : 'fw-bold'
                  }`}
                >
                  Sản phẩm
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            {/* body service*/}
            <div className='card-body py-3'>
              <div className='table-responsive'>
                {isLoading ? (
                  <div className='d-flex justify-content-center py-3'>
                    <CircularProgress size='30px' style={{ color: 'var(--beautyx)' }} />
                  </div>
                ) : (
                  <table className='table align-middle gs-0 gy-4 table-row-dashed'>
                    <thead>
                      <tr className='text-gray-400 fw-bold fs-7 gs-0'>
                        <th
                          className='min-w-200px sorting'
                          tabIndex={0}
                          aria-controls='kt_ecommerce_products_table'
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: '25%' }}
                        >
                          Dịch vụ
                        </th>
                        <th
                          className='min-w-50px sorting'
                          tabIndex={0}
                          aria-controls='kt_ecommerce_products_table'
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: '10%' }}
                        >
                          Giá gốc
                        </th>
                        <th
                          className='min-w-70px sorting'
                          tabIndex={0}
                          aria-controls='kt_ecommerce_products_table'
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: '10%' }}
                        >
                          Giá giảm
                        </th>
                        <th
                          className='min-w-50px sorting'
                          tabIndex={0}
                          aria-controls='kt_ecommerce_products_table'
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: '15%' }}
                        >
                          Trạng thái TMĐT
                        </th>
                        <th
                          className='min-w-100px text-end'
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: '10%' }}
                        >
                          Tùy chọn
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.context?.data.map((item, index: number) => (
                        <tr key={index} className='text-gray-400 fw-bold fs-7 gs-0'>
                          <td
                            className=' sorting'
                            tabIndex={0}
                            aria-controls='kt_ecommerce_products_table'
                            rowSpan={1}
                            colSpan={1}
                          >
                            <div className='d-flex align-items-center'>
                              <Link to='#' className='symbol symbol-50px'>
                                <img
                                  onError={(e) => onErrorImg(e)}
                                  className='symbol-label'
                                  src={item.image ? item.image_url : org?.image_url}
                                  alt=''
                                />
                              </Link>
                              <div className='ms-5'>
                                <Link to='#' className='text-dark fs-5 fw-bold text-hover-success'>
                                  {item?.service_name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <th className='sorting text-gray-600'>{formatPrice(item?.price)}</th>
                          <th className='sorting text-gray-800'>
                            {formatPrice(
                              formatSalePriceService(Number(item.special_price),Number(item.special_price_momo))
                            )}
                          </th>
                          <th className='sorting'>
                            <StatusElement status={item?.is_momo_ecommerce_enable} />
                          </th>
                          <th className='text-end'>
                            <XSwitch
                              value={item?.is_momo_ecommerce_enable === true ? true : false}
                              label=''
                              onChange={() => switchHandler(item)}
                            />
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* pagination */}
      <XPagination
        totalPage={totalPage}
        onChangePage={onChangePage}
        defaultPage={query?.page ?? 1}
      />
      {/* close pagination */}

      <SnackAlert
        open={openAlert.open}
        onClose={() => setOpenAlert((prev) => ({ ...prev, open: false }))}
        title={openAlert.title}
        severity={openAlert.severity}
      />
    </>
  )
}
