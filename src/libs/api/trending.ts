import { QueryFunctionContext } from "@tanstack/react-query";
import instance from ".";
import { IMovies, IPeople } from "./types";

/**
 * queryKey: ["trending", "movies" | "celebs"]
 */
export const trending = {
  getTrendingMovies: async ({
    queryKey,
    pageParam = 1,
  }: QueryFunctionContext) =>
    instance
      .get<IMovies>(`/trending/${queryKey[1]}/day?page=${pageParam}`)
      .then((res) => res.data),
  getTrendingCelebs: async ({
    queryKey,
    pageParam = 1,
  }: QueryFunctionContext) =>
    instance
      .get<IPeople>(`/trending/${queryKey[1]}/day?page=${pageParam}`)
      .then((res) => res.data),
};
