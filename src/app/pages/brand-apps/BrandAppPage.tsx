/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Dialog } from "@mui/material";
import { QrBrandApp, ReqBrandApp, ResponseList } from "app/@types";
import { QR_KEY } from "app/common";
import { ButtonUpload, ConfirmAction, InitAlert, PageCircularProgress, PermissionLayout, XPagination, XSwitch } from "app/components";
import TitlePage from "app/components/TitlePage";
import { useGetRolesAndPermissions, usePostMedia, useQueryParams } from "app/hooks";
import { IBrandApp } from "app/interface";
import { formatDate } from "app/util";
import { FC, memo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { KTSVG } from "../../../_metronic/helpers";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import { Api } from "app/api";

const BrandAppPage: FC = () => {
  const { hasEnabled } = useGetRolesAndPermissions()
  const { query, handleQueryString } = useQueryParams<QrBrandApp>()
  const { data, isLoading, refetch } = useQuery<{ context: ResponseList<IBrandApp[]> }>({
    queryKey: [QR_KEY.BrandApps, query],
    queryFn: () => Api.Admin.getBrandApps(Object.assign(query, { sort: '-created_at', append: 'media_url' })),
    enabled: hasEnabled('v1.brand_apps.index')
  })
  const brandApps = data?.context.data || []
  const [brandAppId, setBrandAppId] = useState<number>()

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id: number) => Api.Admin.deleteBrandApp(id),
    onSuccess: () => {
      InitAlert.open({ title: 'Xóa thành công', type: 'success' });
      refetch()
    },
    onError: () => InitAlert.open({ title: 'Có lỗi xảy ra', type: 'error' })
  })
  const onDeleteApp = (id: number) => {
    ConfirmAction.open({
      message: 'Xóa tài app thương hiệu ?',
      callBack: () => mutateDelete(id)
    })
  }

  return (
    <PermissionLayout permissions={['v1.brand_apps.index']} showEmpty>
      <TitlePage
        element={
          <PermissionLayout permissions={['v1.brand_apps.store']}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setBrandAppId(0)}
            >
              Tạo mới
            </Button>
          </PermissionLayout>
        }
        title="Danh sách App thương hiệu"
      />
      <div className="card">
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Tên app</th>
                  <th className='min-w-140px'>Bundle</th>
                  <th className='min-w-120px'>Ngày tạo</th>
                  <th className='min-w-120px'>Trạng thái</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  brandApps.map((item) => (
                    <Item
                      key={item.id}
                      item={item}
                      onClickEdit={() => setBrandAppId(item.id)}
                      onDelete={() => onDeleteApp(item.id)}
                    />
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
      <BrandAppForm brandAppId={brandAppId} onClose={() => setBrandAppId(undefined)} refetch={refetch} />
    </PermissionLayout>
  )
}

interface ItemProps {
  item: IBrandApp,
  onDelete?: () => void,
  onClickEdit?: () => void
}

const Item: FC<ItemProps> = ({ item, onDelete = () => null, onClickEdit = () => null }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(item.status);
  const { mutate } = useMutation({
    mutationFn: (status: boolean) => Api.Admin.putBrandApp(item.id, { status }),
    onSuccess: () => InitAlert.open({ title: 'Lưu thành công', type: 'success' }),
    onError: () => {
      InitAlert.open({ title: 'Có lỗi xảy ra', type: 'error' });
      setActive(item.status)
    }
  })
  const onChangeStatus = async (status: boolean) => {
    setActive(status);
    mutate(status);
  }
  return (
    <tr key={item.id}>
      <td>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-45px me-5'>
            <Avatar src={item.media_url || ''} alt={item.name} />
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <span className='text-dark fw-bold fs-6'>
              {item.name}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
          {item.bundle_id}
        </span>
      </td>
      <td>
        <span className='text-muted fw-semobold text-muted d-block fs-7'>
          {formatDate(item.created_at)}
        </span>
      </td>
      <td>
        <XSwitch value={active} label="" onChange={e => onChangeStatus(e.target.checked)} />
      </td>
      <td className="d-flex justify-content-end">
        <button
          onClick={() => navigate(`/pages/brand-apps/${item.bundle_id}/ios`)}
          aria-label='Phiên bản'
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        >
          <KTSVG path='/media/icons/duotune/files/fil013.svg' className='svg-icon-3' />
        </button>
        <PermissionLayout permissions={['v1.brand_apps.show', 'v1.brand_apps.update']}>
          <button
            onClick={onClickEdit}
            aria-label='Xem chi tiết'
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </button>
        </PermissionLayout>
        <PermissionLayout permissions={['v1.brand_apps.destroy']}>
          <button
            onClick={onDelete}
            aria-label='Xóa'
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

const BrandAppForm: FC<{ brandAppId?: number, onClose?: () => void, refetch?: () => void }> = memo(({
  brandAppId,
  onClose = () => null,
  refetch = () => null
}) => {
  const type = (brandAppId && brandAppId !== 0) ? 'put' : 'post';
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: ReqBrandApp) => type === 'post' ? Api.Admin.postBrandApp(body) : Api.Admin.putBrandApp((Number(brandAppId)), body),
    onSuccess: () => {
      InitAlert.open({ title: 'Lưu thành công', type: 'success' });
      refetch();
      onClose();
    },
    onError: () => InitAlert.open({ title: 'Có lỗi xảy ra', type: 'error' })
  })
  const { handlePostMedia } = usePostMedia();
  const formik = useFormik<ReqBrandApp & { media_url: string | null }>({
    initialValues: {
      name: '',
      status: true,
      bundle_id: '',
      media_id: undefined,
      media_url: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên app thương hiệu"),
      bundle_id: Yup.string().required("Nhập Bundle ID"),
      media_id: Yup.number().required('Upload app icon'),
    }),
    onSubmit(values) {
      if (type === 'post') {
        mutate(values)
      } else {
        mutate({
          ...values,
          media_id: dataDetail?.context.media_url === values.media_url ? undefined : values.media_id,
          bundle_id: dataDetail?.context.bundle_id === values.bundle_id ? undefined : values.name
        })
      }
    },
  })
  const { data: dataDetail } = useQuery<{ context: IBrandApp }>({
    queryKey: [QR_KEY.BrandApps, brandAppId],
    queryFn: () => Api.Admin.getBrandApp(Number(brandAppId)),
    enabled: type === 'put',
    onSuccess: (data) => {
      if (data.context) {
        formik.setValues(data.context)
        if (data.context.media.length > 0) {
          formik.setFieldValue('media_id', data.context.media[0].model_id)
        }
      }
    }
  })
  const handleChangeMedia = (file: File) => {
    const eF: any = {
      target: {
        files: [file]
      }
    }
    handlePostMedia({
      e: eF,
      callBack(data) {
        formik.setFieldValue('media_id', data[0]?.model_id);
        formik.setFieldValue('media_url', data[0]?.original_url);
      },
      version: 'myspa',
      resetOriginalResult: true
    })
  }
  return (
    <Dialog open={brandAppId !== undefined} onClose={() => { onClose(); formik.resetForm(); }}>
      <div className="card p-5" style={{ width: '65vw' }}>
        <form
          onSubmit={formik.handleSubmit}
          noValidate className='form'
        >
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>App icon</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <div className="d-flex flex-column align-items-center" style={{ width: 'fit-content' }}>
                    <Avatar src={formik.values.media_url || ''} sx={{ width: 84, height: 84 }} />
                    <div className="mt-4">
                      <ButtonUpload onChangeFile={e => handleChangeMedia(e[0])} />
                    </div>
                  </div>
                  {formik.touched.media_id && formik.errors.media_id && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.media_id}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Tên app thương hiệu</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Tên app thương hiệu'
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.name}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Bundle ID</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Bundle ID'
                    {...formik.getFieldProps('bundle_id')}
                  />
                  {formik.touched.bundle_id && formik.errors.bundle_id && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.bundle_id}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <LoadingButton loading={isLoading} size='large' color='success' type='submit' variant='contained' >
              Lưu
            </LoadingButton>
          </div>
        </form>
      </div>
    </Dialog>
  )
})

export default BrandAppPage