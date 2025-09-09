/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReqTrend, ResponseDetail } from "app/@types";
import { TrendApi } from "app/api/trendApi";
import { QR_KEY } from "app/common";
import { FileUpload, InitAlert, PermissionLayout, SelectionDiscounts, SelectionOrg, XSwitch } from "app/components";
import TitlePage from "app/components/TitlePage";
import { useRootContext } from "app/hooks";
import { ResTrend } from "app/interface/trend";
import { FILE_IMG_TYPE, FILE_VIDEO_TYPE, PLAT_FORM } from "app/util";
import { useFormik } from "formik";
import { FC } from "react";
import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { useParams } from "react-router-dom";
import * as Yup from 'yup'

interface RequestBody extends ReqTrend {
  media_url?: string;
  media_thumbnail_url?: string;
  discounts: any[];
  organization: any;
}

const useGetTrendDetail = (id?: string, options?: UseQueryOptions<ResponseDetail<ResTrend>>) => {
  const query = useQuery({
    queryKey: [QR_KEY.TrendId],
    queryFn: () => TrendApi.getById(Number(id), { 'include': 'organization|productables|discounts', 'append': 'media_url|media_thumbnail_url' }),
    enabled: !!id,
    ...options
  });
  return query
}

const MediaFormPage: FC = () => {
  const id = useParams().id;
  const { isBeautyxSite } = useRootContext();
  const type = id ? 'EDIT' : 'CREATE';
  useGetTrendDetail(id, {
    onSuccess: (data) => {
      const context = data.context;
      if (context) {
        setFieldValue('title', context.title);
        setFieldValue('content', context.content);
        setFieldValue('media_url', context.media_url);
        setFieldValue('media_thumbnail_url', context.media_thumbnail_url);
        setFieldValue('organization_id', context.organization_id);
        setFieldValue('organization', context.organization);
        setFieldValue('discounts', context.discounts);
        setFieldValue('status', context.status);
      }
    }
  });

  const mutateSave = useMutation({
    mutationFn: (body: ReqTrend) => {
      return type == 'EDIT' ? TrendApi.update(Number(id), body) : TrendApi.post(body)
    },
    onSuccess: () => InitAlert.open({ title: 'Lưu thành công', type: 'success', }),
    onError: () => InitAlert.open({ title: 'Có lỗi xảy ra. Vui lòng thử lại', type: 'error' }),
  });

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } = useFormik<RequestBody>({
    initialValues: {
      title: '',
      content: '',
      media_id: undefined, media_url: undefined,
      media_thumbnail_id: undefined, media_thumbnail_url: undefined,
      organization: null,
      discounts: [],
      status: true,
    },
    validationSchema: Yup.object({
      title: Yup.string().trim().required('Vui lòng nhập nội dung'),
    }),
    onSubmit: (values) => {
      mutateSave.mutate({...values, discounts: values.discounts.map(i => i.id)})
    }
  });

  const onChangeOrg = (org: any) => {
    if (org?.id !== values.organization_id) {
      setFieldValue('organization_id', org?.id);
      setFieldValue('organization', org);
      setFieldValue('discounts', []);
    }
  };

  return (
    <PermissionLayout permissions={type == 'EDIT' ? ['v1.trends.update'] : ['v1.trends.store']} showEmpty>
      <div className="card p-4">
        <TitlePage title={'Trend form'} />
        <form className="discount-form mb-10 container" autoComplete='off' onSubmit={handleSubmit}>
          <div className="col-12 d-flex gap-4 mt-6">
            <div className="wrap-item col-6 d-flex flex-column">
              <label className='form-label'>Trạng thái</label>
              <XSwitch label="" value={values.status} onChange={e => setFieldValue('status', e.target.checked)} />
            </div>
          </div>
          <div className="col-12 d-flex gap-4 mt-6">
            <div className="wrap-item col-6 d-flex flex-column">
              <label className='form-label'>Thumbnail</label>
              <FileUpload
                style={{ width: 200, aspectRatio: 9 / 16, height: 'unset' }}
                types={FILE_IMG_TYPE}
                value={values.media_thumbnail_url}
                onUpdated={media => {
                  setFieldValue('media_thumbnail_id', media.model_id);
                  setFieldValue('media_thumbnail_url', media.original_url);
                }}
              />
            </div>
            <div className="wrap-item col-6 d-flex flex-column">
              <label className='form-label'>Video</label>
              <FileUpload
                style={{ width: 200, aspectRatio: 9 / 16, height: 'unset' }}
                mediaType="VIDEO"
                types={FILE_VIDEO_TYPE}
                value={values.media_url}
                onUpdated={media => {
                  setFieldValue('media_id', media.model_id);
                  setFieldValue('media_url', media.original_url);
                }}
              />
            </div>
          </div>
          <div className="col-12 d-flex gap-4 mt-6">
            <div className="wrap-item col-6 d-flex flex-column">
              <label className='form-label'>Tiêu đề</label>
              <input
                onChange={handleChange}
                value={values.title}
                className='form-control'
                name='title'
              />
              {errors.title && touched.title && (
                <span className='text-danger d-block mt-2'>{errors.title}</span>
              )}
            </div>
            <div className="wrap-item col-6 d-flex flex-column">
              <label className='form-label'>Nội dung</label>
              <input
                onChange={handleChange}
                value={values.content}
                className='form-control'
                name='content'
              />
              {errors.content && touched.content && (
                <span className='text-danger d-block mt-2'>{errors.content}</span>
              )}
            </div>
          </div>
          <div className="col-12 d-flex gap-4 mt-6">
            <SelectionOrg
              organization_id={values.organization_id} origin={values.organization}
              setOrigin={e => onChangeOrg(e)}
            />
          </div>
          <div className="col-12 d-flex gap-4 mt-6">
            <SelectionDiscounts
              label={isBeautyxSite ? undefined : 'Gắn dịch vụ GMUP'}
              organization_id={values.organization_id}
              platform={isBeautyxSite ? undefined : PLAT_FORM.GMUP}
              filterAll={false}
              discounts={values.discounts}
              onChangeDiscounts={(e) => setFieldValue('discounts', e)}
            />
          </div>
          <div className='d-flex flex-end gap-4 mt-10'>
            <button className='btn btn-success' type="submit" disabled={false}>
              Lưu
            </button>
          </div>
        </form>
      </div>
    </PermissionLayout>
  )
}

export default MediaFormPage;