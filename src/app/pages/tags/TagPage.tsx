import { QrGmupTag, } from "app/@types";
import { ConfirmAction, InitAlert, PermissionLayout, XSwitch } from "app/components";
import TitlePage from "app/components/TitlePage";
import { Link, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { AxiosInstance } from "app/configs";
import { ResGmupTag } from "app/interface";
import { formatDate } from "app/util";
import { KTSVG } from '../../../_metronic/helpers';
import { FC, useState } from "react";
import { useGetGmupTags } from "app/hooks";

const TagPage = () => {
  const query = queryString.parse(location.search) as QrGmupTag;

  const { data, refetch } = useGetGmupTags({
    page: query?.page ?? 1,
    limit: 15,
    'filter[is_root]': true,
    'include': 'media',
    'sort': query.sort ? query.sort : '-created_at'
  })

  const onDeleteTag = (id: number) => {
    return ConfirmAction.open({
      callBack: () => AxiosInstance({ version: 'v4' })
        .delete(`/tags/${id}`)
        .then(() => { InitAlert.open({ title: 'Xóa thành công' }); refetch() })
        .catch(() => InitAlert.open({ title: 'Có lỗi xảy ra. Vui lòng thử lại', type: 'error' }))
    })
  }

  return (
    <div>
      <TitlePage
        element={
          <PermissionLayout permissions={['v4.tags.store']}>
            <Link to={{ pathname: '/pages/tags-form' }} className='btn btn-sm btn-primary'>
              Tạo mới
            </Link>
          </PermissionLayout>
        }
        title='Danh sách'
      />
      <div className={`card`}>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Tags</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Tag</th>
                  <th className='min-w-140px'>Độ ưu tiên</th>
                  <PermissionLayout permissions={['v4.tags.update']} ><th className='min-w-140px'>Status</th></PermissionLayout>
                  <th className='min-w-120px'>Ngày tạo</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.context.data?.map(tag => (
                    <Row key={tag.id} tag={tag} onDeleteTag={() => onDeleteTag(Number(tag.id))} />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const Row: FC<{ tag: ResGmupTag, onDeleteTag?: () => void }> = ({ tag, onDeleteTag }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(tag.status);
  const onChangeStatus = (e: boolean) => {
    setStatus(e)
    return AxiosInstance({ version: 'v4' })
      .put(`/tags/${tag.id}`, { status: e })
      .then(() => InitAlert.open({ title: 'Lưu thành công', type: 'success', }))
      .catch(() => { InitAlert.open({ title: 'Có lỗi xảy ra. Vui lòng thử lại', type: 'error' }); setStatus(tag.status) })
  }
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center'>
          {
            tag.media.length > 0 &&
            <div className='symbol symbol-45px me-5'>
              <div className='symbol symbol-45px me-5'>
                <img src={tag.media[0].original_url} alt='' />
              </div>
            </div>
          }
          <div className='d-flex justify-content-start flex-column'>
            <span className='text-dark fw-bold fs-6'>
              {tag.name}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
          {tag.priority}
        </span>
      </td>
      <PermissionLayout permissions={['v4.tags.update']}>
        <td>
          <XSwitch value={status} onChange={e => onChangeStatus(e.target.checked)} label="" />
        </td>
      </PermissionLayout>
      <td className='text-end'>
        <div className='d-flex flex-column w-100 me-2'>
          <div className='d-flex flex-stack mb-2'>
            <span className='text-muted me-2 fs-7 fw-semobold'>
              {formatDate(tag.created_at, 'DD/MM/YYYY HH:mm')}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-end flex-shrink-0 tb-control">
          <PermissionLayout permissions={['v4.tags.update']}>
            <button
              onClick={() => navigate(`/pages/tags-form/${tag.id}`)}
              aria-label='Xem chi tiết'
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
            </button>
          </PermissionLayout>
          <PermissionLayout permissions={['v4.tags.destroy']}>
            <button
              aria-label='Xóa'
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
              onClick={onDeleteTag}
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

export default TagPage;