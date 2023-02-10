import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { IMovies } from "../libs/api/types";
import useIntersectionObserver from "../libs/hooks/useIntersectionObserver";
import { placeholders } from "../libs/utils";
import HorizontalPoster from "./HorizontalPoster";

interface IProps {
  data?: InfiniteData<IMovies>;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<IMovies, unknown>>;
}

export default function SearchList({ data, fetchNextPage }: IProps) {
  const ref = useIntersectionObserver(fetchNextPage);

  return (
    <div className="p-6 space-y-4">
      {(
        data?.pages?.map((page) => page.results).flat() || placeholders(10)
      ).map((movie) => (
        <HorizontalPoster key={movie.id} data={movie} />
      ))}
      <div ref={ref} />
    </div>
  );
}
