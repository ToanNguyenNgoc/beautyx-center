/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC, Fragment } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout, AuthPage, useAuth } from '../modules/auth'
import { App } from '../App'
import { CustomerEvent } from 'app/pages/customers-event/CustomerEvent'
import { LocationTool } from 'app/pages/tools'
import { RegisterGlobalLayout } from 'app/components'
import ManagerTraffic from 'app/pages/manager-traffic/ManagerTraffic'
import { GovBeautyxMobile } from 'app/pages/gov-btx-mobile/GovBeautyxMobile'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = import.meta.env

const AppRoutes: FC = () => {
  const { currentUser } = useAuth();
  const user_role = "ADMIN";
  return (
    <Fragment>
      <BrowserRouter basename={PUBLIC_URL}>
        <Routes>
          <Route element={<App />}>
            <Route path='error/*' element={<ErrorsPage />} />
            <Route path='logout' element={<Logout />} />
            <Route path='vong-quay' element={<CustomerEvent />} />
            <Route path='gov-btx-mobile' element={<GovBeautyxMobile />} />
            {currentUser ? (
              <>
                <Route path='/*' element={<PrivateRoutes USER_ROLE={user_role} />} />
                <Route index element={<Navigate to='/dashboard' />} />
              </>
            ) : (
              <>
                <Route path='location-tool' element={<LocationTool />} />
                <Route path='manager-traffic' element={<ManagerTraffic />} />
                <Route path='auth/*' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
      <RegisterGlobalLayout />
    </Fragment>
  )
}

export { AppRoutes }
