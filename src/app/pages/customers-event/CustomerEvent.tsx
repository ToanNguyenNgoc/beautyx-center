/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FC, useCallback } from "react";
import "./style.scss"
import { useQuery } from "react-query";
import queryString from "query-string"
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { QrCustomerEvent } from "app/@types";
import { axiosClient } from "app/configs";
import { PageCircularProgress, XPagination } from "app/components";
import { QR_CACHE } from "app/common";

export const CustomerEvent: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = queryString.parse(location.search) as QrCustomerEvent
  const { data, isLoading } = useQuery({
    queryKey: ['SSS', query],
    queryFn: () => axiosClient.get('/wheel', {
      params: Object.assign({ page: 1, limit: 15 }, query)
    }).then(res => res.data),
    staleTime: QR_CACHE
  })
  const onChangePage = (page: number) => {
    const newQuery = {
      ...query,
      page: page
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(newQuery)
    })
  }
  const customers = data?.context?.data || []
  const debounceKeyword = useCallback(
    debounce((keyword) => navigate(
      keyword.trim() === "" ?
        `${location.pathname}`
        :
        `${location.pathname}?subdomain=${keyword}`
      , { replace: true }), 600),
    []
  );
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => debounceKeyword(e.target.value)
  return (
    <div className="container" >
      <div>
        <label className="filter-row_label">Tìm kiếm</label>
        <input
          type="text" onChange={onInputChange}
          className="form-control form-control-solid py-2 px-6"
          placeholder="Subdomain..."
        />
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-150px'>Thông tin khách hàng</th>
                <th className='min-w-140px'>Số điện thoại</th>
                <th className='min-w-140px'>Merchant</th>
                <th className='min-w-120px'>Phần quà</th>
              </tr>
            </thead>
            <tbody>
              {
                customers?.map((item: any) => (
                  <tr key={item.id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <span className='text-dark fw-bold fs-6'>
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <a href={`tel:${item.telephone}`} className='text-dark fw-bold text-hover-primary d-block fs-6'>
                        {item.phone}
                      </a>
                    </td>
                    <td>
                      {item.subdomain + '.myspa.vn'}
                    </td>
                    <td>
                      <span className='text-muted fw-semobold text-muted d-block fs-7'>
                        {item.title}
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <PageCircularProgress loading={isLoading} />
          <XPagination
            totalPage={data?.context?.last_page ?? 1}
            onChangePage={onChangePage}
            defaultPage={query['page'] ?? 1}
          />
        </div>
      </div>
    </div>
  )
}