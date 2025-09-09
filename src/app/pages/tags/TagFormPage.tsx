/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, MenuItem, Select } from "@mui/material";
import { ResponseDetail } from "app/@types";
import { QR_KEY } from "app/common";
import { ConfirmAction, FileUpload, InitAlert, PermissionLayout, XSwitch } from "app/components";
import { AxiosInstance } from "app/configs";
import { ResGmupTag } from "app/interface";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { useParams } from "react-router-dom";
import './style.scss';
import TitlePage from "app/components/TitlePage";
import * as Yup from 'yup'
import { FILE_IMG_TYPE, formatDate } from "app/util";
import { KTSVG } from '../../../_metronic/helpers';
import moment from "moment";

const groups = ['ORGANIZATION', 'SERVICE'];

const useGetTagDetail = (id?: string, options?: UseQueryOptions<ResponseDetail<ResGmupTag>>) => {
  const query = useQuery({
    queryKey: [QR_KEY.GmupTagId, id],
    queryFn: () => AxiosInstance({ version: 'v4' })
      .get(`/tags/${id}`, { params: { 'include': 'media|children|children.media' } })
      .then<ResponseDetail<ResGmupTag>>(res => res.data),
    enabled: !!id,
    ...options
  });
  return query;
}

const TagFormPage: FC = () => {
  const id = useParams().id;
  const type = id ? 'EDIT' : 'CREATE';
  const [subTags, setSubTags] = useState<ResGmupTag[]>([]);
  const mutateSave = useMutation({
    mutationFn: async (payload: any) => {
      const responseTag = type == 'CREATE' ?
        await AxiosInstance({ version: 'v4' }).post(`/tags`, payload).then<ResponseDetail<ResGmupTag>>(res => res.data)
        :
        await AxiosInstance({ version: 'v4' }).put(`/tags/${id}`, payload).then<ResponseDetail<ResGmupTag>>(res => res.data);
      if (responseTag.context.id) {
        await Promise.all(subTags.map(async (subTag) => {
          if (subTag.id) {
            AxiosInstance({ version: 'v4' }).put(`/tags/${subTag.id}`, Object.assign(subTag, { parent_id: responseTag.context.id }));
          } else {
            AxiosInstance({ version: 'v4' }).post(`/tags`, Object.assign(subTag, { parent_id: responseTag.context.id }));
          }
          return;
        }));
      }
      return responseTag;
    },
    onSuccess: () => InitAlert.open({ title: 'Lưu thành công', type: 'success', }),
    onError: () => InitAlert.open({ title: 'Có lỗi xảy ra. Vui lòng thử lại', type: 'error' }),
  });
  useGetTagDetail(id, {
    onSuccess: (data) => {
      const context = data.context;
      if (context) {
        setFieldValue('name', context.name);
        setFieldValue('group', context.group);
        setFieldValue('priority', context.priority);
        setFieldValue('status', context.status);
        setSubTags(context.children);
        if (context.media.length > 0) {
          setFieldValue('media_id', context.media[0].model_id);
          setFieldValue('original_url', context.media[0].original_url);
        }
      }
    }
  });
  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      group: '',
      parent_id: '',
      priority: '',
      media_id: null,
      original_url: '',
      status: true
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('Vui lòng nhập nội dung'),
    }),
    onSubmit: (values) => {
      mutateSave.mutate(values);
    }
  })
  //[SUB_TAG]:
  const onAddSubTag = () => {
    setSubTags(prev => [...prev, {
      name: '', priority: 0, group: 'SERVICE', parent_id: null, status: true, children: [],
      created_at: moment().format('YYYY-DD-MM HH:mm:ss'), updated_at: moment().format('YYYY-DD-MM HH:mm:ss'), deleted_at: null, media: []
    }])
  }
  const onRemoveSubTag = (index: number, id?: number) => {
    ConfirmAction.open({
      callBack: () => {
        setSubTags(prev => prev.filter((_item, _index) => _index !== index));
        if (id) {
          AxiosInstance({ version: 'v4' }).delete(`/tags/${id}`)
        }
      }
    })
  }
  const onChangeSubTagValue = (index: number, key: string, value: any) => {
    setSubTags(prev => {
      const newSubTags = [...prev];
      newSubTags[index] = {
        ...newSubTags[index],
        [key]: value,
      };
      return newSubTags;
    });
  };
  return (
    <div className="card p-4">
      <TitlePage title={'Tag form'} />
      <form
        className='discount-form mb-10 container'
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <div className="col-6 d-flex flex-column">
          <label className='form-label'>Tag icon</label>
          <FileUpload
            types={FILE_IMG_TYPE}
            value={values.original_url}
            onUpdated={media => {
              setFieldValue('media_id', media.model_id);
              setFieldValue('original_url', media.original_url);
            }}
          />
        </div>
        <div className="col-12 d-flex gap-4 mt-6">
          <div className="wrap-item col-6 d-flex flex-column">
            <label className='form-label'>Trạng thái</label>
            <XSwitch label="" value={values.status} onChange={e => setFieldValue('status', e.target.checked)} />
          </div>
          <div className="wrap-item col-6 d-flex flex-column">
            <label className='form-label'>Độ ưu tiên</label>
            <input
              onChange={handleChange}
              value={values.priority}
              type='number'
              className='form-control'
              name='priority'
            />
          </div>
        </div>
        <div className="col-12 d-flex gap-4 mt-6">
          <div className="wrap-item col-6 d-flex flex-column">
            <label className='form-label'>Tên</label>
            <input
              onChange={handleChange}
              value={values.name}
              className='form-control'
              name='name'
            />
            {errors.name && touched.name && (
              <span className='text-danger d-block mt-2'>{errors.name}</span>
            )}
          </div>
          <div className="wrap-item col-6 d-flex flex-column">
            <label className='form-label'>Group</label>
            <FormControl sx={{ m: 1 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={values.group}
                onChange={handleChange}
                name="group"
              >
                {
                  groups.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-dark fw-bold fs-6">Subtag</p>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bold text-muted'>
                    <th className='min-w-150px'>Tag</th>
                    <th className='min-w-140px'>Độ ưu tiên</th>
                    <th className='min-w-140px'>Status</th>
                    <th className='min-w-120px'>Ngày tạo</th>
                    <th className='min-w-100px text-end'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    subTags?.map((tag, index) => (
                      <tr key={index}>
                        <td>
                          <div className='d-flex align-items-center'>
                            <input
                              value={tag.name}
                              onChange={e => onChangeSubTagValue(index, 'name', e.target.value)}
                              className='form-control'
                            />
                          </div>
                        </td>
                        <td>
                          <input
                            value={tag.priority}
                            onChange={e => onChangeSubTagValue(index, 'priority', e.target.value)}
                            type="number"
                            className='form-control'
                          />
                        </td>
                        <td>
                          <XSwitch label="" value={tag.status} onChange={e => onChangeSubTagValue(index, 'status', e.target.checked)} />
                        </td>
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
                            <PermissionLayout permissions={['v4.tags.destroy']}>
                              <button
                                onClick={() => onRemoveSubTag(index, tag.id)}
                                aria-label='Xóa'
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                type="button"
                              >
                                <KTSVG path='/media/icons/duotune/general/gen027.svg'
                                  className='svg-icon-3'
                                />
                              </button>
                            </PermissionLayout>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div className='d-flex flex-end gap-4 mt-10'>
                <button onClick={onAddSubTag} type="button" className="btn btn-primary btn-sm">Thêm subtag</button>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex flex-end gap-4 mt-10'>
          <button className='btn btn-success' type="submit" disabled={mutateSave.isLoading}>
            {mutateSave.isLoading ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TagFormPage;