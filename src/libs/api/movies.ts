import { QueryFunctionContext } from "@tanstack/react-query";
import instance from ".";
import withApiError from "../utils/withApiError";
import {
  Genre,
  ICredits,
  IMovieDetail,
  IMovies,
  IReviews,
  IVideos,
} from "./types";

/**
 * queryKey: ["movies", id, lng] | ["movies", id, type, lng]
 */
export const movie = {
  getDetail: withApiError(async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IMovieDetail>(`/movie/${queryKey[1]}?language=${queryKey[2]}`)
      .then((res) => res.data)
  ),
  getCredits: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<ICredits>(
        `/movie/${queryKey[1]}/${queryKey[2]}?language=${queryKey[3]}`
      )
      .then((res) => res.data),
  getReviews: async ({ queryKey, pageParam = 1 }: QueryFunctionContext) =>
    instance
      .get<IReviews>(
        `/movie/${queryKey[1]}/${queryKey[2]}?page=${pageParam}?language=${queryKey[3]}`
      )
      .then((res) => res.data),
  getSimilar: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IMovies>(
        `/movie/${queryKey[1]}/${queryKey[2]}?language=${queryKey[3]}`
      )
      .then((res) => res.data),
  getVideos: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IVideos>(
        `/movie/${queryKey[1]}/${queryKey[2]}?language=${queryKey[3]}`
      )
      .then((res) => res.data),
};

/**
 * queryKey: ["movies", "now_playing" | "upcoming" | "top_rated", lng]
 */
export const movies = {
  getNowPlaying: withApiError(
    async ({ queryKey, pageParam = 1 }: QueryFunctionContext) =>
      instance
        .get<IMovies>(
          `/movie/${queryKey[1]}?page=${pageParam}&language=${queryKey[2]}`
        )
        .then((res) => res.data)
  ),
  getUpcoming: async ({ queryKey, pageParam = 1 }: QueryFunctionContext) =>
    instance
      .get<IMovies>(
        `/movie/${queryKey[1]}?page=${pageParam}&language=${queryKey[2]}`
      )
      .then((res) => res.data),
  getTopRated: async ({ queryKey, pageParam = 1 }: QueryFunctionContext) =>
    instance
      .get<IMovies>(
        `/movie/${queryKey[1]}?page=${pageParam}&language=${queryKey[2]}`
      )
      .then((res) => res.data),
};

/**
 * queryKey: ["discover", "movie", lng, queryString]
 */
export const discover = {
  getDiscoveredMovies: async ({
    pageParam = 1,
    queryKey,
  }: QueryFunctionContext) =>
    instance
      .get<IMovies>(
        `/discover/${queryKey[1]}?page=${pageParam}&language=${queryKey[2]}${
          queryKey[3] ? `&${queryKey[3]}` : ""
        }`
      )
      .then((res) => res.data),
  getTotalResults: async (query: string) =>
    instance
      .get<IMovies>(`/discover/movie?${query}`)
      .then((res) => res.data.total_results),
};

/**
 * queryKey: ["search", "movie", lng, query]
 */
export const search = {
  getMovies: async ({ queryKey, pageParam = 1 }: QueryFunctionContext) =>
    instance
      .get<IMovies>(
        `/search/${queryKey[1]}?query=${queryKey[3]}&page=${pageParam}&language=${queryKey[2]}`
      )
      .then((res) => res.data),
};

/**
 * queryKey: ["genres", lng]
 */
export const genres = {
  getGenres: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<{ genres: Genre[] }>(`/genre/movie/list?language=${queryKey[1]}`)
      .then((res) => res.data.genres),
};
