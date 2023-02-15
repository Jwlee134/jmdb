import { QueryFunctionContext } from "@tanstack/react-query";
import instance from ".";
import withApiError from "../utils/withApiError";
import { ICredits, IMovieDetail, IMovies, IReviews, IVideos } from "./types";

/**
 * queryKey: ["movies", id]
 */
export const movie = {
  getDetail: withApiError(async ({ queryKey }: QueryFunctionContext) =>
    instance.get<IMovieDetail>(`/movie/${queryKey[1]}`).then((res) => res.data)
  ),
  getCredits: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<ICredits>(`/movie/${queryKey[1]}/credits`)
      .then((res) => res.data),
  getReviews: async ({ queryKey, pageParam = 1 }: QueryFunctionContext) =>
    instance
      .get<IReviews>(`/movie/${queryKey[1]}/reviews?page=${pageParam}`)
      .then((res) => res.data),
  getSimilar: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IMovies>(`/movie/${queryKey[1]}/similar`)
      .then((res) => res.data),
  getVideos: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IVideos>(`/movie/${queryKey[1]}/videos`)
      .then((res) => res.data),
};

/**
 * queryKey: ["movies", "nowPlaying" | "upcoming" | "topRated"]
 */
export const movies = {
  getNowPlaying: withApiError(async ({ pageParam = 1 }: QueryFunctionContext) =>
    instance
      .get<IMovies>(`/movie/now_playing?page=${pageParam}`)
      .then((res) => res.data)
  ),
  getUpcoming: async ({ pageParam = 1 }: QueryFunctionContext) =>
    instance
      .get<IMovies>(`/movie/upcoming?page=${pageParam}`)
      .then((res) => res.data),
  getTopRated: async ({ pageParam = 1 }: QueryFunctionContext) =>
    instance
      .get<IMovies>(`/movie/top_rated?page=${pageParam}`)
      .then((res) => res.data),
};

/**
 * queryKey: ["discover", "movies", queryString]
 */
export const discover = {
  getDiscoveredMovies: async ({
    pageParam = 1,
    queryKey,
  }: QueryFunctionContext) =>
    instance
      .get<IMovies>(
        `/discover/movie?page=${pageParam}${
          queryKey[2] ? `&${queryKey[2]}` : ""
        }`
      )
      .then((res) => res.data),
  getTotalResults: async (query: string) =>
    instance
      .get<IMovies>(`/discover/movie?${query}`)
      .then((res) => res.data.total_results),
};

/**
 * queryKey: ["search", "movies", query]
 */
export const search = {
  getMovies: async ({ queryKey, pageParam = 1 }: QueryFunctionContext) =>
    instance
      .get<IMovies>(`/search/movie?query=${queryKey[2]}&page=${pageParam}`)
      .then((res) => res.data),
};
