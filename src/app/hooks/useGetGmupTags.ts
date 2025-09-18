import { QrGmupTag, ResponseDetail, ResponseList } from "app/@types";
import { QR_KEY } from "app/common";
import { AxiosInstance } from "app/configs";
import { ResGmupTag } from "app/interface";
import { useQuery } from "react-query";

export function useGetGmupTags(params: QrGmupTag) {
  const query = useQuery({
    queryKey: [QR_KEY.GmupTag, params],
    queryFn: () => AxiosInstance({ version: 'v4' })
      .get('/tags', { params })
      .then<ResponseDetail<ResponseList<ResGmupTag[]>>>(res => res.data),
  });
  const gmupTags = query.data?.context.data || [];
  return Object.assign(query, {
    gmupTags
  })
};