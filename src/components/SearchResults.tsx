import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import {
  useScroll,
  motion,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { IMovies } from "../libs/api/types";
import useIntersectionObserver from "../libs/hooks/useIntersectionObserver";
import { placeholders } from "../libs/utils";
import HorizontalPoster from "./HorizontalPoster";
import { IoArrowUpCircle } from "react-icons/io5";
import { useState } from "react";
import HorizontalPosterContainer from "./containers/HorizontalPosterContainer";

interface IProps {
  data?: InfiniteData<IMovies>;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<IMovies, unknown>>;
}

export default function SearchResults({ data, fetchNextPage }: IProps) {
  const ref = useIntersectionObserver(fetchNextPage);
  const { scrollY } = useScroll();
  const [showBtn, setShowBtn] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 1000) setShowBtn(true);
    else setShowBtn(false);
  });

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
      <AnimatePresence>
        {showBtn ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed bottom-16 w-full max-w-[inherit] px-6 py-4 z-[999] grid place-items-end pointer-events-none"
          >
            <button
              className="w-10 h-10 text-4xl grid place-items-center pointer-events-auto"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <IoArrowUpCircle />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
