/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { XDateRangePicker, XPagination } from "app/components";
import axios from "axios";
import { FC, useCallback, useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";
import dataJson from "./data.json";
import moment from "moment";
import { debounce } from "lodash";

type ManagerTrackingType = typeof dataJson.manager_trackings;

const ORIGIN_URL = 'https://api.nntx.vn/v1';

const ManagerTraffic: FC = () => {

  return (
    <div>
      <ChartContent />
      <Table />
    </div>
  )
}

const ChartContent: FC = () => {
  const [params, setParams] = useState({
    page: 1,
    sort: '-count_item',
    limit: 10,
    start: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD')
  });
  const { data } = useQuery<any>({
    queryKey: ['/manager-tracking-urls', params],
    queryFn: () => axios.get(ORIGIN_URL + '/manager-tracking-urls', { params })
  });
  const list = data?.context.data || [];
  return (
    <div className="card m-10 p-6 column align-items-center">
      <div className="w-100">
        <XDateRangePicker
        label=""
        maxDate={new Date()}
        startDate={new Date(params.start)}
        endDate={new Date(params.end)}
        onChange={(e: any) => {
          setParams({
            ...params,
            start: moment(e.selection.startDate).format('YYYY-MM-DD'),
            end: moment(e.selection.endDate).format('YYYY-MM-DD'),
          })
        }}
      />
      </div>
      <Chart
        options={{
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: list.map((i: any) => i.url),
          }
        }}
        series={[{
          data: list.map((i: any) => i.count_item),
        }]}
        type="bar"
        width="600"
        height="400"
      />
      <XPagination
        totalPage={data?.context?.total_page || 1}
        onChangePage={e => setParams({ ...params, page: e })}
        defaultPage={data?.context?.current_page || 1}
      />
    </div>
  )
}

const Table: FC = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 15,
    search: '',
    subdomain: '',
    start: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
  });
  const { data, isLoading } = useQuery<any>({
    queryKey: ['/manager-trackings', params],
    queryFn: () => axios.get(ORIGIN_URL + '/manager-trackings', { params })
  });
  const handleSearchDebounced = useCallback(
    debounce((value: string) => {
      setParams((prev) => ({
        ...prev,
        search: value,
        page: 1,
      }));
    }, 800),
    []
  );
  const list: ManagerTrackingType[] = data?.context.data || [];
  return (
    <div className="card m-10 p-6">
      <div>
        <div className="">
          <input
            onChange={e => handleSearchDebounced(e.target.value)}
            type="text" className="w-25 form-control"
            placeholder="Tìm kiếm theo Subdomain, API URL,..."
          />
          <div className="w-25">
            <XDateRangePicker
              label=""
              maxDate={new Date()}
              startDate={new Date(params.start)}
              endDate={new Date(params.end)}
              onChange={(e: any) => {
                setParams({
                  ...params,
                  start: moment(e.selection.startDate).format('YYYY-MM-DD'),
                  end: moment(e.selection.endDate).format('YYYY-MM-DD'),
                })
              }}
            />
          </div>
        </div>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Requests</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>Over {data?.context?.total || 1} requests</span>
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Subdomain</th>
                  <th className='min-w-150px'>API URL</th>
                  <th className='min-w-140px'>IP Address</th>
                  <th className='min-w-120px'>IP Device</th>
                  <th className='min-w-120px'>Device</th>
                  <th className='min-w-120px'>TYPE</th>
                  <th className='min-w-120px'>Request at</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {isLoading && <tr><td><div style={{ height: '100vh' }} /></td></tr>}
                {
                  list.map(item => (
                    <tr key={item._id}>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.subdomain}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.api_url}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {item.ip_address}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {item.ip_device}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {item.device}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {item.type}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                          {moment(item.createdAt).format('YYYY:MM:DD HH:mm')}
                        </a>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
      <XPagination
        totalPage={data?.context?.total_page || 1}
        onChangePage={e => setParams({ ...params, page: e })}
        defaultPage={data?.context?.current_page || 1}
      />
    </div>
  )
}

export default ManagerTraffic;