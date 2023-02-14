import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { discover } from "../libs/api/movies";
import useIntersectionObserver from "../libs/hooks/useIntersectionObserver";
import { placeholders } from "../libs/utils";
import { BsFilter } from "react-icons/bs";
import useBoundStore from "../store";
import Portal from "../components/Portal";
import FilterModal from "../components/FilterModal";
import HorizontalPoster from "../components/HorizontalPoster";
import { shallow } from "zustand/shallow";
import HeaderContainer from "../components/containers/HeaderContainer";
import HeaderBtn from "../components/HeaderBtn";
import HorizontalPosterContainer from "../components/containers/HorizontalPosterContainer";
import { Helmet } from "react-helmet";

export default function Discover() {
  const { search } = useLocation();
  const { setTotalResults, openModal } = useBoundStore(
    (state) => ({
      setTotalResults: state.setTotalResults,
      openModal: state.openModal,
    }),
    shallow
  );
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
    <HeaderContainer
      Header={
        <Header
          title="Discover"
          showBackBtn
          rightIcons={[
            <HeaderBtn onClick={openModal}>
              <BsFilter />
            </HeaderBtn>,
          ]}
        />
      }
    >
      <Helmet>
        <title>JMDB | Discover</title>
      </Helmet>
      <HorizontalPosterContainer>
        {(
          data?.pages?.map((page) => page.results).flat() || placeholders(10)
        ).map((movie) => (
          <HorizontalPoster key={movie.id} data={movie} />
        ))}
        <div ref={ref} />
      </HorizontalPosterContainer>
      <Portal>
        <FilterModal />
      </Portal>
    </HeaderContainer>
  );
}
