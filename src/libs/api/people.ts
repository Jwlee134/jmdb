import { QueryFunctionContext } from "@tanstack/react-query";
import instance from ".";
import { IPerson, IPersonMovieCredits } from "./types";

/**
 * queryKey: ["person", id]
 */
export const person = {
  getDetail: async ({ queryKey }: QueryFunctionContext) =>
    instance.get<IPerson>(`/person/${queryKey[1]}`).then((res) => res.data),
  getMovieCredits: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IPersonMovieCredits>(`/person/${queryKey[1]}/movie_credits`)
      .then((res) => res.data),
};
