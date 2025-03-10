import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import APIClient, { FetchResponse } from "../services/api-client";

const apiClient = new APIClient<Genre>("/genres");

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24 * mins * secs * millisecs 24hrs data will be fresh for 24hrs no request will be made to the backend to fetch the genres
    // So we don't have to go to the backend and show the user a spinner
    initialData: { count: genres.length, results: genres }, // this is to ensure type matches FetchResponse
  });

export default useGenres;
