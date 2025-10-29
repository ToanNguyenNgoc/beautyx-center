import { QrBrandAppVersion, ResponseList } from "app/@types";
import { Api } from "app/api";
import { QR_KEY } from "app/common";
import { useQueryParams } from "app/hooks";
import { IBrandAppVersion } from "app/interface";
import { FC, Fragment } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "app/util";
import { PageCircularProgress, PermissionLayout, XPagination } from "app/components";
import TitlePage from "app/components/TitlePage";
import { Button } from "@mui/material";

const BrandAppVersionPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const os_platform = params?.os_platform || 'ios';
  const bundle_id = params?.bundle;
  const { query, handleQueryString } = useQueryParams<QrBrandAppVersion>()
  const { data, isLoading } = useQuery<{ context: ResponseList<IBrandAppVersion[]> }>({
    queryKey: [QR_KEY.BrandAppVersions, os_platform, bundle_id, query],
    queryFn: () => Api.Admin.getBrandAppVersion(String(bundle_id), { ...query, 'append': 'media_url', 'sort': '-created_at', 'filter[os_platform]': os_platform }),
    enabled: !!bundle_id
  })
  return (
    <Fragment>
      <TitlePage
        element={
          <PermissionLayout permissions={['v1.brand_app_versions.store']}>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate(location.pathname + '/form')}
            >
              Tạo mới version {os_platform}
            </Button>
          </PermissionLayout>
        }
        title={`Danh sách version ${os_platform}`}
      />
      <div className="card p-3">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <Link to={`/pages/brand-apps/${bundle_id}/ios`} className={`nav-link ${os_platform === 'ios' ? 'active' : ''}`} id="home-tab" data-bs-toggle="tab" data-bs-target="#ios" type="button" role="tab" aria-controls="ios" aria-selected="true">Ios</Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link to={`/pages/brand-apps/${bundle_id}/android`} className={`nav-link ${os_platform === 'android' ? 'active' : ''}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#android" type="button" role="tab" aria-controls="android" aria-selected="false">Android</Link>
          </li>
        </ul>
        <div className="mt-3">
          <div className={`card`}>
            {/* begin::Body */}
            <div className='card-body py-3'>
              {/* begin::Table container */}
              <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                  {/* begin::Table head */}
                  <thead>
                    <tr className='fw-bold text-muted'>
                      <th className='min-w-150px'>Bundle Id</th>
                      <th className='min-w-150px'>Version</th>
                      <th className='min-w-120px'>Ngày tạo</th>
                      <th className='min-w-120px'>Cập nhật</th>
                      <th className='min-w-120px'>File</th>
                    </tr>
                  </thead>
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {
                      data?.context.data?.map(version => (
                        <tr key={version.id}>
                          <td>
                            <span className='text-dark fw-bold text-hover-primary fs-6'>
                              #{version.id}
                            </span>
                          </td>
                          <td>
                            <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {version.version}
                            </span>
                          </td>
                          <td>
                            <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {formatDate(version.created_at)}
                            </span>
                          </td>
                          <td>
                            <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                              {formatDate(version.updated_at)}
                            </span>
                          </td>
                          <td className='text-dark fw-bold text-hover-primary fs-6'>{version.media_url}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                  {/* end::Table body */}
                </table>
                {/* end::Table */}
                <PageCircularProgress loading={isLoading} />
                <XPagination
                  totalPage={data?.context.last_page ?? 1}
                  onChangePage={page => handleQueryString('page', page)}
                  defaultPage={query.page}
                />
              </div>
              {/* end::Table container */}
            </div>
            {/* begin::Body */}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default BrandAppVersionPage;