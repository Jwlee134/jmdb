import { QueryFunctionContext } from "@tanstack/react-query";
import instance from ".";
import withApiError from "../utils/withApiError";
import { IPersonDetail, IPersonImage, IPersonMovieCredits } from "./types";

/**
 * queryKey: ["person", id, lng]
 */
export const person = {
  getDetail: withApiError(async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IPersonDetail>(`/person/${queryKey[1]}?language=${queryKey[2]}`)
      .then((res) => res.data)
  ),
  getMovieCredits: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IPersonMovieCredits>(
        `/person/${queryKey[1]}/movie_credits?language=${queryKey[2]}`
      )
      .then((res) => res.data),
  getImages: async ({ queryKey }: QueryFunctionContext) =>
    instance
      .get<IPersonImage>(`/person/${queryKey[1]}/images`)
      .then((res) => res.data),
};
