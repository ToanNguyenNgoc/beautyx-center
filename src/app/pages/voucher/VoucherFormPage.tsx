/* eslint-disable @typescript-eslint/no-explicit-any */
import TitlePage from "app/components/TitlePage";
import { FC } from "react";
import './voucher.style.scss'
import { AppSnack, XDateRangePicker, XSwitch } from "app/components";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { discountsApi } from "app/api";
import { useMutation } from "react-query";
import { ReqDiscountBody } from "app/@types";
import { useMessage } from "app/hooks";
import { useNavigate } from "react-router-dom";

const VoucherFormPage: FC = () => {
  const navigate = useNavigate()
  const { resultLoad, onCloseNoti, noti } = useMessage()
  const { mutate, isLoading } = useMutation<any, any, ReqDiscountBody>({
    mutationFn: body => discountsApi.postDiscount(body),
    onSuccess: () => {
      resultLoad({
        message: 'Tạo thành công',
        color: 'success'
      })
      setTimeout(() => navigate(-1), 2000)
    },
    onError: () => {
      resultLoad({
        message: 'Có lỗi xảy ra',
        color: 'error'
      })
    },
  })
  const formik = useFormik({
    initialValues: {
      title: '',
      coupon_code: '',
      description: '',
      discount_value: '',
      total: '',
      valid_from: moment().format('YYYY-MM-DD HH:mm:ss'),
      valid_util: moment().format('YYYY-MM-DD HH:mm:ss'),
      limit:''
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Vui lòng nhập tên chương trình khuyến mại"),
      coupon_code: Yup.string().required("Vui lòng nhập Mã giảm giá"),
      description: Yup.string().required("Vui lòng nhập mô tả chương trình khuyến mại"),
      discount_value: Yup.number().min(1000, 'Giá trị giảm lớn hơn 1000').required("Vui lòng nhập giá trị giảm"),
      total: Yup.number().min(0, 'Số lượng mã tối đa 4000 mã')
        .max(4000, 'Số lượng mã tối đa 4000 mã')
        .required('Vui lòng nhập số lượng mã'),
      limit:Yup.number().min(1, 'Lượt sử dụng mỗi khách lớn hơn 1')
    }),
    onSubmit: (values) => {
      const { title, coupon_code, description, discount_value, total, valid_from, valid_util, limit } = values
      mutate({
        title,
        coupon_code,
        description,
        platform: 'BEAUTYX',
        discount_type: 'SUB_TOTAL',
        discount_unit: 'PRICE',
        is_campaign: 1,
        valid_from,
        valid_util,
        discount_value,
        total: Number(total),
        minimum_order_value: Number(discount_value),
        limit:Number(limit)
      })
    }
  })
  return (
    <>
      <AppSnack
        severity={noti.color}
        message={noti.message}
        open={noti.openAlert}
        close={onCloseNoti}
      />
      <TitlePage
        title="Tạo mới voucher"
      />
      <div className='post d-flex flex-column-fluid' id="kt_post">
        <div className="container">
          <form autoComplete="off" className="form" onSubmit={formik.handleSubmit}>
            <div className="flex-row-sp align-items-center input-wrap">
              <div className="wrap-item">
                <XSwitch
                  value={true}
                  label='Is campaign (Áp dụng mã giảm giá BeautyX)'
                />
              </div>
            </div>
            <div className="flex-row-sp input-wrap">
              <div className="wrap-item">
                <label className="required form-label">Mã giảm giá</label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.coupon_code}
                  name="coupon_code"
                  type="text"
                  className="form-control form-control-solid"
                  placeholder={`BTX${moment().format('DDMM')}`}
                />
                {formik.errors.coupon_code && formik.touched.coupon_code && (
                  <span className='text-danger'>
                    {formik.errors.coupon_code}
                  </span>
                )}
              </div>
              <div className="wrap-item">
                <label className="required form-label">Tên</label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  name="title"
                  type="text"
                  className="form-control form-control-solid"
                  placeholder="Chương trình khuyến mại"
                />
                {formik.errors.title && formik.touched.title && (
                  <span className='text-danger'>
                    {formik.errors.title}
                  </span>
                )}
              </div>
            </div>
            <div className="input-wrap">
              <label className="required form-label">Mô tả</label>
              <input
                onChange={formik.handleChange}
                value={formik.values.description}
                name="description"
                type="text"
                className="form-control form-control-solid"
                placeholder="Mô tả chương trình khuyến mại"
              />
              {formik.errors.description && formik.touched.description && (
                <span className='text-danger'>
                  {formik.errors.description}
                </span>
              )}
            </div>
            <div className="flex-row-sp input-wrap">
              <div className="wrap-item wrap-item-col-4">
                <label className="required form-label">
                  Giá trị giảm giá
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.discount_value}
                  name="discount_value"
                  type="number"
                  className="form-control form-control-solid"
                  placeholder="Giá trị giảm giá"
                />
                {formik.errors.discount_value && formik.touched.discount_value && (
                  <span className='text-danger'>
                    {formik.errors.discount_value}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-row-sp input-wrap">
              <div className="wrap-item wrap-item-col-4">
                <label className="required form-label">Số lượng</label>
                <input
                  value={formik.values.total}
                  onChange={formik.handleChange}
                  name="total"
                  type="number"
                  className="form-control form-control-solid"
                  placeholder=""
                />
                {formik.errors.total && formik.touched.total && (
                  <span className='text-danger'>
                    {formik.errors.total}
                  </span>
                )}
              </div>
              <div className="wrap-item wrap-item-col-4">
                <label className="required form-label">Lượt sử dụng mỗi khách</label>
                <input
                  value={formik.values.limit}
                  onChange={formik.handleChange}
                  name="limit"
                  type="number"
                  className="form-control form-control-solid"
                  placeholder=""
                />
                {formik.errors.limit && formik.touched.limit && (
                  <span className='text-danger'>
                    {formik.errors.limit}
                  </span>
                )}
              </div>
              <div className="wrap-item wrap-item-col-4">
                <XDateRangePicker
                  minDate={new Date()}
                  startDate={new Date(formik.values.valid_from)}
                  endDate={new Date(formik.values.valid_util)}
                  onChange={(e:any) => {
                    formik.setFieldValue('valid_from', moment(e.selection.startDate).format('YYYY-MM-DD HH:mm:ss'))
                    formik.setFieldValue('valid_util', moment(e.selection.endDate).format('YYYY-MM-DD HH:mm:ss'))
                  }}
                />
              </div>
            </div>
            <div className="input-form__bot">
              <LoadingButton
                type="submit"
                variant='contained'
                size="large"
                color="success"
                loading={isLoading}
              >
                Lưu thay đổi
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default VoucherFormPage