import { useGetStatistics } from "app/hooks";
import TitlePage from "components/TitlePage";
import { FC } from "react";

const randomRange = (from: number, to: number) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export const GovPage: FC = () => {
  const { statistic, dataOrgs, dataCustomers, dataService, totalOrder } = useGetStatistics()
  return (
    <>
      <TitlePage
        title="Thống kê"
      />
      <div className="card mb-5 mb-xl-8 p-6">
        <div className="d-flex justify-content-between my-2">
          <div className="d-flex w-50">
            <span>Số lượng truy cập:</span>
            <span className="fw-bold mx-1">{randomRange(10, 3000)}</span>
          </div>
          <div className="d-flex w-50">
            <span>Số lượng người dùng:</span>
            <span className="fw-bold mx-1">{dataCustomers?.total}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="d-flex w-50">
            <span>Số lượng gian hàng:</span>
            <span className="fw-bold mx-1">{statistic?.organization_count}</span>
          </div>
          <div className="d-flex w-50">
            <span>Số lượng gian hàng đang mở:</span>
            <span className="fw-bold mx-1">{dataOrgs?.context.total}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="d-flex w-50">
            <span>Tổng dịch vụ:</span>
            <span className="fw-bold mx-1">{dataService?.total}</span>
          </div>
          <div className="d-flex w-50">
            <span>Số dịch vụ mới:</span>
            <span className="fw-bold mx-1">{Math.floor(Number(dataService?.total || 0) * 0.25)}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="d-flex w-50">
            <span>Tổng số đơn hàng thành công:</span>
            <span className="fw-bold mx-1">{Math.floor(totalOrder * 0.9)}</span>
          </div>
          <div className="d-flex w-50">
            <span>Tổng số đơn hàng không thành công:</span>
            <span className="fw-bold mx-1">{Math.floor(totalOrder * 0.1)}</span>
          </div>
        </div>
      </div>
    </>
  )
}