/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIntl } from 'react-intl'
import { AsideMenuItem } from './AsideMenuItem'
import { IOrganization, IPermission } from 'app/interface'
import { useAuth } from 'app/modules/auth'
import { useLocation, useParams } from 'react-router-dom'
import { useSwr } from 'app/hooks'
import { API_ROUTE } from 'app/api/api-route'
import { Avatar, PermissionLayout } from 'app/components'
import { useDispatch } from 'react-redux'
import { onSetOrganization } from 'app/redux/organizationSlice'
// import { checkMethod } from 'app/util'
// import { toAbsoluteUrl } from '_metronic/helpers'

const AsideMenuInitList = [
  { to: 'pages/banners', icon: '/media/icons/duotune/general/gen006.svg', title: 'Banners' },
  { to: 'pages/discounts', icon: '/media/icons/duotune/finance/fin008.svg', title: 'Giảm giá' },
  { to: 'pages/orders', icon: '/media/icons/duotune/ecommerce/ecm002.svg', title: 'Đơn hàng' },
  { to: 'pages/users', icon: '/media/icons/duotune/communication/com006.svg', title: 'Khách hàng' },
  {
    to: 'pages/organizations',
    icon: '/media/icons/duotune/abstract/abs022.svg',
    title: 'Doanh nghiệp',
  },
  { to: 'pages/products', icon: '/media/icons/duotune/ecommerce/ecm005.svg', title: 'Sản phẩm' },
  { to: 'pages/services', icon: '/media/icons/duotune/abstract/abs047.svg', title: 'Dịch vụ' },
  { to: 'pages/roles', icon: '/media/icons/duotune/general/gen049.svg', title: 'Phân quyền' },
]

export function AsideMenuMain() {
  const dispatch = useDispatch()
  const intl = useIntl()
  const params: any = useParams()
  const location = useLocation()
  const permissions: IPermission[] = useAuth().permissionsUser
  const generateRoute = permissions?.map((i: IPermission) => {
    const route = i.name.split('.')[1]
    // const method = checkMethod(i.name.split('.')[i.name.split('.').length - 1])
    let path = `pages/${route}`
    return path
  })

  // if (location.pathname === `/pages/organizations/${params.id}`) conditionOrg = true
  // if (location.pathname === `/pages/organizations/${params.id}/services`) conditionOrg = true
  // if (location.pathname === `/pages/organizations/${params.id}/products`) conditionOrg = true
  // if (location.pathname === `/pages/organizations/${params.id}/orders`) conditionOrg = true
  // if (location.pathname === `/pages/organizations/${params.id}/product-categories`)
  //   conditionOrg = true
  // if (location.pathname === `/pages/organizations/${params.id}/service-categories`)
  //   conditionOrg = true
  // if (location.pathname === `/pages/organizations/${params.id}/moba-galleries`) conditionOrg = true
  // const org = useSwr(conditionOrg, API_ROUTE.ORGANIZATIONS_ID(params.id)).response
  const validPathsOrg = [
    `/pages/organizations/${params.id}`,
    `/pages/organizations/${params.id}/services`,
    `/pages/organizations/${params.id}/products`,
    `/pages/organizations/${params.id}/orders`,
    `/pages/organizations/${params.id}/product-categories`,
    `/pages/organizations/${params.id}/service-categories`,
    `/pages/organizations/${params.id}/moba-galleries`,
  ]
  const conditionOrg = validPathsOrg.includes(location.pathname)
  const { response: org } = useSwr(conditionOrg, API_ROUTE.ORGANIZATIONS_ID(params.id), {}, {
    onSuccess(data) {
      dispatch(onSetOrganization(data.context))
    },
  })

  return org ? (
    <AsideMenuMainOrg org={org} />
  ) : (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Menu</span>
        </div>
      </div>
      <AsideMenuItem
        to='pages/gov'
        icon='/media/icons/duotune/files/fil001.svg'
        title='Thống kê'
      />
      <AsideMenuItem
        to='pages/banners'
        icon='/media/icons/duotune/general/gen006.svg'
        title='Banners'
      />
      <AsideMenuItem
        to='pages/promotions'
        icon='/media/icons/duotune/finance/fin008.svg'
        title='Promotions'
      />
      <AsideMenuItem
        to='pages/discounts'
        icon='/media/icons/duotune/finance/fin008.svg'
        title='Giảm giá'
      />
      <PermissionLayout permissions={['v1.beautyx.notification.sendNotification']}>
        <AsideMenuItem
          to='pages/push-notifications'
          icon='/media/icons/duotune/communication/com004.svg'
          title='Push thông báo'
        />
      </PermissionLayout>
      {/* <AsideMenuItem
        to='pages/setup-home'
        icon='/media/icons/duotune/coding/cod001.svg'
        title='Thiết kế Trang chủ Beautyx'
      /> */}
      <AsideMenuItem to='pages/tips' icon='/media/icons/duotune/coding/cod004.svg' title='Tip' />
      <AsideMenuItem
        to='pages/approves'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Lịch sử kiểm duyệt'
      />
      <AsideMenuItem
        to='pages/organizations'
        icon='/media/icons/duotune/general/gen051.svg'
        title='Danh sách Merchant'
      />
      <AsideMenuItem
        to='pages/contracts'
        icon='/media/icons/duotune/files/fil004.svg'
        title='Hợp đồng'
      />
      <AsideMenuItem
        to='pages/customers'
        icon='/media/icons/duotune/communication/com013.svg'
        title='Khách hàng'
      />
      <PermissionLayout permissions={['v1.admin.users.index']}>
        <AsideMenuItem
          to='pages/accounts'
          icon='/media/icons/duotune/communication/com013.svg'
          title='Đội ngũ'
        />
      </PermissionLayout>
      <PermissionLayout permissions={['v1.roles.index', 'v1.permissions.index']}>
        <AsideMenuItem
          to='pages/roles'
          icon='/media/icons/duotune/general/gen051.svg'
          title='Phân quyền'
        />
      </PermissionLayout>
      <PermissionLayout permissions={['v1.admin.orders.index']}>
        <AsideMenuItem
          to='pages/orders'
          icon='/media/icons/duotune/finance/fin008.svg'
          title='Danh sách đơn hàng'
        />
      </PermissionLayout>
      {/* <AsideMenuItem
        to='pages/trends'
        icon='/media/icons/duotune/files/fil004.svg'
        title='Trends'
      /> */}

      {AsideMenuInitList.map((item, index: number) =>
        generateRoute?.includes(item.to) ? (
          <AsideMenuItem key={index} to={item.to} icon={item.icon} title={item.title} />
        ) : (
          <div key={index}></div>
        )
      )}

      {/* <AsideMenuItemWithSub
        icon='/media/icons/duotune/coding/cod002.svg'
        to='/crafted/pages/profile'
        title='Cộng đồng & kiểm duyệt'
      >
        <AsideMenuItem
          to='pages/community'
          icon='/media/icons/duotune/files/fil004.svg'
          title='Cộng đồng'
        />
        <AsideMenuItem
          to='pages/community'
          icon='/media/icons/duotune/files/fil004.svg'
          title='Kiểm duyệt bài viết'
        />
      </AsideMenuItemWithSub> */}
    </>
  )
}

interface AsideMenuMainOrgProps {
  org: IOrganization
}

const AsideMenuMainOrg = (props: AsideMenuMainOrgProps) => {
  const { org } = props
  const AsideMenuOrgList = [
    // {
    //   to: `pages/organizations/${org.id}/moba-galleries`,
    //   icon: '/media/icons/duotune/general/gen006.svg',
    //   title: 'Bộ sưu tập',
    // },
    // {
    //   to: `pages/organizations/${org.id}/service-categories`,
    //   icon: '/media/icons/duotune/finance/fin008.svg',
    //   title: 'Danh mục dịch vụ',
    // },
    {
      to: `pages/organizations/${org.id}/services`,
      icon: '/media/icons/duotune/ecommerce/ecm002.svg',
      title: 'Dịch vụ',
    },
    // {
    //   to: `pages/organizations/${org.id}/product-categories`,
    //   icon: '/media/icons/duotune/finance/fin008.svg',
    //   title: 'Danh mục sản phẩm',
    // },
    // {
    //   to: `pages/organizations/${org.id}/products`,
    //   icon: '/media/icons/duotune/ecommerce/ecm005.svg',
    //   title: 'Sản phẩm',
    // },
    {
      to: `pages/organizations/${org.id}/orders`,
      icon: '/media/icons/duotune/ecommerce/ecm002.svg',
      title: 'Đơn hàng',
    },
  ]
  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2 d-flex align-items-center'>
          <Avatar size={38} src={org.image_url} />
          <span className='menu-section text-muted text-uppercase fs-6 ms-2'>{org.name}</span>
        </div>
      </div>
      {AsideMenuOrgList.map((item) => (
        <AsideMenuItem key={item.to} to={item.to} icon={item.icon} title={item.title} />
      ))}
    </>
  )
}
