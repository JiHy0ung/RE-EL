import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpComingMovies = () => {
  return api.get(`/movie/upcoming?language=en-US&page=1`, {
    params: {
      language: "ko-KR",
    },
  });
};

export const useUpComingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcoming"],
    queryFn: fetchUpComingMovies,
    suspense: true,
    select: (result) => result.data.results,
  });
};
