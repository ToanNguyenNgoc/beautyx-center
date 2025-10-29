/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Chip, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { KTSVG } from "../../../_metronic/helpers";
import { formatDate } from "app/util";
import { ConfirmAction, InitAlert, PageCircularProgress, PermissionLayout, XPagination, XSwitch } from "app/components";
import TitlePage from "app/components/TitlePage";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string"
import { QrAdminAccount, ResponseList } from "app/@types";
import "./style.scss"
import { AdminAccount } from "app/interface";
import { useGetRolesAndPermissions } from "app/hooks";
import { FC, useState } from "react";
import { identity, pickBy } from "lodash";
import { Api } from "app/api";

function Accounts() {
  const location = useLocation()
  const navigate = useNavigate()
  const { hasEnabled } = useGetRolesAndPermissions()
  const query = queryString.parse(location.search) as QrAdminAccount
  const { data, isLoading, refetch } = useQuery<{ context: ResponseList<AdminAccount[]> }>({
    queryKey: [query],
    queryFn: () => Api.Admin.adminUsers({
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
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id: number) => Api.Admin.adminUserDelete(id),
    onSuccess: () => {
      InitAlert.open({ title: 'Xóa thành công', type: 'success' });
      refetch()
    },
    onError: () => InitAlert.open({ title: 'Có lỗi xảy ra', type: 'error' })
  })
  const onDeleteAccount = (id: number) => {
    ConfirmAction.open({
      message: 'Xóa tài khoản',
      callBack: () => mutateDelete(id)
    })
  }
  return (
    <PermissionLayout permissions={['v1.admin.users.index']} showEmpty>
      <TitlePage
        element={
          <PermissionLayout permissions={['v1.admin.users.store']}>
            <Button
              onClick={() => navigate('/pages/accounts-form')}
              variant="contained"
              size="large"
            >
              Tạo mới
            </Button>
          </PermissionLayout>
        }
        title="Danh sách"
      />
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
                  <th className='min-w-120px'>Trạng thái</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  accounts.map((item) => (
                    <Item
                      key={item.id}
                      item={item}
                      onDeleteAccount={id => onDeleteAccount(id)}
                    />
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

const Item: FC<{ item: AdminAccount, onDeleteAccount: (id: number) => void }> = ({ item, onDeleteAccount = () => null }) => {
  const navigate = useNavigate();
  const { hasEnabled } = useGetRolesAndPermissions();
  const [active, setActive] = useState(item.is_active === 1 ? true : false)
  const onActive = (e: boolean) => {
    setActive(e);
    Api.Admin.adminUserUpdate(item.id, {
      is_active: e
    }).then(() => {
      InitAlert.open({ title: 'Cập nhật thành công', type: 'success' })
    })
  }
  return (
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
      <PermissionLayout permissions={['v1.admin.users.update']}>
        <td>
          <XSwitch label='' value={active} onChange={e => onActive(e.target.checked)} />
        </td>
      </PermissionLayout>
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
        <PermissionLayout permissions={['v1.admin.users.destroy']}>
          <button
            onClick={() => onDeleteAccount(item.id)}
            aria-label='Xem chi tiết'
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/general/gen027.svg'
              className='svg-icon-3'
            />
          </button>
        </PermissionLayout>
      </td>
    </tr>
  )
}



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