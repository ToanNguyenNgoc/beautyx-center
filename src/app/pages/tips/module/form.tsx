import tipAPI from 'app/api/tipApi'
import { Tips } from 'app/interface'
import { QR_KEY } from 'common'
import { XSwitch } from 'components'
import { useFormik } from 'formik'
import { queryClient } from 'index'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
type Props = {
  isForm: string
  tip: Tips | undefined
  tipId: number
}
export default function FormTip(props: Props) {
  const {isForm, tip, tipId} = props
  const [statusDefault, setStatus] = useState(!!tip?.status)
  const navigate = useNavigate()
  const {mutate, isLoading} = useMutation({
    mutationFn: (value: any) => tipAPI.updateTip(tipId, value),
    onSuccess: () => {
      queryClient.invalidateQueries([QR_KEY.TIP_PAGE]);
      navigate(-1)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  console.log(isLoading)
  const {mutate: addTip, isLoading: loadingTip} = useMutation({
    mutationFn: (value: any) => tipAPI.postTip(value),
    onSuccess: () => {
      queryClient.invalidateQueries([QR_KEY.TIP_PAGE]);
      navigate(-1)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const formik: any = useFormik({
    initialValues: {
      name: isForm === 'EDIT' ? tip?.name : '',
      type: isForm === 'EDIT' ? tip?.type : '',
      priority: isForm === 'EDIT' ? tip?.priority : 0,
      status: isForm === 'EDIT' ? statusDefault : 1
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('Vui lòng nhập nội dung'),
      type: Yup.string().trim().required('Vui lòng nhập loại'),
      priority: Yup.number().required('Vui lòng nhập độ ưu tiên').min(0, "Độ ưu tiên thấp nhất là 0"),
    }),
    onSubmit: (value) => {
      const newValue = {
        ...value,
        status: value.status ? 1 : 0,
      }
      if (isForm === 'ADD') {
        addTip(newValue)
      } else {
        mutate(newValue)
      }
    },
  })
  return (
    <>
      <form
        className='discount-form mb-10 container'
        onSubmit={formik.handleSubmit}
        autoComplete='off'
      >
        <div className='col-12'>
          <div className='wrap-item col-12'>
            <label className='form-label'>Nội dung</label>
            <textarea
              onChange={formik.handleChange}
              value={formik.values.name}
              className='form-control'
              placeholder='Aa'
              rows={4}
              cols={50}
              name='name'
            />
            {formik.errors.name && formik.touched.name && (
              <span className='text-danger d-block mt-2'>{formik.errors.name}</span>
            )}
          </div>
          <div className='row mt-10'>
            <div className='wrap-item col-4'>
              <label className='form-label'>Loại</label>
              <input
                disabled={isForm === 'EDIT' ? true : false}
                onChange={formik.handleChange}
                value={formik.values.type}
                type='text'
                className='form-control'
                placeholder='Aa'
                name='type'
              />
              {formik.errors.type && formik.touched.type && (
                <span className='text-danger d-block mt-2'>{formik.errors.type}</span>
              )}
            </div>
            <div className='wrap-item col-4'>
              <label className='form-label'>Độ ưu tiên</label>
              <input
                onChange={formik.handleChange}
                value={formik.values.priority}
                type='number'
                className='form-control'
                placeholder='Aa'
                name='priority'
              />
              {formik.errors.priority && formik.touched.priority && (
                <span className='text-danger d-block mt-2'>{formik.errors.priority}</span>
              )}
            </div>
            <div className='wrap-item col-4'>
              <label className='form-label'>Trạng thái</label>
              <div>
                <XSwitch
                  value={formik.values.status}
                  onChange={(e) => setStatus(e.target.checked)}
                  label='Kích hoạt để hiển thị tip'
                />
              </div>
            </div>
          </div>
          <div className='d-flex flex-end gap-4 mt-10'>
            <button onClick={() => navigate(-1)} type='button' className='btn btn-primary'>Quay lại</button>
            <button disabled={isLoading || loadingTip ? true : false} className='btn btn-success'>
              {isLoading || loadingTip ? 'Loading...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}