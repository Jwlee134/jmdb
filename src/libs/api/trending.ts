import { QueryFunctionContext } from "@tanstack/react-query";
import instance from ".";
import withApiError from "../utils/withApiError";
import { IMovies, IPeople } from "./types";

/**
 * queryKey: ["trending", "movies" | "person", lng]
 */
export const trending = {
  getTrendingMovies: withApiError(async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IMovies>(`/trending/${queryKey[1]}/day?language=${queryKey[2]}`)
      .then((res) => res.data)
  ),
  getTrendingCelebs: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IPeople>(`/trending/${queryKey[1]}/day?language=${queryKey[2]}`)
      .then((res) => res.data),
};
