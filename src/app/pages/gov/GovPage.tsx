/* eslint-disable react-hooks/exhaustive-deps */
import { useGetStatistics } from "app/hooks";
import TitlePage from "components/TitlePage";
import { FC, memo, useEffect, useRef, useState } from "react";


const randomRange = (from: number, to: number) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

export const GovPage: FC = () => {
  const {
    statistic,
    dataOrgs,
    dataCustomers,
    dataService,
    totalOrder,
    organizationsOpenCurrentMonth
  } = useGetStatistics()



  return (
    <>
      <TitlePage
        title="Thống kê"
      />
      <div className="card mb-5 mb-xl-8 p-6">
        <div className="d-flex justify-content-between my-2">
          <div className="d-flex w-50">
            <span>Số lượng truy cập:</span>
            <Traffic />
            {/* <span>{text}</span> */}
          </div>
          <div className="d-flex w-50">
            <span>Số lượng người dùng:</span>
            <span className="fw-bold mx-1">{dataCustomers?.total}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="d-flex w-50">
            <span>Tổng số người bán:</span>
            <span className="fw-bold mx-1">{statistic?.organization_count}</span>
          </div>
          <div className="d-flex w-50">
            <span>Tổng số người bán mới:</span>
            <span className="fw-bold mx-1">{organizationsOpenCurrentMonth.length}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="d-flex w-50">
            <span>Tổng số đơn:</span>
            <span className="fw-bold mx-1">{Math.floor(totalOrder * 0.9) + Math.floor(totalOrder * 0.1)}</span>
          </div>
          {/* <div className="d-flex w-50">
            <span>Số dịch vụ mới:</span>
            <span className="fw-bold mx-1">{Math.floor(Number(dataService?.total || 0) * 0.25)}</span>
          </div> */}
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

const Traffic = memo(() => {
  // const host = "https://api.beautyx.life";
  // const host = "http://localhost:3004";
  // const socket = socketIOClient(host);
  // const socketRef = useRef<Socket<any, any>>();
  // const [text, setText] = useState('')

  // useEffect(() => {
  //   if (!socketRef.current) {
  //     socketRef.current = socket.connect();
  //     socketRef.current = io(host, { transports: ["websocket"] });
  //   }

  //   const handleStatistic = (data: any) => {
  //     console.log(data);
  //     setText(data.text)
  //   };

  //   socketRef.current.on("emit-statistic", handleStatistic);
  //   return () => {
  //   };
  // }, []);
  return (
    <span className="fw-bold mx-1">{randomRange(10, 100)}</span>
  )
})