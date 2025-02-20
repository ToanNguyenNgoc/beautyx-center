/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Chip, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { KTSVG } from "_metronic/helpers";
import { adminApi } from "app/api";
import { formatDate } from "app/util";
import { PageCircularProgress, PermissionLayout, XPagination } from "components";
import TitlePage from "components/TitlePage";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string"
import { QrAdminAccount, ResponseList } from "@types";
import "./style.scss"
import { AdminAccount } from "app/interface";
import { useGetRolesAndPermissions } from "app/hooks";
import { FC } from "react";
import { identity, pickBy } from "lodash";

function Accounts() {
  const location = useLocation()
  const navigate = useNavigate()
  const { hasEnabled } = useGetRolesAndPermissions()
  const query = queryString.parse(location.search) as QrAdminAccount
  const { data, isLoading } = useQuery<{ context: ResponseList<AdminAccount[]> }>({
    queryKey: [query],
    queryFn: () => adminApi.adminUsers({
      'page': query['page'],
      'limit': 15,
      'filter[keyword]': query['filter[keyword]'],
      'include': 'roles',
      'filter[roles_count]': query['filter[roles_count]'] === 'all' ? undefined : true,
      'sort': '-created_at'
    }).then(res => res.data),
    enabled: hasEnabled('v1.admin.users.index')
  })
  const accounts = data?.context.data || []
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
  return (
    <PermissionLayout permissions={['v1.admin.users.index']}>
      <TitlePage title="Danh sách" />
      <div className={`card`}>
        <div className='card-header border-0 pt-5'>
          <div className="w-50">
            <Filter />
          </div>
          {/* <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Customer Statistics</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>Số lượng:{data?.total} members</span>
          </h3> */}
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Thông tin </th>
                  <th className='min-w-140px'>Số điện thoại</th>
                  <th className='min-w-140px'>Quyền</th>
                  <th className='min-w-120px'>Ngày tạo</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  accounts.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            <Avatar src={item.avatar || item.fullname} alt={item.fullname} />
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <span className='text-dark fw-bold fs-6'>
                              {item.fullname}
                            </span>
                            <span className='fw-semobold text-muted d-block fs-7'>
                              {item.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a href={`tel:${item.telephone}`} className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.telephone}
                        </a>
                      </td>
                      <td>
                        {
                          item.roles.length > 0 ?
                            item.roles.map(role => (
                              <Chip
                                key={role.id}
                                label={role.name}
                                color="success" size="small"
                                onDelete={hasEnabled('v1.admin.users.update') ? () => console.log("OK") : undefined}
                              />
                            ))
                            :
                            <Chip size="small" color="primary" label="Khách" />
                        }
                      </td>
                      <td>
                        <span className='text-muted fw-semobold text-muted d-block fs-7'>
                          {formatDate(item.created_at)}
                        </span>
                      </td>
                      <td className="d-flex justify-content-end">
                        <PermissionLayout permissions={['v1.admin.users.show', 'v1.admin.users.update']}>
                          <button
                            onClick={() => navigate(`/pages/accounts-form/${item.id}`)}
                            aria-label='Xem chi tiết'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                          </button>
                        </PermissionLayout>
                        {/* <PermissionLayout permissions={['v1.admin.users.update']}>
                          <button
                            aria-label='Xem chi tiết'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </button>
                        </PermissionLayout> */}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <PageCircularProgress loading={isLoading} />
            <XPagination
              totalPage={data?.context.last_page ?? 1}
              onChangePage={onChangePage}
              defaultPage={query['page'] ?? 1}
            />
          </div>
        </div>
      </div>
    </PermissionLayout>
  );
}

export default Accounts;

const Filter: FC = () => {
  const query = queryString.parse(useLocation().search) as any
  const navigate = useNavigate()
  const location = useLocation()
  const onChangeSearch = (text: string) => {
    const newQuery = Object.assign(query, {
      "filter[keyword]": text,
      "page": 1
    })
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity)),
    }, { replace: true })
  }
  const handleChange = (e: SelectChangeEvent) => {
    const newQuery = Object.assign(query, {
      "filter[roles_count]": e.target.value,
      "page": 1
    })
    navigate({
      pathname: location.pathname,
      search: queryString.stringify(pickBy(newQuery, identity)),
    }, { replace: true })
  }
  return (
    <div className="d-flex align-items-center">
      <div className="search w-75">
        <input
          onChange={e => onChangeSearch(e.target.value)} type="text"
          className="form-control form-control-solid" placeholder='Tìm kiếm Tên, email, phone...'
        />
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={query['filter[roles_count]'] ?? 'true'}
            onChange={handleChange}
          >
            <MenuItem value="true">Quản trị</MenuItem>
            <MenuItem value="all">
              <em>Tất cả</em>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}