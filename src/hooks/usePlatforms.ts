import { useQuery } from "@tanstack/react-query";
import platforms from "../data/platforms";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24 * mins * secs * millisecs 24hrs data will be fresh for 24hrs no request will be made to the backend to fetch the genres
    initialData: { count: platforms.length, results: platforms }, // this is to ensure type matches FetchResponse
  });

export default usePlatforms;
