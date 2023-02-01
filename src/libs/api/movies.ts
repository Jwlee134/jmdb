import instance from ".";
import withApiError from "../utils/withApiError";
import {
  ICredits,
  IMovieDetail,
  IMovies,
  IPerson,
  IPersonMovieCredits,
  IReviews,
  IVideos,
} from "./types";

/**
 * queryKey: ["movies", id]
 */
export const movie = {
  getDetail: withApiError(async ({ queryKey }) =>
    instance.get<IMovieDetail>(`/movie/${queryKey[1]}`).then((res) => res.data)
  ),
  getCredits: withApiError(async ({ queryKey }) =>
    instance
      .get<ICredits>(`/movie/${queryKey[1]}/credits`)
      .then((res) => res.data)
  ),
  getReviews: withApiError(async ({ queryKey }) =>
    instance
      .get<IReviews>(`/movie/${queryKey[1]}/reviews`)
      .then((res) => res.data)
  ),
  getSimilar: withApiError(async ({ queryKey }) =>
    instance
      .get<IMovies>(`/movie/${queryKey[1]}/similar`)
      .then((res) => res.data)
  ),
  getVideos: withApiError(async ({ queryKey }) =>
    instance
      .get<IVideos>(`/movie/${queryKey[1]}/videos`)
      .then((res) => res.data)
  ),
};

/**
 * queryKey: ["movies", "nowPlaying" | "upcoming" | "topRated"]
 */
export const movies = {
  getNowPlaying: withApiError(async () =>
    instance.get<IMovies>("/movie/now_playing").then((res) => res.data)
  ),
  getUpcoming: withApiError(async () =>
    instance.get<IMovies>("/movie/upcoming").then((res) => res.data)
  ),
  getTopRated: withApiError(async () =>
    instance.get<IMovies>("/movie/top_rated").then((res) => res.data)
  ),
};

/**
 * queryKey: ["discover", "movies"]
 */
export const discover = {
  getDiscoveredMovies: withApiError(async () =>
    instance.get<IMovies>(`/discover/movie`).then((res) => res.data)
  ),
};

/**
 * queryKey: ["trending", "movie" | "person"]
 */
export const trending = {
  getTrending: withApiError(async ({ queryKey }) =>
    instance
      .get<IMovies>(`/trending/${queryKey[1]}/day`)
      .then((res) => res.data)
  ),
};

/**
 * queryKey: ["search", "movies", query]
 */
export const search = {
  getMovies: withApiError(async ({ queryKey }) =>
    instance
      .get<IMovies>(`/search/movie?query=${queryKey[1]}`)
      .then((res) => res.data)
  ),
};

/**
 * queryKey: ["person", id]
 */
export const person = {
  getDetail: withApiError(async ({ queryKey }) =>
    instance.get<IPerson>(`/person/${queryKey[1]}`).then((res) => res.data)
  ),
  getMovieCredits: withApiError(async ({ queryKey }) =>
    instance
      .get<IPersonMovieCredits>(`/person/${queryKey[1]}/movie_credits`)
      .then((res) => res.data)
  ),
};
