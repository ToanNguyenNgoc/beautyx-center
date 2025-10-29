/* eslint-disable @typescript-eslint/no-explicit-any */
import { InitAlert, PermissionLayout } from "app/components";
import { FC } from "react";
import { useParams } from "react-router-dom";
import TitlePage from "app/components/TitlePage";
import { FileUploader } from "react-drag-drop-files";
import { LinearProgress } from "@mui/material";
import { usePostMedia } from "app/hooks";
import { useFormik } from "formik";
import { ReqBrandAppVersion } from "app/@types";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup"
import { useMutation } from "react-query";
import { Api } from "app/api";

const BrandAppVersionFromPage: FC = () => {
  const params = useParams();
  const os_platform = params?.os_platform || 'ios';
  const bundle_id = params?.bundle;
  const { isLoading: isLoadingMedia, handlePostMedia } = usePostMedia();
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: ReqBrandAppVersion) => Api.Admin.postBrandAppVersion(String(bundle_id), body),
    onSuccess: () => InitAlert.open({ title: 'Tạo mới thành công', type: 'success' }),
    onError: () => InitAlert.open({ title: 'Có lỗi xảy ra', type: 'error' })
  })
  const formik = useFormik<ReqBrandAppVersion>({
    initialValues: {
      version: '',
      os_platform,
      media_id: undefined,
      status: true
    },
    validationSchema: Yup.object({
      version: Yup.string().required("Nhập phiên bản"),
      media_id: Yup.number().required('upload file build'),
    }),
    onSubmit(values) {
      if (!bundle_id) return;
      mutate(values)
    },
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
        InitAlert.open({ title: 'Upload file thành công', type: 'success' })
        formik.setFieldValue('media_id', data[0]?.model_id)
      },
      version: 'myspa',
      resetOriginalResult: true
    })
  }
  return (
    <PermissionLayout permissions={['v1.brand_app_versions.store']} showEmpty>
      <TitlePage
        title={`Tạo mới build ${os_platform}`}
      />
      <div className="card p-4">
        <form
          onSubmit={formik.handleSubmit}
          noValidate className='form'
        >
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Phiên bản hiện tại trên Store</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <input
                    type='text'
                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                    placeholder='Phiên bản'
                    {...formik.getFieldProps('version')}
                  />
                  {formik.touched.version && formik.errors.version && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.version}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-4 col-form-label required fw-bold fs-6'>Build file</label>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-12 fv-row'>
                  <FileUploader
                    handleChange={handleChangeMedia} name="file" types={['zip']}
                  />
                  {
                    isLoadingMedia &&
                    <div style={{
                      marginTop: 8
                    }}>
                      <LinearProgress />
                    </div>
                  }
                  {formik.touched.media_id && formik.errors.media_id && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.media_id}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <LoadingButton loading={isLoading} size='large' color='success' type='submit' variant='contained' >
              Tạo mới
            </LoadingButton>
          </div>
        </form>
      </div>
    </PermissionLayout>
  )
}

export default BrandAppVersionFromPage