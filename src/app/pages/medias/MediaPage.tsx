/* eslint-disable react-hooks/exhaustive-deps */
import { QrTrend } from "app/@types";
import { ConfirmAction, InitAlert, PageCircularProgress, PermissionLayout, XPagination, XSwitch } from "app/components";
import TitlePage from "app/components/TitlePage";
import { FC, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { QR_KEY } from "app/common";
import { TrendApi } from "app/api/trendApi";
import { ResTrend } from "app/interface/trend";
import { KTSVG } from '../../../_metronic/helpers';
import { formatDate } from "app/util";
import { useQueryParams } from "app/hooks";
import { debounce } from 'lodash';

const MediaPage: FC = () => {
  const { query, handleQueryString } = useQueryParams<QrTrend>()
  const { data, refetch, isLoading } = useQuery({
    queryKey: [QR_KEY.Trend, query],
    queryFn: () => TrendApi.get({
      page: query?.page ?? 1,
      limit: 15,
      "append": "media_url|media_thumbnail_url",
      "include": "organization",
      "filter[status]": query["filter[status]"],
      "filter[organization_id]": query["filter[organization_id]"],
      "sort": query.sort ?? '-created_at'
    })
  });
  const trends = data?.context.data || [];
  const onDelete = (id: number) => {
    return ConfirmAction.open({
      callBack: () => TrendApi.delete(id)
        .then(() => { InitAlert.open({ title: 'Xóa thành công' }); refetch() })
        .catch(() => InitAlert.open({ title: 'Có lỗi xảy ra. Vui lòng thử lại', type: 'error' }))
    })
  }
  return (
    <div>
      <TitlePage
        element={
          <PermissionLayout permissions={['v1.trends.store']}>
            <Link to={{ pathname: '/pages/medias-form' }} className='btn btn-sm btn-primary'>
              Tạo mới
            </Link>
          </PermissionLayout>
        }
        title='Danh sách'
      />
      <div className={`card`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Trends</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>Over {data?.context?.total || 0}</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-50px'>Độ ưu tiên</th>
                  <th className='min-w-150px'>Thumbnail & Tiêu đề</th>
                  <th className='min-w-140px'>Doanh nghiệp</th>
                  <th className='min-w-120px'>Trạng thái</th>
                  <th className='min-w-120px'>Ngày tạo</th>
                  <th className='min-w-120px'>Ngày cập nhật</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  trends.map(trend => (
                    <Row key={trend.id} trend={trend} onDelete={() => onDelete(trend.id)} />
                  ))
                }
              </tbody>
            </table>
            <PageCircularProgress loading={isLoading} />
            <XPagination
              totalPage={data?.context.last_page ?? 1}
              onChangePage={page => handleQueryString('page', page)}
              defaultPage={query.page}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

const Row: FC<{ trend: ResTrend, onDelete?: () => void }> = ({ trend, onDelete }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(trend.status);
  const [priority, setPriority] = useState(trend.priority);
  const onChange = useCallback((debounce((text: number) => TrendApi.update(trend.id, { priority: text }), 1000)), []);
  const onChangeStatus = (e: boolean) => {
    setStatus(e);
    TrendApi.update(trend.id, { status: e })
      .then(() => InitAlert.open({ title: 'Lưu thành công', type: 'success' }))
      .catch(() => { InitAlert.open({ title: 'Có lỗi xảy ra. Vui lòng thử lại', type: 'error' }); setStatus(trend.status) });
  };
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center justify-content-center'>
          <div className='d-flex justify-content-start flex-column'>
            <input
              onChange={(e) => { onChange(Number(e.target.value)); setPriority(Number(e.target.value)) }}
              value={priority}
              type='number'
              className='form-control'
              name='priority'
            />
          </div>
        </div>
      </td>
      <td>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-100px me-5'>
            <img src={trend.media_thumbnail_url} alt='' />
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <span className='text-dark fw-bold text-hover-primary fs-6'>
              {trend.title}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
          {trend.organization?.name}
        </span>
      </td>
      <td className='text-start'>
        <XSwitch value={status} label="" onChange={e => onChangeStatus(e.target.checked)} />
      </td>
      <td className='text-end'>
        <div className='d-flex flex-column w-100 me-2'>
          <div className='d-flex flex-stack mb-2'>
            <span className='text-muted me-2 fs-7 fw-semobold'>
              {formatDate(trend.created_at, 'DD/MM/YYYY HH:mm')}
            </span>
          </div>
        </div>
      </td>
      <td className='text-end'>
        <div className='d-flex flex-column w-100 me-2'>
          <div className='d-flex flex-stack mb-2'>
            <span className='text-muted me-2 fs-7 fw-semobold'>
              {formatDate(trend.updated_at, 'DD/MM/YYYY HH:mm')}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className='d-flex justify-content-end flex-shrink-0'>
          <PermissionLayout permissions={['v1.trends.update']}>
            <button
              onClick={() => navigate(`/pages/medias-form/${trend.id}`)}
              aria-label='Xem chi tiết'
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
          </PermissionLayout>
          <PermissionLayout permissions={['v1.trends.destroy']}>
            <button
              aria-label='Xóa'
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              onClick={onDelete}
            >
              <KTSVG path='/media/icons/duotune/general/gen027.svg'
                className='svg-icon-3'
              />
            </button>
          </PermissionLayout>
        </div>
      </td>
    </tr>
  )
}

export default MediaPage;