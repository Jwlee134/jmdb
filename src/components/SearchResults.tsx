import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { IMovies } from "../libs/api/types";
import useIntersectionObserver from "../libs/hooks/useIntersectionObserver";
import { placeholders } from "../libs/utils";
import HorizontalPoster from "./HorizontalPoster";
import HorizontalPosterContainer from "./containers/HorizontalPosterContainer";
import ScrollToTopBtn from "./ScrollToTopBtn";

interface IProps {
  data?: InfiniteData<IMovies>;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<IMovies, unknown>>;
}

export default function SearchResults({ data, fetchNextPage }: IProps) {
  const ref = useIntersectionObserver(fetchNextPage);

  return (
    <>
      <HorizontalPosterContainer>
        {(
          data?.pages?.map((page) => page.results).flat() || placeholders(10)
        ).map((movie) => (
          <HorizontalPoster key={movie.id} data={movie} />
        ))}
        <div ref={ref} />
      </HorizontalPosterContainer>
      <ScrollToTopBtn />
    </>
  );
}
