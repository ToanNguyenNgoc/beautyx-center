/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { ForgotPassword } from './components/ForgotPassword'
import { Login } from './components/Login'
import { Login_demo } from './components/Login_demo'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { useRootContext } from 'app/hooks'
import Slider, { Settings } from "react-slick";
import './style.scss';
//@ts-ignore
import "slick-carousel/slick/slick.css";
//@ts-ignore
import "slick-carousel/slick/slick-theme.css";
import { SITE } from 'app/context'

const AuthLayout = () => {
  const { onChangeSite, isGmupSite } = useRootContext();
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, []);
  const getInitSlide = () => {
    let init = 0;
    if (isGmupSite) init = 1;
    return init
  }
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: getInitSlide(),
    afterChange(currentSlide) {
      if (currentSlide == 0) onChangeSite(SITE.BEAUTYX);
      if (currentSlide == 1) onChangeSite(SITE.GMUP);
    }
  }


  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed page-cnt'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
      }}
    >
      <div className="site">
        <div className='site-cnt' >
          <Slider {...settings}  >
            <div>
              <img alt='Logo' src={toAbsoluteUrl('/media/logos/default.svg')} className='w-100' />
            </div>
            <div>
              <div className='h-70px w-100 d-flex align-items-center justify-content-center'>
                <img alt='Logo' style={{ color: 'var(--kt-gray-900)' }} src={toAbsoluteUrl('/media/logos/gmup-text-logo-black.svg')} className='h-45px' />
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div className=''>
        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login_demo' element={<Login_demo />} />
      <Route path='login' element={<Login />} />
      {/* <Route path='registration' element={<Registration />} /> */}
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export { AuthPage }
