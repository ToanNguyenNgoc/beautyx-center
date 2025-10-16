import { FlatFormOrder, PermissionLayout, XPagination } from "app/components";
import { FC } from "react";
import TitlePage from 'app/components/TitlePage'
import { useDebounce, useGetAppointments, useQueryParams } from "app/hooks";
import { QrAppointment } from "app/@types";
import { Avatar, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import { omit } from "lodash";
import { PLAT_FORM } from "app/util";

const AppointmentPage: FC = () => {
  const { query, handleQueryString } = useQueryParams<QrAppointment>();
  const keywork = useDebounce(query["filter[keyword]"] || '', 800);
  const { appointments, isLoading, data } = useGetAppointments({
    'append': 'services',
    'include': 'organization|user|order|branch',
    'sort': query?.sort || '-created_at',
    'filter[platform]': query?.["filter[platform]"] ?? 'MOMO|BEAUTYX|BEAUTYX-MOBILE|GMUP',
    'hidden_qr_link': true,
    'filter[keyword]': keywork,
    ...omit(query, ['filter[keyword]']),
  });

  return (
    <PermissionLayout permissions={['v1.admin.appointments.index']} showEmpty>
      <TitlePage
        title={`Danh sách lịch hẹn`}
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
          <Filter query={query} handleQueryString={handleQueryString} />
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
                    <th className='min-w-80px'>Appointment Id</th>
                    <th className='min-w-140px'>Tên KH</th>
                    <th className='min-w-120px'>Cửa hàng</th>
                    <th className='min-w-120px'>Nền tảng</th>
                    <th className='min-w-120px'>Thời gian lịch hẹn</th>
                    <th className='min-w-100px'>Ghi chú</th>
                    <th className='min-w-120px'>Ngày tạo</th>
                    <th className='min-w-40px text-end'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map(item => (
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
                      <td>
                        {moment(item.time_start).format('YYYY-MM-DD HH.mm')}
                      </td>
                      <td>
                        {item.note}
                      </td>
                      <td>
                        {moment(item.created_at).format('YYYY-MM-DD HH.mm')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className='mt-5'>
            <XPagination
              totalPage={data?.context.last_page || 1}
              onChangePage={page => handleQueryString('page', page)}
              defaultPage={query.page}
            />
          </div>
        </div>
      </div>
    </PermissionLayout>
  )
}

const Filter: FC<{ query: QrAppointment, handleQueryString: <TF>(key: string, value: TF) => void }> = ({
  query,
  handleQueryString,
}) => {
  return (
    <div>
      <div className="filter-list pb-6">
        <div className="filter-item">
          <input
            defaultValue={query["filter[keyword]"] || ''}
            value={query["filter[keyword]"]}
            onChange={e => handleQueryString('filter[keyword]', e.target.value)}
            className="form-control form-control-solid" placeholder='Tìm kiếm Tên, email, phone...'
          />
        </div>
      </div>
      <div className="filter-list">
        <div className='filter-item'>
          <FormControl style={{ width: '100%' }} size='small'>
            <InputLabel id='demo-select-small-label'>Xắp xếp theo</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              label='Mới nhất'
              value={query['sort'] || '-created_at'}
              onChange={e => handleQueryString('sort', e.target.value)}
            >
              <MenuItem value='-created_at'>Ngày tạo mới nhất</MenuItem>
              <MenuItem value='created_at'>Ngày tạo cũ nhất</MenuItem>
              <MenuItem value='-time_start'>Ngày đặt lịch mới nhất</MenuItem>
              <MenuItem value='time_start'>Ngày đặt lịch cũ nhất</MenuItem>
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
              onChange={e => handleQueryString('filter[platform]', e.target.value)}
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

export default AppointmentPage;