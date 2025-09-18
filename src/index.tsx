/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./app/redux/store";
// Axios
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
// Apps
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
//@ts-ignore
import 'react-date-range/dist/styles.css'; // main style file
//@ts-ignore
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AppRoutes } from './app/routing/AppRoutes'
import { AuthProvider, setupAxios } from './app/modules/auth'
//config SWR
import { SWRConfig } from 'swr';
import { AUTH_HEADER } from './app/api/config_header';
import { axiosClient } from 'app/configs';
//@ts-ignore
import '../public/font/style.css'
import { RootProvider } from 'app/context';
import './i18n'

setupAxios(axios)
Chart.register(...registerables)

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 3600 * 10
    }
  }
})

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <SWRConfig
      value={{ fetcher: (url) => axiosClient.get(url, AUTH_HEADER()), shouldRetryOnError: false }}
    >
      <RootProvider>
        <QueryClientProvider client={queryClient}>
          <MetronicI18nProvider>
            <Provider store={store}>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </Provider>
          </MetronicI18nProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RootProvider>
    </SWRConfig>
  )
}
