/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TitlePage from 'components/TitlePage';
import { formatDate, formatPrice } from 'app/util/format';
import { DISCOUNTS_TYPE, DiscountsTypeElement } from 'app/util/fileType';
import FlatFormOrder from 'components/PlatForm';
import { KTSVG } from '_metronic/helpers';
import { IDiscountPar } from 'app/interface';
import { PageCircularProgress, XPagination } from 'components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QR_KEY } from 'common';
import { discountsApi } from 'app/api';
import queryString from 'query-string';
import { QrDiscount } from '@types';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { PLAT_FORM, PLAT_FORM_ARR } from 'app/util';
import './style.scss'
import { debounce, identity, pickBy } from 'lodash';
import { ExportCode } from './module/discount-form'
import { ChangeEvent, useCallback } from 'react';

function Discounts() {
  // const { METHOD } = useVerifyRoute()
  const location = useLocation()
  const navigate = useNavigate()
  const query = queryString.parse(location.search) as QrDiscount
  const { data, isLoading } = useQuery({
    queryKey: [QR_KEY.DISCOUNT_PAGE, query],
    queryFn: () => discountsApi.getAll({
      page: query?.page ?? 1,
      limit: 15,
      'filter[keyword]': query['filter[keyword]'],
      'filter[filter_all]': true,
      'filter[platform]': query['filter[platform]'],
      'filter[discount_type]': query['filter[discount_type]'],
      'sort': query.sort ?? '-created_at'
    })
  })
  const discounts: IDiscountPar[] = data?.data ?? []
  const onChangePage = (p: number) => {
    const newQuery = {
      ...query,
      page: p
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newQuery)
    })
  }
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (id: number | string) => discountsApi.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QR_KEY.DISCOUNT_PAGE, query])
    }
  })
  return (
    <>
      <TitlePage
        element={
          // METHOD?.includes("POST") ?
          <div>
            {/* <Link
              to={{ pathname: "/pages/vouchers-form" }}
              className="btn btn-sm btn-info"
            >
              Tạo mới voucher
            </Link> */}
            <Link
              to={{ pathname: "/pages/discounts-form" }}
              className="btn btn-sm btn-primary"
              style={{ marginLeft: 12 }}
            >
              Tạo mới mã giảm giá
            </Link>
          </div>
          // :
          // <></>
        }
        title="Danh sách Mã giảm giá"
      />
      <div className={`card mb-5 mb-xl-8`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Mã giảm giá</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>Số lượng : {data?.total ?? 1}</span>
          </h3>
        </div>
        <Filter query={query} />
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  {/* <th className='min-w-120px'>Mã</th> */}
                  <th className='min-w-150px'>Tiêu đề</th>
                  <th className='min-w-80px'>Ưu tiên</th>
                  {/* <th className='min-w-150px'>Mô tả</th> */}
                  <th className='min-w-150px'>Hình thức giảm</th>
                  <th className='min-w-150px'>Giá giảm</th>
                  {/* <th className='min-w-150px'>Loại giảm giá</th> */}
                  <th className='min-w-100px'>Từ ngày</th>
                  <th className='min-w-100px'>Đến ngày</th>
                  <th className='min-w-100px text-end'>Nền tảng</th>
                  <th className='min-w-100px text-end'>Số lượng mã</th>
                  <th className='min-w-150px text-end'>Sử dụng/1 khách</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  discounts.map((item: IDiscountPar, index: number) => (
                    <tr key={index} >
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            <img src={item.items[0]?.productable?.image_url} alt='' />
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <span className='text-dark fw-bold text-hover-primary fs-6'>
                              {item.title}
                            </span>
                            <span className='text-muted fw-semobold text-muted d-block fs-7'>
                              {formatDate(item.created_at)}
                              {/* llll */}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className='text-dark text-center fw-bold d-block mb-1 fs-7'>
                          {item.priority}
                        </span>
                      </td>
                      <td>
                        <div className='d-flex flex-column w-100 me-2'>
                          <DiscountsTypeElement
                            TYPE={item.discount_type}
                          />
                        </div>
                      </td>
                      <td>
                        <div className='d-flex flex-column w-100 me-2'>
                          {formatPrice(item.discount_value || 0)}{item.discount_type === "PERCENT" ? "%" : "đ"}
                        </div>
                      </td>
                      <td>
                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                          {formatDate(item.valid_from)}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                          {formatDate(item.valid_util)}
                        </span>
                      </td>
                      <td>
                        <FlatFormOrder
                          platForm={item.platform}
                        />
                      </td>
                      <td>
                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                          {item.total ?? 'Không giới hạn'}
                        </span>
                      </td>
                      <td>
                        <span className='text-muted text-end fw-semobold text-muted d-block fs-7'>
                          {item.limit ?? 'Không giới hạn'}
                        </span>
                      </td>
                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0 tb-control'>
                          {
                            // METHOD?.includes("UPDATE") &&
                            <button
                              // to={{
                              //   pathname: `/pages/discounts-form/${item.uuid}`,
                              // }}
                              onClick={() => navigate(`/pages/discounts-form/${item.uuid}`, { state: item })}
                              aria-label='Xem chi tiết'
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            >
                              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                            </button>
                          }
                          {
                            // METHOD?.includes("GET_BY_ID") &&
                            (
                              item.platform === 'SHOPEE' ||
                              item.platform === 'VINID' ||
                              item.platform === 'BEAUTYX' ||
                              item.platform === PLAT_FORM.VIETTEL_MONEY ||
                              item.platform === PLAT_FORM.LIVWELL ||
                              item.platform === PLAT_FORM.TAPTAP
                            ) &&
                            <button
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                              onClick={() => navigate(`/pages/discounts/${item.uuid}`)}
                            >
                              <KTSVG
                                path='/media/icons/duotune/general/gen019.svg'
                                className='svg-icon-3'
                              />
                            </button>
                          }
                          {
                            // METHOD?.includes("DELETE") &&
                            // <button
                            //   className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            //   onClick={() =>mutate(item.id)}
                            // >
                            //   <KTSVG
                            //     path='/media/icons/duotune/arrows/arr015.svg'
                            //     className='svg-icon-3'
                            //   />
                            // </button>
                          }
                          {
                            (
                              item.platform === 'SHOPEE' ||
                              item.platform === 'VINID' ||
                              item.platform === 'BEAUTYX' ||
                              item.platform === PLAT_FORM.VIETTEL_MONEY ||
                              item.platform === PLAT_FORM.LIVWELL ||
                              item.platform === PLAT_FORM.TAPTAP
                            ) &&
                            <ExportCode
                              title=''
                              size="small"
                              discount={item}
                            />
                          }
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <PageCircularProgress loading={isLoading} />
            <XPagination
              totalPage={data?.last_page ?? 1}
              onChangePage={onChangePage}
              defaultPage={query?.page ?? 1}
            />
          </div>
        </div>
      </div>
    </>
  );
}
const Filter = ({ query }: { query: QrDiscount }) => {
  const sorts = [
    { sort: '-created_at', title: 'Ngày tạo' },
    { sort: '-total', title: 'Số lượng mã' },
    { sort: '-priority', title: 'Độ ưu tiên' },
  ]
  const navigate = useNavigate()
  const location = useLocation()
  const debounceKeyword = useCallback(
    debounce((keyword) => navigate(
      keyword.trim() === "" ?
        `${location.pathname}`
        :
        `${location.pathname}?filter[keyword]=${keyword}`
      , { replace: true }), 600),
    []
  );
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => debounceKeyword(e.target.value)
  const handleChange = (event: SelectChangeEvent) => {
    const newQuery = {
      ...query,
      'page': 1,
      'filter[platform]': event.target.value !== "" ? event.target.value : ""
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  };
  const onChangeType = (e: SelectChangeEvent) => {
    const newQuery: QrDiscount = {
      ...query,
      'page': 1,
      'filter[discount_type]': e.target.value !== "" ? e.target.value : ""
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity))
    })
  }
  const onChangeSort = (e: SelectChangeEvent) => {
    const newQuery: QrDiscount = {
      ...query,
      'sort': e.target.value
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newQuery)
    })
  }
  return (
    <div className="d-flex justify-content-between filter-cnt">
      <div>
        <label className="filter-row_label">Tìm kiếm</label>
        <input
          type="text" onChange={onInputChange}
          className="form-control form-control-solid py-2 px-6"
          placeholder="Tiêu đề..."
        />
      </div>
      <div className="filter-row">
        <div className="filter-row_platform">
          <label className="filter-row_label">Hình thức giảm giá</label>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={query['filter[discount_type]'] ?? ''}
              onChange={onChangeType}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              {
                DISCOUNTS_TYPE.map(item => (
                  <MenuItem key={item.id} value={item.TYPE}>{item.title}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="filter-row_platform">
          <label className="filter-row_label">Nền tảng</label>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={query['filter[platform]'] ?? ''}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              {
                PLAT_FORM_ARR.map(item => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="filter-row_platform">
          <label className="filter-row_label">Sắp xếp theo</label>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={query.sort ?? sorts[0].sort}
              onChange={onChangeSort}
            >
              {
                sorts.map(item => (
                  <MenuItem key={item.sort} value={item.sort}>{item.title}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default Discounts;