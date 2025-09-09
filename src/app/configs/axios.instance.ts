import { AUTH_LOCAL_TOKEN } from "app/modules/auth";
import axios from "axios";
import queryString from 'query-string';

interface AxiosInstanceOptions {
  baseURL?: string,
  version?: 'v1' | 'v2' | 'v3' | 'v4'
}

export const AxiosInstance = (options?: AxiosInstanceOptions) => {
  // const baseURL = options?.baseURL || (import.meta.env.VITE_REACT_APP_API_URL ?? import.meta.env.VITE_REACT_APP_API_LIVE).replace('/v1', '');
  const baseURL = options?.baseURL || ('http://localhost:8000/v1').replace('/v1', '');
  const version = options?.version || 'v1';
  const axiosClient = axios.create({
    baseURL: `${baseURL}/${version}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });

  axiosClient.interceptors.request.use(async (config) => {
    const session = window.sessionStorage.getItem(AUTH_LOCAL_TOKEN);
    const local = localStorage.getItem(AUTH_LOCAL_TOKEN)
    config = {
      ...config,
      headers: {
        'Authorization': `Bearer ${session ?? local}`
      }
    };
    return config;
  })

  return axiosClient;
}