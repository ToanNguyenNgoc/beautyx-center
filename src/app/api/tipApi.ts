import { API_ROUTE } from "./api-route";
import { axiosClient } from "configs";
import { pickBy, identity } from "lodash"
import { AUTH_HEADER } from "./config_header"
import { PostTip, Tips, ResponseType, Response } from "app/interface";
class TipApi {
    getAll = () => {
        const params = {
            "page": 1,
            "limit": 15
        }
        return axiosClient.get(API_ROUTE.TIPS, { params }).then<ResponseType<Tips[]>>(res => res.data)
    };
    getById = (id: number) => {
        return axiosClient.get(API_ROUTE.TIPS_ID(id)).then<Response<Tips>>(res => res.data)
    };
    postTip = (values: PostTip) => {
        const params = pickBy(values, identity)
        return axiosClient.post(API_ROUTE.TIPS, params, AUTH_HEADER())
    }
    updateTip = (id: number, values: PostTip) => {
        return axiosClient.put(API_ROUTE.TIPS_ID(id), values, AUTH_HEADER()).then<Response<Tips>>(res => res.data)
    }
    deleteById = (id: number) => {
        return axiosClient.delete(API_ROUTE.TIPS_ID(id), AUTH_HEADER()).then<Response<Tips>>(res => res.data)
    };
}
const tipAPI = new TipApi();
export default tipAPI