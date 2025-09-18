/* eslint-disable @typescript-eslint/no-explicit-any */
import './style.scss'
import Form from './form';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { QR_KEY } from 'app/common';
import { discountsApi } from 'app/api';
import TitlePage from 'app/components/TitlePage';
import { PageCircularProgress, PermissionLayout } from 'app/components';

function DiscountForm() {
  const params: any = useParams()
  let isForm = "ADD";
  if (params && params.id) {
    isForm = "EDIT"
  }
  const { data, refetch, isLoading } = useQuery({
    queryKey: [[QR_KEY.DISCOUNT, params.id]],
    queryFn: () => discountsApi.getDiscountDetail({
      id: params.id,
      include:'gmup_tags'
    }),
    enabled: params.id ? true : false
  })
  const discount = data?.context
  return (
    <PermissionLayout permissions={params?.id ? ['v1.discounts.update'] : ['v1.discounts.store']} showEmpty>
      <TitlePage
        title={params?.id ? "Chỉnh thông tin giảm giá" : "Tạo mới mã giảm giá"}
      />
      <div className='post d-flex flex-column-fluid' id="kt_post">
        <div className="container">
          {isLoading && <PageCircularProgress />}
          {(isForm === "ADD" || discount) &&
            <Form
              isForm={isForm}
              discount={discount}
              onRestoreFormEdit={refetch}
            />
          }
        </div>
      </div>
    </PermissionLayout>
  );
}

export default DiscountForm;
// eslint-disable-next-line react-refresh/only-export-components
export * from './export-code'