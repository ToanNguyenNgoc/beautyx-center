/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import { ReqAdminUser, ResponseDetail } from "app/@types";
import { adminApi } from "app/api";
import { useGetRoles, useGetRolesAndPermissions } from "app/hooks";
import { AdminAccount } from "app/interface";
import { InitAlert, PermissionLayout, XButton } from "app/components";
import TitlePage from "app/components/TitlePage";
import { useFormik } from "formik";
import { FC } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup"

interface InitialValues {
  fullname: string;
  email: string;
  telephone: string;
  password: string;
  roles_id: string[]
}

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const CustomerFormPage: FC = () => {
  const { hasEnabled } = useGetRolesAndPermissions()
  const navigate = useNavigate()
  const params = useParams() as { id?: number }
  const { mutate, isLoading } = useMutation<any, any, ReqAdminUser>({
    mutationFn: (body) => params?.id ? adminApi.adminUserUpdate(Number(params.id), body) : adminApi.adminUserCreate(body),
    onSuccess: () => {
      InitAlert.open({ title: 'Cập nhật thành công !', type: 'success' })
      setTimeout(() => navigate(-1), 800)
    },
    onError: () => InitAlert.open({ title: 'Có lỗi xảy ra', type: 'error' })
  })
  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
      telephone: '',
      roles_id: []
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required('Nhập họ và tên'),
      email: Yup.string().required('Vui lòng nhập Email').email('Vui nhập đúng định dạng Email'),
      password: params?.id ? Yup.string().nullable(true) : Yup.string().required('Vui lòng nhập mật khẩu'),
      telephone: params?.id ? Yup.string().nullable(true) : Yup.string().required('Vui lòng nhập điện thoại'),
      // roles_id: Yup.array().min(1, "Vui lòng chọn quyền"),
    }),
    onSubmit: (initialValues) => handleSubmit(initialValues)
  })
  const { refetch, isRefetching, data } = useQuery<ResponseDetail<AdminAccount>>({
    queryKey: [],
    queryFn: () => adminApi.adminUser(Number(params.id)).then(res => res.data),
    enabled: !!(params.id && hasEnabled('v1.admin.users.index')),
    onSuccess: (response) => {
      formik.setFieldValue('fullname', response.context.fullname || "");
      formik.setFieldValue('email', response.context.email || "");
      formik.setFieldValue('telephone', response.context.telephone || "")
      formik.setFieldValue('roles_id', response.context.roles.map(i => String(i.id)))
    }
  })
  const { roles } = useGetRoles()
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue('roles_id', value)
  };
  const handleSubmit = (value: InitialValues) => {
    mutate({
      fullname: value.fullname,
      email: data?.context.email !== value.email ? value.email : undefined,
      telephone: data?.context.telephone !== value.telephone ? value.telephone : undefined,
      password: params?.id ? undefined : value.password,
      roles_id: value.roles_id.map(i => Number(i))
    })
  }
  return (
    <PermissionLayout permissions={params?.id ? ['v1.admin.users.index', 'v1.admin.users.update'] : ['v1.admin.users.store']} showEmpty>
      <TitlePage title={params?.id ? 'Cập nhật' : 'Tạo mới'} />
      <div className="card">
        <form className="card-body py-3" onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="flex-row-sp input-wrap">
            <div className="wrap-item w-100 p-2">
              <label className="required form-label">Tên</label>
              <input
                value={formik.values.fullname}
                onChange={formik.handleChange}
                name="fullname"
                type="text"
                className="form-control form-control-solid"
                placeholder="Tên"
              />
              {
                (formik.errors.fullname && formik.touched.fullname) &&
                <span className='text-danger'>{formik.errors.fullname}</span>
              }
            </div>
            <div className="wrap-item w-100 p-2">
              <label className="required form-label">Mật khẩu</label>
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                type="text"
                className="form-control form-control-solid"
                placeholder="Mật khẩu"
                disabled={!!(params?.id)}
              />
              {
                (formik.errors.password && formik.touched.password) &&
                <span className='text-danger'>{formik.errors.password}</span>
              }
            </div>
          </div>
          <div className="flex-row-sp input-wrap">
            <div className="wrap-item w-50 p-2">
              <label className="required form-label">Email</label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                type="text"
                className="form-control form-control-solid"
              />
              {
                (formik.errors.email && formik.touched.email) &&
                <span className='text-danger'>{formik.errors.email}</span>
              }
            </div>
            <div className="wrap-item w-50 p-2">
              <label className="required form-label">Số điện thoại</label>
              <input
                value={formik.values.telephone}
                onChange={formik.handleChange}
                name="telephone"
                disabled={!!(params?.id)}
                type="text"
                className="form-control form-control-solid"
                placeholder="Số điện thoại"
              />
              {
                (formik.errors.telephone && formik.touched.telephone) &&
                <span className='text-danger'>{formik.errors.telephone}</span>
              }
            </div>
          </div>
          <div className="flex-row-sp input-wrap" style={{display:'none'}}>
            <div className="wrap-item w-50 p-2">
              <p className="required form-label">Quyền</p>
              <Select
                size="small"
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={formik.values.roles_id}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                style={{ width: '100%', maxWidth: '100%' }}
              >
                {roles.map((role) => (
                  <MenuItem
                    key={role.id}
                    value={String(role.id)}
                    style={getStyles(role.name, formik.values.roles_id, theme)}
                  >
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
              {
                (formik.errors.roles_id && formik.touched.roles_id) &&
                <span className='text-danger'>{formik.errors.roles_id}</span>
              }
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <XButton
              type="button"
              title="Khôi phục"
              onClick={refetch}
              loading={isRefetching}
            />
            <XButton
              color="success"
              type="submit"
              title="Lưu"
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </PermissionLayout>
  )
}

export default CustomerFormPage