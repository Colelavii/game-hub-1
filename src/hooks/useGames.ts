import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import APIClient, { FetchResponse } from "../services/api-client";
import { Platform } from "./usePlatforms";

const apiClient = new APIClient<Game>("/games");

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) =>
  useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: (
      { pageParam = 1 } // queryFn to receive page number as a parameter (pageParam prop that reactQuery passes here)
    ) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam, // pass the page parameter to the backend and set it to page param
        },
      }),
    // React Query calls this function to compute the next page number, it takes two params lastPage and allPages - contains all data for
    // each page we have retrieved
    getNextPageParam: (lastPage, allPages) => {
      // To compute the next page number
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    //     staleTime: 24 * 60 * 60 * 1000, // 24 * mins * secs * millisecs 24hrs data will be fresh for 24hrs no request will be made to the backend to fetch the genres
  });

export default useGames;
