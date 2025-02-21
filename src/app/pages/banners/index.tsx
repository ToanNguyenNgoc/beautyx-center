// import Draggable from 'react-draggable';
import { FC, useState } from "react";
import './style.scss';
import { Link, useNavigate } from "react-router-dom";
// import {
//   SortableContainer,
//   SortableContainerProps,
//   SortableElement,
//   SortableElementProps,
//   SortableHandle
// } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QR_KEY } from "app/common";
import bannerApi from "app/api/bannerApi";
import { IBanner } from "app/interface";
import TitlePage from "app/components/TitlePage";
import { KTSVG, toAbsoluteUrl } from "../../../_metronic/helpers";
import { BannerTypeElement, formatDate } from "app/util";
import moment from "moment";
import { Button, CircularProgress } from "@mui/material";
import { PageCircularProgress, PermissionLayout } from "app/components";

function BannerWidget() {
  const navigate = useNavigate()
  const [banners, setBanners] = useState<IBanner[]>([])
  useQuery({
    queryKey: [QR_KEY.BANNER],
    queryFn: () => bannerApi.banners(),
    onSuccess(data) {
      setBanners(data.data)
    },
  })
  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setBanners(arrayMoveImmutable(banners, oldIndex, newIndex))
  }


  return (
    <>
      <TitlePage
        element={
          <PermissionLayout permissions={['v1.banners.store']}>
            <Button
              onClick={() => navigate('/pages/banners-form', {
                state: banners[0]?.priority
              })}
              variant="contained"
              size="large"
            >
              Tạo mới banner
            </Button>
          </PermissionLayout>
        }
        title="Danh sách banners"
      />
      <div className="row g-5 gx-xxl-8 table-banner">
        <div className={`card mb-5 mb-xl-8`}>
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Banners Campaigns</span>
              <span className='text-muted mt-1 fw-semobold fs-7'>{banners.length}</span>
            </h3>
          </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bold text-muted'>
                    <th className='w-25px'>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>

                      </div>
                    </th>
                    <th className='min-w-150px'>Banner</th>
                    {/* <th className='min-w-50px'>Độ ưu tiên</th> */}
                    <th className='min-w-140px'>Loại</th>
                    <th className='min-w-140px'>Ngày hết hạn</th>
                    <th className='min-w-140px'>Nền tảng</th>
                    <th className='min-w-100px text-end'>Actions</th>
                  </tr>
                </thead>
                <SortableComponent
                  onSortEnd={onSortEnd}
                  banners={banners}
                />
              </table>
              <PageCircularProgress loading={banners.length === 0} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default BannerWidget;

interface SortableComponentProps {
  banners: IBanner[]
  onSortEnd: (oldIndex: number, newIndex: number) => void
}

// interface ISortableItem extends SortableElementProps {
//   children: React.ReactNode
//   className?: string
// }
// interface ISortableContainer extends SortableContainerProps {
//   children: React.ReactNode
//   className?: string
// }

// const SortableItem: React.ComponentClass<ISortableItem, any> = SortableElement(
//   ({ children }: { children: React.ReactNode; className: string }) => (
//     <tr>{children}</tr>
//   )
// )
// interface ISortableHandleElement {
//   children: React.ReactNode
//   className?: string
// }

// const SortableList: React.ComponentClass<ISortableContainer, any> = SortableContainer(
//   ({ children }: { children: React.ReactNode; className: string }) => {
//     return <tbody>{children}</tbody>
//   }
// )
// const DndTrigger: React.ComponentClass<ISortableHandleElement, any> = SortableHandle(
//   ({ children, className }: { children: React.ReactNode; className: string }) => (
//     <div className={className || ''}>{children}</div>
//   )
// )
const SortableComponent: FC<SortableComponentProps> = ({ banners, onSortEnd }) => {
  const handleSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void => {
    onSortEnd(oldIndex, newIndex)
  }
  // const { METHOD } = useVerifyRoute()
  const qrClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: (id: number) => bannerApi.deleteBanner(id),
    onSuccess: () => {
      qrClient.invalidateQueries({ queryKey: [QR_KEY.BANNER] })
    },
    onError: () => { }
  })
  return (
    // <SortableList
    //   lockAxis="y"
    //   lockToContainerEdges={true}
    //   useDragHandle
    //   onSortEnd={handleSortEnd}

    // >
    <>
      {banners.map((item: IBanner, index: number) => (
        // <SortableItem
        //   key={`item-${index}`}
        //   index={index} className="item"
        // >

        // </SortableItem>
        <tr key={index} onClick={() => handleSortEnd({ newIndex: 1, oldIndex: 1 })}>
          <td>
            {/* <DndTrigger className="itemTrigger"> */}
            <img src={toAbsoluteUrl("/media/icons/duotune/abstract/abs015.svg")} alt="" />
            {/* </DndTrigger> */}
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <div className='symbol symbol-45px me-5'>
                <img className="banner-item__img" src={item.imageURL} alt='' />
              </div>
              <div className='d-flex justify-content-start flex-column'>
                <span className='text-dark fw-bold text-hover-primary fs-6'>
                  {item.name}
                </span>
                <span className='text-muted fw-semobold text-muted d-block fs-7'>
                  {formatDate(item.created_at)}
                </span>
              </div>
            </div>
          </td>
          <td>
            <BannerTypeElement
              TYPE={item.type}
            />
          </td>
          <td>
            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
              {item.expires_at ? moment(item.expires_at).format('DD/MM/YYYY') : 'Không thời hạn'}
            </span>
          </td>
          <td>
            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
              Tất cả
            </span>
          </td>
          <td>
            <div className='d-flex justify-content-end flex-shrink-0'>
              <PermissionLayout permissions={['v1.banners.update']}>
                <Link
                  to={{
                    pathname: `/pages/banners-form/${item.id}`,
                  }}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                </Link>
              </PermissionLayout>
              <PermissionLayout permissions={['v1.banners.destroy']}>
                <button
                  onClick={() => mutate(item.id)} disabled={isLoading}
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  {
                    isLoading ?
                      <CircularProgress size={12} />
                      :
                      <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                  }
                </button>
              </PermissionLayout>
            </div>
          </td>
        </tr>
      ))}
    </>
    // </SortableList>
  )
}

