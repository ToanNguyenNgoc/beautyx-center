/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import TitlePage from "app/components/TitlePage";
import "./form.scss"
import { useFormik } from "formik";
import { MenuItem, Select } from "@mui/material";
//@ts-ignore
import { IMGS } from "../../../../_metronic/assets/imgs/imgs";
import { LoadingButton } from "@mui/lab";
import { NOTI_TYPES, PLAT_FORM, TYPE, dev, getEnvParam } from "app/util";
import * as yup from "yup"
import { useMutation } from "react-query";
import { ReqPostNotification } from "app/@types";
import { notificationApi } from "app/api";
import { useMessage } from "app/hooks";
import { AxiosError } from "axios";
import { AppSnack, PermissionLayout, SelectPromotion, SelectionDiscounts, SelectionOrg } from "app/components";
import { useState } from "react";
import { IDiscountPar, IOrganization } from "app/interface";
import { request3rdApi } from "app/api/api-3rd-client";

function PushNotificationForm() {
  const { resultLoad, noti, onCloseNoti } = useMessage()
  const [org, setOrg] = useState<IOrganization>()
  const [discount, setDiscount] = useState<IDiscountPar>()
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: ReqPostNotification) => getEnvParam() === dev ?
      request3rdApi.postNotification(body)
      :
      notificationApi.post(body),
    onSuccess: () => resultLoad({
      message: 'Push thông báo thành công',
      color: 'success'
    }),
    onError: (errors: any) => {
      const err = errors as AxiosError
      resultLoad({
        color: 'error',
        message: `Có lỗi xảy ra. Mã lỗi ${err?.request?.status}`
      })
    }
  })
  const { values, errors, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      description: '',
      type: '',
      link: '',
      payload_id: ''
    },
    validationSchema: yup.object({
      title: yup.string().required('Nhập tiêu đền'),
      description: yup.string().required('Nhập nội dung'),
      type: yup.string().required('Chọn loại thông báo cho'),
      link: yup.string().required('NHập đường dẫn')
    }),
    onSubmit: (values) => {
      let payload_id = values.payload_id
      if (Number(values.type) === TYPE.ORG.id && org) payload_id = String(org?.id)
      if (Number(values.type) === TYPE.DISCOUNT.id && discount) payload_id = discount.uuid
      mutate({ ...values, payload_id })
    }
  })
  return (
    <PermissionLayout permissions={['v1.beautyx.notification.sendNotification']} showEmpty>
      <TitlePage title="Thông báo" />
      <AppSnack
        severity={noti.color}
        message={noti.message}
        open={noti.openAlert}
        close={onCloseNoti}
      />
      <div className='post d-flex flex-column-fluid' id="kt_post">
        <div className="notification-cnt">
          <form onSubmit={handleSubmit} className="form-left">
            <div className="column">
              <div className="required form-label">Tiêu đề</div>
              <input
                value={values.title}
                onChange={handleChange}
                type="text"
                name="title"
                className="form-control form-control-solid mt-1 mb-4"
              />
              {
                errors.title && touched.title &&
                <span className="text-danger">{errors.title}</span>
              }
            </div>
            <div className="column">
              <div className="required form-label">Nội dung thông báo</div>
              <input
                value={values.description}
                onChange={handleChange}
                type="text"
                name="description"
                className="form-control form-control-solid mt-1 mb-4"
              />
              {
                errors.description && touched.description &&
                <span className="text-danger">{errors.description}</span>
              }
            </div>
            <div className="column mb-4">
              <div className="required form-label">Thông báo cho</div>
              <Select
                size="small"
                name="type"
                value={values.type}
                onChange={handleChange}
              >
                {
                  NOTI_TYPES.map(i => (
                    <MenuItem key={i.id} value={String(i.id)}>{i.title}</MenuItem>
                  ))
                }
              </Select>
              {
                errors.type && touched.type &&
                <span className="text-danger">{errors.type}</span>
              }
            </div>
            <>
              {
                Number(values.type) === TYPE.ORG.id &&
                <div className="column">
                  <SelectionOrg
                    organization_id={values.payload_id}
                    origin={org}
                    setOrigin={setOrg}
                  />
                </div>
              }
              {
                Number(values.type) === TYPE.PROMOTION.id &&
                <div className="column">
                  <SelectPromotion
                    value={values.payload_id}
                    onChange={(id) => setFieldValue('payload_id', String(id))}
                  />
                </div>
              }
              {
                Number(values.type) === TYPE.DISCOUNT.id &&
                <div className="column">
                  <SelectionDiscounts
                    label="Gắn deal giảm giá"
                    onChangeDiscounts={(i) => setDiscount(i[i.length - 1])}
                    filterAll={false}
                    platform={PLAT_FORM.MOMO}
                    discounts={discount ? [discount] : []}
                  />
                </div>
              }
            </>
            <div className="column">
              <div className="required form-label">Đường dẫn</div>
              <input
                value={values.link}
                onChange={handleChange}
                type="text"
                name="link"
                className="form-control form-control-solid mt-1 mb-4"
              />
              {
                errors.link && touched.link &&
                <span className="text-danger">{errors.link}</span>
              }
            </div>
            <div className="d-flex justify-content-end mt-6">
              <LoadingButton type="submit" variant="contained" color="success" loading={isLoading} >
                Push thông báo
              </LoadingButton>
            </div>
          </form>
          <div className="preview-right">
            <span className="title">Giao diện thông báo</span>
            <div className="device-cnt">
              <div className="device">
                <img className="device-img" src={IMGS.android} alt="" />
                <div className="device-noti">
                  <div className="item">
                    <div className="item-icon">
                      <img src={IMGS.beautyxIcon} alt="" />
                    </div>
                    <div className="item-right">
                      <p className="item-right-title">{values.title}</p>
                      <p className="item-right-content">{values.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="device-cnt">
              <div className="device">
                <img className="device-img" src={IMGS.iphone} alt="" />
                <div className="device-noti" style={{ marginTop: '50px' }}>
                  <div className="item">
                    <div className="item-icon">
                      <img src={IMGS.beautyxIcon} alt="" />
                    </div>
                    <div className="item-right">
                      <p className="item-right-title">{values.title}</p>
                      <p className="item-right-content">{values.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PermissionLayout>
  );
}

export default PushNotificationForm;