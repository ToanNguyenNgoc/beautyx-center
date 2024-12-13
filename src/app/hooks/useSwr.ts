import { identity, pickBy } from 'lodash'
import useSWR from 'swr'
import { Configuration, Fetcher } from 'swr/dist/types'

type CallBack = {
  onSuccess?: (data: any, key: string, config: Readonly<Required<Configuration<any, any, Fetcher<any>>>>) => void,
  onError?: ((err: any, key: string, config: Readonly<Required<Configuration<any, any, Fetcher<any>>>>) => void)
}

export function useSwr(condition: any, API_URL: string, query?: any, callBack?: CallBack) {
  let result
  let response
  let responseArray = []
  let paramsURL = ''
  let totalItem = 1
  let totalPage = 1
  let initData
  if (query) {
    paramsURL = `?${new URLSearchParams(pickBy(query, identity)).toString()}`
  }
  const { data, isValidating, mutate, error } = useSWR(condition && `${API_URL}${paramsURL}`, {
    revalidateOnFocus: false,
    // refreshInterval: refresh_time
    onSuccess(data, key, config) {
      if (callBack?.onSuccess) {
        callBack.onSuccess(data.data, key, config)
      }
    },
    onError(err, key, config) {
      if (callBack?.onError) {
        callBack.onError(err, key, config)
      }
    },
  })
  if (data) {
    response = data?.data?.context ?? data
    responseArray = data?.data?.data?.hits ?? data?.data?.context?.data
    result = data
    totalItem = data?.data?.context?.total ?? data?.data?.total
    totalPage = data?.data?.context?.last_page ?? data?.data?.last_page
  }
  return {
    result,
    response,
    responseArray,
    isValidating,
    mutate,
    initData,
    error,
    totalItem,
    totalPage,
  }
}
