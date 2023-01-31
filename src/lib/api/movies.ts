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

export const movie = {
  getDetail: withApiError(async (id: number) =>
    instance.get<IMovieDetail>(`/movie/${id}`).then((res) => res.data)
  ),
  getCredits: withApiError(async (id: number) =>
    instance.get<ICredits>(`/movie/${id}/credits`).then((res) => res.data)
  ),
  getReviews: withApiError(async (id: number) =>
    instance.get<IReviews>(`/movie/${id}/reviews`).then((res) => res.data)
  ),
  getSimilar: withApiError(async (id: number) =>
    instance.get<IMovies>(`/movie/${id}/similar`).then((res) => res.data)
  ),
  getVideos: withApiError(async (id: number) =>
    instance.get<IVideos>(`/movie/${id}/videos`).then((res) => res.data)
  ),
};

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

export const discover = {
  getDiscoveredMovies: withApiError(async () =>
    instance.get<IMovies>(`/discover/movie`).then((res) => res.data)
  ),
};

export const trending = {
  getTrending: withApiError(async (mediaType: "movie" | "person") =>
    instance.get<IMovies>(`/trending/${mediaType}/day`).then((res) => res.data)
  ),
};

export const search = {
  getMovies: withApiError(async (query: string) =>
    instance
      .get<IMovies>(`/search/movie?query=${query}`)
      .then((res) => res.data)
  ),
};

export const person = {
  getDetail: withApiError(async (id: number) =>
    instance.get<IPerson>(`/person/${id}`).then((res) => res.data)
  ),
  getMovieCredits: withApiError(async (id: number) =>
    instance
      .get<IPersonMovieCredits>(`/person/${id}/movie_credits`)
      .then((res) => res.data)
  ),
};
