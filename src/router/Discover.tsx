import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { discover } from "../libs/api/movies";
import useIntersectionObserver from "../libs/hooks/useIntersectionObserver";
import { placeholders } from "../libs/utils";
import { BsFilter } from "react-icons/bs";
import HeaderBtn from "../components/HeaderBtn";
import useBoundStore from "../store";
import Portal from "../components/Portal";
import FilterModal from "../components/FilterModal";
import HorizontalPoster from "../components/HorizontalPoster";

function FilterBtn() {
  const openModal = useBoundStore((state) => state.openModal);

  return (
    <HeaderBtn onClick={openModal}>
      <BsFilter />
    </HeaderBtn>
  );
}

export default function Discover() {
  const { search } = useLocation();
  const setTotalResults = useBoundStore((state) => state.setTotalResults);
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["discover", "movies", search.replace("?", "")],
    queryFn: discover.getDiscoveredMovies,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    onSuccess(data) {
      setTotalResults(data.pages[0].total_results);
    },
  });
  const ref = useIntersectionObserver(fetchNextPage);

  return (
    <>
      <Header title="Discover" showBackBtn rightBtns={[<FilterBtn />]} />
      <div className="p-6 space-y-4">
        {(
          data?.pages?.map((page) => page.results).flat() || placeholders(10)
        ).map((movie) => (
          <HorizontalPoster key={movie.id} data={movie} />
        ))}
        <div ref={ref} />
      </div>
      <Portal>
        <FilterModal />
      </Portal>
    </>
  );
}
