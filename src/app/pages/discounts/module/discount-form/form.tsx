/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppSnack, FlatFormOrder, SelectionOrgMultiple, SiteLayout, XDateRangePicker, XSwitch } from 'app/components'
import moment from 'moment';
import { useMutation } from 'react-query';
// import { ReqDiscountBody } from 'app/@types';
// import { discountsApi } from 'app/api';
import { LoadingButton } from '@mui/lab';
// import { IDiscountPar, IITEMS_DISCOUNT } from 'app/interface';
import {
  DISCOUNTS_TYPE,
  DISCOUNT_TYPE,
  DISCOUNT_UNIT,
  DISCOUNT_UNIT_ARR,
  PLAT_FORM,
  PLAT_FORM_ARR,
  formatPrice
} from 'app/util';
import { useGetGmupTags, useMessage, useRootContext } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { SelectService } from './select-service';
import { ExportCode } from './export-code'
import { SITE } from 'app/context';
import { ResDiscountPar, ResItemDiscount } from 'app/interface';
import { ReqPostDiscount } from 'app/@types';
import { Api } from 'app/api';
import { ScheduleBuilder } from 'app/pages/discounts/module/discount-form/schedule-builder';

type DaySchedState = { [day: number]: { [slot: string]: number } };
interface IProps {
  discount: ResDiscountPar | undefined,
  isForm: string,
  onRestoreFormEdit?: () => void
}

function Form(props: IProps) {
  const { rootSite, isBeautyxSite } = useRootContext();
  const { gmupTags } = useGetGmupTags({ limit: 100, 'filter[is_root]': false, 'filter[status]': true });
  const generateCode = moment().format('MMDDss')
  const { discount, isForm } = props;
  const { resultLoad, onCloseNoti, noti } = useMessage()
  const navigate = useNavigate()
  const [isCampaign, setIsCampaign] = useState(discount?.is_campaign ?? false)
  const [services, setServices] = useState<any>(
    isForm === "EDIT" ?
      discount?.items.map((item: ResItemDiscount) => item.productable) : []
  )

  

function buildSchedulesPayload(state: DaySchedState, orgId: string | number) {
  const weekday = Object.entries(state).map(([dayStr, slotMap]) => ({
    day: Number(dayStr),
    time_slots: Object.entries(slotMap).map(([time, quantity]) => ({ time, quantity }))
  })).filter(d => d.time_slots.length > 0);

  return [{ [String(orgId)]: { weekday } }];
}

  //handle submit form
  //[HANDLE POST]
  const { mutate, isLoading } = useMutation({
    mutationFn: (body: ReqPostDiscount) => discount ? Api.Discount.put(discount.id, body) : Api.Discount.post(body),
    onSuccess: () => {
      resultLoad({
        message: discount ? 'Cập nhật thành công' : 'Tạo thành công',
        color: 'success'
      })
      // const uuid = data.data?.context?.uuid
      setTimeout(() => navigate(-1), 2000)
    },
    onError: (_error, _variables, _context) => {
      resultLoad({
        message: 'Có lỗi xảy ra',
        color: 'error'
      })
    },
  })

  //handle form
  const formik = useFormik({
    initialValues: {
      priority: isForm === "EDIT" ? discount?.priority : 0,
      coupon_code: isBeautyxSite ? (isForm === "EDIT" ? discount?.coupon_code : "") : `GMUP-${new Date().getTime()}`,
      title: isForm === "EDIT" ? discount?.title : "",
      description: isForm === "EDIT" ? discount?.description : "",
      platform: isBeautyxSite ? ((isForm === "EDIT" && discount?.platform) ? discount?.platform?.split("|")?.filter(Boolean) : []) : [PLAT_FORM.GMUP],
      discount_type: isBeautyxSite ? (isForm === "EDIT" ? discount?.discount_type : "") : DISCOUNT_TYPE.FINAL_PRICE,
      discount_unit: isBeautyxSite ? (isForm === "EDIT" ? discount?.discount_unit : "") : DISCOUNT_UNIT.PRICE,
      discount_value: isForm === "EDIT" ? discount?.discount_value : "",
      organizations: isForm === "EDIT" ? discount?.organizations : [],
      total: isBeautyxSite ? ((isForm === "EDIT" && discount?.total) ? discount?.total : "") : 3000,
      valid_from: (isForm === "EDIT" && discount?.valid_from) ? discount?.valid_from : moment().format('YYYY-MM-DD HH:mm:ss'),
      valid_util: (isForm === "EDIT" && discount?.valid_util) ? discount?.valid_util : moment().format('YYYY-MM-DD HH:mm:ss'),
      minimum_order_value: isBeautyxSite ? ((isForm === "EDIT" && discount?.maximum_discount_value) ? discount?.maximum_discount_value : "") : 0,
      limit: isBeautyxSite ? ((isForm === "EDIT" && discount?.limit) ? discount?.limit : "") : undefined,
      gmup_tag_ids: isForm === "EDIT" ? discount?.gmup_tags?.map(i => Number(i.id)).filter(Boolean) : [] as any,
      ai_description: isForm === "EDIT" ? (discount as any)?.ai_description ?? "" : "",
      schedules_state: {} as DaySchedState,
    },
    validationSchema: Yup.object({
      coupon_code: Yup.string().required("Vui lòng nhập Mã giảm giá"),
      title: Yup.string().required("Vui lòng nhập tên"),
      description: Yup.string().required("Vui lòng nhập mô tả"),
      discount_type: Yup.string().required("Vui lòng chọn hình thức giảm giá"),
      discount_unit: Yup.string().required("Vui lòng chọn loại giảm giá "),
      discount_value: Yup.string().required("Vui lòng nhập giá trị giảm"),
      platform: Yup.array().min(1, "Vui lòng chọn nền tảng áp dụng"),
      organizations: Yup.array().min(1, "Vui lòng chọn Doanh nghiệp"),
      total: isCampaign ? Yup.number().min(0, 'Số lượng mã tối đa 4000 mã')
        .max(4000, 'Số lượng mã tối đa 4000 mã')
        .required('Vui lòng nhập số lượng mã')
        :
        Yup.string(),
      ai_description: Yup.string().nullable(),

      
    }),
    onSubmit: (values) => {
      const newValue = values as any
      const selectedOrgId = values.organizations?.map(i => i.id)[0] as number | string;
      const schedules = buildSchedulesPayload(values.schedules_state, selectedOrgId);
      const body = {
        ...newValue,
        organizations: selectedOrgId,
        items: services.map((i: any) => i.id),
        platform: isBeautyxSite ? (newValue.platform[0] ?? 'MOMO') : PLAT_FORM.GMUP,
        is_campaign: isCampaign ? 1 : 0,
        limit: Number(values.limit),
        ai_description: values.ai_description,
        schedules
      }
      if (services.length > 0) {
        mutate(body)
      }
    },
  })
  const minPriceItem = Math.min.apply(null, services.map((i: any) => i?.price));
  let totalServicesPrice = 0;
  if (services.length > 0) {
    totalServicesPrice = services
      ?.map((i: any) => i?.price)
      ?.reduce((pre: number, cur: number) => pre + cur)
  }

  const onChangeInputDiscountValue = (e: any) => {
    if (formik.values.discount_unit === DISCOUNT_UNIT.PERCENT) {
      if (parseInt(e.target.value) < 100 || e.target.value === "") {
        formik.setFieldValue("discount_value", e.target.value)
      }
    } else if (formik.values.discount_unit === DISCOUNT_UNIT.PRICE) {
      if (formik.values.discount_type === DISCOUNT_TYPE.PRODUCTS) {
        if (parseInt(e.target.value) <= minPriceItem || e.target.value === "") {
          formik.setFieldValue("discount_value", e.target.value)
        }
      } if (formik.values.discount_type === DISCOUNT_TYPE.SUB_TOTAL) {
        if (parseInt(e.target.value) < totalServicesPrice || e.target.value === "") {
          formik.setFieldValue("discount_value", e.target.value)
        }
      } if (formik.values.discount_type === DISCOUNT_TYPE.FINAL_PRICE) {
        if (parseInt(e.target.value) <= minPriceItem || e.target.value === "") {
          formik.setFieldValue("discount_value", e.target.value)
        }
      }
    }
  }
  const onChangeInputTotal = (e: any) => {
    if (e.target.value > 0 || e.target.value === "") {
      formik.setFieldValue("total", e.target.value)
      formik.setFieldValue("limit", "")
    }
  }
  const onChangeMinimumOrderValue = (e: any) => {
    if (formik.values.discount_type === DISCOUNT_TYPE.SUB_TOTAL) {
      if (formik.values.discount_value === "") {
        formik.setFieldValue("minimum_order_value", e.target.value)
      }
      // formik.setFieldValue("minimum_order_value", e.target.value)
    }
  }

  const onChangeInputLimit = (e: any) => {
    const total = parseInt(`${formik.values.total}`)
    if (formik.values.total === "") {
      return formik.setFieldValue("limit", e.target.value)
    }
    if ((typeof total === "number" && parseInt(e.target.value) < total) || e.target.value === "") {
      return formik.setFieldValue("limit", e.target.value)
    }
  }

  return (
    <>
      <AppSnack
        severity={noti.color}
        message={noti.message}
        open={noti.openAlert}
        close={onCloseNoti}
      />
      <form
        className="discount-form"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        {
          rootSite == SITE.BEAUTYX &&
          <div className="flex-row-sp align-items-center input-wrap">
            <div className="wrap-item">
              <XSwitch
                value={isCampaign}
                onChange={(e) => setIsCampaign(e.target.checked)}
                label='Is campaign (Áp dụng mã giảm giá Shopee, VinId, Viettel Money, Livwell)'
              />
            </div>
          </div>
        }
        <div className="flex-row-sp input-wrap">
          <div className="wrap-item">
            <label className="form-label">Độ ưu tiên</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.priority}
              name="priority"
              type="number"
              className="form-control form-control-solid"
              placeholder="Độ ưu tiên"
            />
          </div>
          <div className="wrap-item d-flex flex-column">
            <label className="form-label">Tag dịch vụ</label>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={formik.values.gmup_tag_ids.length > 0 ? formik.values.gmup_tag_ids[0]: undefined}
                onChange={e => formik.setFieldValue('gmup_tag_ids', [e.target.value])}
                renderValue={() => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {gmupTags.filter(item => formik.values.gmup_tag_ids?.includes(item.id || 0)).map((value) => (
                      <span key={value.id}>{value.name}</span>
                    ))}
                  </Box>
                )}
              >
                {gmupTags.map(item => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex-row-sp input-wrap">
          <div className="wrap-item">
            {
              isForm === "ADD" ?
                <label className="required form-label">{isBeautyxSite ? `Mã giảm giá (org subdomain + ${generateCode})` : `Code`}</label>
                :
                <label className="required form-label">Mã giảm giá</label>
            }
            <input
              onChange={formik.handleChange}
              value={formik.values.coupon_code}
              name="coupon_code"
              type="text"
              className="form-control form-control-solid"
              placeholder={`Example:ORG${generateCode}`}
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
              placeholder="Tên"
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
            placeholder="Mô tả "
          />
          {formik.errors.description && formik.touched.description && (
            <span className='text-danger'>
              {formik.errors.description}
            </span>
          )}
        </div>

        {
          rootSite === SITE.BEAUTYX &&
          <div className="flex-col input-wrap">
            <label className="required form-label">Áp dụng cho nền tảng</label>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={formik.values.platform}
              onChange={formik.handleChange}
              name="platform"
              renderValue={(selected: any) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected?.map((value: any) => (
                    <FlatFormOrder
                      key={value}
                      platForm={value}
                    />
                  ))}
                </Box>
              )}
            >
              {PLAT_FORM_ARR.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
            {formik.errors.platform && formik.touched.platform && (
              <span className='text-danger'>
                {formik.errors.platform}
              </span>
            )}
          </div>
        }
        {/* orgs select */}
        <div className="flex-col input-wrap">
          <SelectionOrgMultiple
            label='Doanh nghiệp được áp dụng'
            origins={formik.values.organizations}
            onChangeOrigin={(orgs) => {
              setServices([])
              formik.setFieldValue('organizations', orgs)
            }}
          />
          {formik.errors.organizations && formik.touched.organizations && (
            <span className='text-danger'>
              {formik.errors.organizations}
            </span>
          )}
        </div>
        {/* end orgs select */}
        {/* services, products select */}
        <div className="flex-col input-wrap">
          <SelectService
            values={services}
            setValues={setServices}
            orgsChoose={formik.values.organizations}
          />
        </div>
        {/* end orgs select */}
        <div className="flex-row-sp input-wrap">
          <SiteLayout site={SITE.BEAUTYX}>
            <div className="flex-col wrap-item wrap-item-col-4">
              <label className="required form-label">Hình thức giảm giá </label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.discount_type}
                onChange={formik.handleChange}
                name="discount_type"
              >
                {
                  DISCOUNTS_TYPE.map(item => (
                    <MenuItem key={item.id} value={item.TYPE}>{item.title}</MenuItem>
                  ))
                }
              </Select>
              {formik.errors.discount_type && formik.touched.discount_type && (
                <span className='text-danger'>
                  {formik.errors.discount_type}
                </span>
              )}
            </div>
          </SiteLayout>
          <SiteLayout site={SITE.BEAUTYX}>
            <div className="flex-col wrap-item wrap-item-col-4">
              <label className="required form-label">Giảm giá theo</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.discount_unit}
                onChange={(e) => {
                  formik.setFieldValue("discount_value", "")
                  formik.setFieldValue("discount_unit", e.target.value)
                }}
                name="discount_unit"
              >
                {
                  DISCOUNT_UNIT_ARR.map(item => (
                    <MenuItem key={item.id} value={item.TYPE}>{item.title}</MenuItem>
                  ))
                }
              </Select>
              {formik.errors.discount_unit && formik.touched.discount_unit && (
                <span className='text-danger'>
                  {formik.errors.discount_unit}
                </span>
              )}
            </div>
          </SiteLayout>
          <div className="wrap-item wrap-item-col-4">
            <label className="required form-label">
              {
                formik.values.discount_type === DISCOUNT_TYPE.FINAL_PRICE ?
                  "Giảm giá còn"
                  :
                  "Giá trị giảm giá"
              }
              {formik.values.discount_unit === DISCOUNT_UNIT.PERCENT && "(%)"}
              {formik.values.discount_unit === DISCOUNT_UNIT.PRICE && "(VNĐ)"}
            </label>
            <input
              onChange={onChangeInputDiscountValue}
              value={formik.values.discount_value}
              name="discount_value"
              type="text"
              className="form-control form-control-solid"
              placeholder={
                formik.values.discount_unit === DISCOUNT_UNIT.PRICE ?
                  `Giá trị giảm tối đa ${formatPrice(
                    formik.values.discount_type === DISCOUNT_TYPE.SUB_TOTAL ?
                      totalServicesPrice : minPriceItem
                  )}đ`
                  :
                  "Giảm giá"
              }
            />
            {formik.errors.discount_value && formik.touched.discount_value && (
              <span className='text-danger'>
                {formik.errors.discount_value}
              </span>
            )}
          </div>
        </div>
        <div className='flex-row-sp input-wrap'>
          <SiteLayout site={SITE.BEAUTYX}>
            <div className="wrap-item wrap-item-col-4">
              <label className="form-label">
                Giá trị đơn hàng tối thiểu
              </label>
              <input
                onChange={onChangeMinimumOrderValue}
                value={formik.values.minimum_order_value}
                name="minimum_order_value"
                disabled={formik.values.discount_type === DISCOUNT_TYPE.PRODUCTS ? true : false}
                type="text"
                className="form-control form-control-solid"
                placeholder="Giá áp dụng"
              />
            </div>
          </SiteLayout>
        </div>
        <div className="flex-row-sp input-wrap">
          <SiteLayout site={SITE.BEAUTYX}>
            <div className="wrap-item wrap-item-col-4">
              <label className={`${isCampaign ? 'required' : ''} form-label`}>Số lượng</label>
              <input
                value={formik.values.total}
                onChange={onChangeInputTotal}
                name="total"
                type="text"
                className="form-control form-control-solid"
                placeholder=""
              />
              {formik.errors.total && formik.touched.total && (
                <span className='text-danger'>
                  {formik.errors.total}
                </span>
              )}
            </div>
          </SiteLayout>
          <SiteLayout site={SITE.BEAUTYX}>
            <div className="wrap-item wrap-item-col-4">
              <label className="form-label">Lượt sử dụng mỗi khách hàng </label>
              <input
                value={formik.values.limit}
                onChange={onChangeInputLimit}
                name="limit"
                type="number"
                className="form-control form-control-solid"
                placeholder=""
              />
            </div>
          </SiteLayout>
          <div className="wrap-item wrap-item-col-4">
            <XDateRangePicker
              minDate={new Date()}
              startDate={new Date(formik.values.valid_from)}
              endDate={new Date(formik.values.valid_util)}
              onChange={(e) => {
                formik.setFieldValue('valid_from', moment(e.selection.startDate).format('YYYY-MM-DD HH:mm:ss'))
                formik.setFieldValue('valid_util', moment(e.selection.endDate).format('YYYY-MM-DD HH:mm:ss'))
              }}
            />
          </div>
        </div>
        <SiteLayout site={SITE.GMUP}>
          <div className="input-wrap">
            <label className="form-label">Mô tả AI</label>
            <textarea
              onChange={formik.handleChange}
              value={formik.values.ai_description}
              name="ai_description"
              rows={3}
              className="form-control form-control-solid"
              placeholder="Mô tả cho AI (ngữ cảnh, tone, mục tiêu...)"
            />
          </div>
          <div className="flex-col input-wrap">
            <label className="form-label">Lịch khung giờ</label>
              <ScheduleBuilder
                value={formik.values.schedules_state}
                onChange={(v) => formik.setFieldValue('schedules_state', v)}
              />
          </div>
        </SiteLayout>

        <div className="input-form__bot">
          {/* {
            isForm === "EDIT" &&
            <button
              onClick={onRestoreFormEdit}
              className="btn btn-light"
              type='button'
            >
              Khôi phục
            </button>
          } */}
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant='contained'
            size="large"
            color="success"
          >
            Lưu thay đổi
          </LoadingButton>
          {
            (discount && (discount.platform === PLAT_FORM.SHOPEE || discount.platform === PLAT_FORM.VINID)) &&
            <ExportCode discount={discount} />
          }
        </div>
      </form>
    </>
  );
}

export default Form;