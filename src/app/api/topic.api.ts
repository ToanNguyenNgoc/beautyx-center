import { axiosClient } from "app/configs";

export const TopicApi = {
  getTopics: () => axiosClient.get('/topics', { params: { l: 1000 } }).then(res => res.data),
}