import { ResponseList } from "app/@types";
import { TopicApi } from "app/api";
import { ITopic } from "app/interface";
import { useQuery, UseQueryOptions } from "react-query";

export function useGetAllTopics(options?: UseQueryOptions<{ context: ResponseList<ITopic[]> }>) {
  const query = useQuery<{ context: ResponseList<ITopic[]> }>({
    queryKey: ['ALL_TOPIC'],
    queryFn: () => TopicApi.getTopics(),
    ...options
  })
  const topics = query.data?.context.data || [];
  return Object.assign(query, {
    topics,
    topic_ids: topics.map(i => i._id)
  })
}