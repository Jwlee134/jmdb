import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Review from "../components/Review";
import { movie } from "../libs/api/movies";
import useIntersectionObserver from "../libs/hooks/useIntersectionObserver";
import { placeholders } from "../libs/utils";

export default function Reviews() {
  const { id } = useParams();
  const { state } = useLocation();
  const { data, fetchNextPage } = useInfiniteQuery({
    queryFn: movie.getReviews,
    queryKey: ["movies", id, "reviews"],
    getNextPageParam: (lastPage) =>
      lastPage.page === lastPage.total_pages ? undefined : lastPage.page + 1,
  });
  const ref = useIntersectionObserver(fetchNextPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>JMDB | Reviews</title>
      </Helmet>
      <Header
        showBackBtn
        title="Reviews"
        subTitle={`${
          state?.total ||
          data?.pages?.map((page) => page.results).flat().length ||
          0
        } Reviews`}
      />
      <div className="pt-20 pb-6 max-md:space-y-6 md:grid md:grid-cols-2 md:gap-3">
        {(
          data?.pages?.map((page) => page.results).flat() || placeholders(10)
        ).map((data) => (
          <Review key={data.id} data={data} />
        ))}
        <div ref={ref} />
      </div>
    </>
  );
}
