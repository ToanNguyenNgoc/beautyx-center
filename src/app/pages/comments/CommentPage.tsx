import { InitAlert, PageCircularProgress, PermissionLayout, XPagination, XSwitch } from "app/components";
import TitlePage from "app/components/TitlePage";
import { FC, useState } from "react";
import { KTSVG } from "../../../_metronic/helpers";
import { useDebounce, useGetComments, useQueryParams } from "app/hooks";
import { QrComment } from "app/@types";
import { ResComment } from "app/interface";
import { AxiosInstance } from "app/configs";
import { formatDate, slugify } from "app/util";

const hostEcommerce = import.meta.env.VITE_REACT_APP_HOST_ECOMMERCE;

const CommentPage: FC = () => {
  const { query, handleQueryString } = useQueryParams<QrComment>();
  const filter_user = useDebounce(query["filter[user]"] || '', 800);
  const filter_body = useDebounce(query["filter[body]"] || '', 800);
  const { comments, data, isLoading } = useGetComments({
    'include': 'organization|rate',
    'append': 'media_url|productable',
    'sort': '-created_at',
    'limit': 15,
    'page': query.page,
    'filter[user]': filter_user,
    'filter[body]': filter_body,
  });
  return (
    <PermissionLayout permissions={['v1.admin.comments.index']} showEmpty>
      <TitlePage
        title={`Danh sách phản hồi`}
      />
      <div className={`card`}>
        <div className='p-8'>
          <Filter query={query} handleQueryString={handleQueryString} />
        </div>
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Phản hồi</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>{data?.context.total} phản hồi</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-50px'>Id</th>
                  <th className='min-w-140px'>Khách hàng</th>
                  <th className='min-w-150px'>Nội dung bình luận</th>
                  <th className='min-w-120px'>Doanh nghiệp</th>
                  <th className='min-w-120px'>Dịch vụ / Sản phầm</th>
                  <th className='min-w-100px'>Hiển thị</th>
                  <th className='min-w-120px'>Hiển thị hình ảnh</th>
                  <th className='min-w-120px'>Đánh giá</th>
                  <th className='min-w-120px'>Ngày tạo</th>
                  <th className='min-w-120px'>Link</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  comments.map(comment => (
                    <Row
                      key={comment.id}
                      comment={comment}
                    />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        <PageCircularProgress loading={isLoading} />
        <div className='mt-5'>
          <XPagination
            totalPage={data?.context.last_page || 1}
            onChangePage={page => handleQueryString('page', page)}
            defaultPage={query.page}
          />
        </div>
      </div>
    </PermissionLayout>
  )
}

const Row: FC<{ comment: ResComment }> = ({ comment }) => {
  const [form, setForm] = useState({ status: comment.status, has_media: comment.has_media });
  const onChangeForm = (key: keyof ResComment, value: boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
    AxiosInstance().put(`/admin/comments/${comment.id}`, { [key]: value })
      .then(() => InitAlert.open({ title: 'Lưu thành công', type: 'success', }))
      .catch(() => {
        InitAlert.open({ title: 'Có lỗi xảy ra. Vui lòng thử lại', type: 'error' });
        setForm(prev => ({ ...prev, [key]: comment[key] }))
      })
  };
  const onNavigateEcommerce = () => {
    console.log(comment);
    if (!comment.organization?.id) return;
    switch (comment.commentable_type) {
      case "App\\Models\\CI\\Organization":
        window.open(`${hostEcommerce}/cua-hang/${comment.organization?.subdomain}`, '_blank');
        break;
      case "App\\Models\\CI\\Service":
        if (!comment.productable?.id) return;
        window.open(`${hostEcommerce}/dich-vu/${comment.productable.id}_${comment.organization_id}-${slugify(comment.productable.service_name)}#cmt`, '_blank');
        // console.log(`${hostEcommerce}/dich-vu/${comment.productable.id}_${comment.organization_id}-${slugify(comment.productable.service_name)}`)
        break;
      case "App\\Models\\Order":
        if (!comment.productable?.id) return;
        window.open(`${hostEcommerce}/dich-vu/${comment.productable.id}_${comment.organization_id}-${slugify(comment.productable.service_name)}#cmt`, '_blank');
        break;
      default:
        break;
    }
  };
  return (
    <tr key={comment.id}>
      <td>
        <span className='text-dark fw-bold text-hover-primary fs-6'>
          # - {comment.id}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
          {comment.user?.fullname}
        </span>
      </td>
      <td>
        <span className='text-muted fw-semobold text-muted d-block fs-6'>{comment.body}</span>
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
          {comment.organization?.name}
        </span>
      </td>
      <td className='text-dark fw-bold text-hover-primary fs-6'>{comment.productable?.service_name}</td>
      <td>
        <XSwitch value={form.status} onChange={e => onChangeForm('status', e.target.checked)} label="" />
      </td>
      <td>
        <XSwitch value={form.has_media} onChange={e => onChangeForm('has_media', e.target.checked)} label="" />
      </td>
       <td>
        {comment.rate?.point && `${comment.rate?.point} ⭐`}
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
          {formatDate(comment.created_at, 'DD/MM/YYYY HH:mm')}
        </span>
      </td>
      <td>
        <span onClick={onNavigateEcommerce} className='badge badge-light-success'>Link</span>
      </td>
      <td className='text-end'>
        <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </a>
      </td>
    </tr>
  )
}

const Filter: FC<{ query: QrComment, handleQueryString: <TF>(key: string, value: TF) => void }> = ({ query, handleQueryString }) => {
  return (
    <div>
      <div className="d-flex gap-4">
        <input
          defaultValue={query["filter[user]"] || ''}
          value={query["filter[user]"]}
          onChange={e => handleQueryString('filter[user]', e.target.value)}
          className="form-control form-control-solid" placeholder='Tìm kiếm tên khách hàng...'
        />
        <input
          defaultValue={query["filter[body]"] || ''}
          value={query["filter[body]"]}
          onChange={e => handleQueryString('filter[body]', e.target.value)}
          className="form-control form-control-solid" placeholder='Tìm kiếm nội dung bình luận...'
        />
      </div>
    </div>
  )
}

export default CommentPage;