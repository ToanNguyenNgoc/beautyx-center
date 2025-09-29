import { QrComment, ResponseDetail, ResponseList } from "app/@types";
import { QR_KEY } from "app/common";
import { AxiosInstance } from "app/configs";
import { ResComment } from "app/interface";
import { useQuery, UseQueryOptions } from "react-query";

type ResponseQuery = ResponseDetail<ResponseList<ResComment[]>>

export function useGetComments(params?: QrComment, options?: UseQueryOptions<ResponseQuery>) {
  const query = useQuery({
    queryKey: [QR_KEY.Comments, params],
    queryFn: () => AxiosInstance().get('/admin/comments', { params }).then<ResponseQuery>(res => res.data),
    retry: false,
    ...options,
  });
  const comments = query.data?.context.data || [];
  return {
    ...query,
    comments
  }
}