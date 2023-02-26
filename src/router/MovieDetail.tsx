import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Poster from "../components/Poster";
import Profile from "../components/Profile";
import ScrollView from "../components/containers/ScrollContainer";
import Section from "../components/Section";
import Skeleton from "../components/Skeleton";
import Video from "../components/Video";
import { movie } from "../libs/api/movies";
import useImageLoad from "../libs/hooks/useImageLoad";
import { formatRuntime, makeImgPath, placeholders } from "../libs/utils";
import Review from "../components/Review";
import { useEffect } from "react";
import HeaderContainer from "../components/containers/HeaderContainer";
import FavIcon from "../components/FavIcon";
import { Helmet } from "react-helmet";
import RatioSkeleton from "../components/RatioSkeleton";
import { useTranslation } from "react-i18next";
import useBoundStore from "../store";

export default function MovieDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const lng = useBoundStore((state) => state.lng);
  const [
    { data: details },
    { data: credits },
    { data: similars },
    { data: videos },
  ] = useQueries({
    queries: [
      {
        queryFn: movie.getDetail,
        queryKey: ["movies", id, lng],
        useErrorBoundary: true,
      },
      {
        queryFn: movie.getCredits,
        queryKey: ["movies", id, "credits", lng],
      },
      {
        queryFn: movie.getSimilar,
        queryKey: ["movies", id, "similar", lng],
      },
      {
        queryFn: movie.getVideos,
        queryKey: ["movies", id, "videos", lng],
      },
    ],
  });
  const { data: reviews } = useInfiniteQuery({
    queryFn: movie.getReviews,
    queryKey: ["movies", id, "reviews"],
    useErrorBoundary: true,
  });
  const loaded = useImageLoad(
    details
      ? [
          ...(!state?.backdrop_path
            ? [makeImgPath(details.backdrop_path, 780)]
            : []),
          makeImgPath(details.poster_path),
        ]
      : ""
  );
  const { t } = useTranslation();
  const isReady = details && loaded;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <HeaderContainer
      Header={
        <Header
          transparent
          rightIcons={
            isReady ? [<FavIcon transparent details={details} />] : null
          }
        />
      }
      overwrap
    >
      <Helmet>
        <title>{details ? `JMDB | ${details.title}` : "Loading"}</title>
      </Helmet>
      <div className="relative pt-[100%] sm:pt-[80%] overflow-hidden">
        {state?.backdrop_path ? (
          <img
            src={makeImgPath(state.backdrop_path, 780)}
            alt="Backdrop"
            className="absolute top-0 left-0 right-0 bottom-0 object-cover w-full h-full blur-sm"
          />
        ) : isReady ? (
          <img
            src={makeImgPath(details.backdrop_path, 780)}
            alt="Backdrop"
            className="absolute top-0 left-0 right-0 bottom-0 object-cover w-full h-full blur-sm"
          />
        ) : null}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black flex items-end p-6 gap-3">
          <div className="w-[40%]">
            <div className="relative pt-[150%] rounded-2xl overflow-hidden">
              {state?.poster_path ? (
                <img
                  className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
                  src={makeImgPath(state.poster_path)}
                  alt="poster"
                />
              ) : isReady ? (
                <img
                  className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
                  src={makeImgPath(details.poster_path)}
                  alt="poster"
                />
              ) : (
                <RatioSkeleton />
              )}
            </div>
          </div>
          <div className="w-[60%] space-y-1">
            {isReady ? (
              <>
                <div>
                  <span className="text-xl text-gray-200">{details.title}</span>{" "}
                  {details.release_date ? (
                    <span className="text-xs text-gray-400">
                      ({details.release_date.split("-")[0] || "0000"})
                    </span>
                  ) : null}
                </div>
                <div className="text-sm font-light text-gray-400">
                  {details.vote_average ? (
                    <>
                      <span className="text-yellow-300">★</span>{" "}
                      <span>{details.vote_average.toFixed(1)}</span>
                    </>
                  ) : null}
                  {details.runtime ? (
                    <>
                      {details.vote_average ? (
                        <span className="mx-2">•</span>
                      ) : null}
                      <span>{formatRuntime(details.runtime)}</span>
                    </>
                  ) : null}
                </div>
                {details.genres.length ? (
                  <div className="text-sm font-light text-gray-400">
                    {details.genres.map((genre) => genre.name).join(" / ")}
                  </div>
                ) : null}
              </>
            ) : (
              <Skeleton count={3} />
            )}
          </div>
        </div>
      </div>
      <Section headerTitle={t("overview")}>
        <p className="px-6 text-sm text-gray-600 dark:text-gray-400 font-light">
          {isReady ? details.overview || t("noInfo") : <Skeleton count={5} />}
        </p>
      </Section>
      <Section headerTitle={t("casts")}>
        <ScrollView
          data={credits?.cast}
          renderItem={(data) => (
            <Profile
              key={
                "credit_id" in data.item ? data.item.credit_id : data.item.id
              }
              {...data}
            />
          )}
          cacheKey="casts"
          emptyText={t("noInfo")!}
        />
      </Section>
      <Section headerTitle={t("videos")}>
        <ScrollView
          data={videos?.results}
          renderItem={({ item }) => <Video key={item.id} data={item} />}
          emptyText={t("noInfo")!}
        />
      </Section>
      <Section headerTitle={t("reviews")}>
        <div className="space-y-6">
          {(reviews?.pages[0].results.slice(0, 2) || placeholders(2)).map(
            (data) => (
              <Review key={data.id} data={data} />
            )
          )}
        </div>
        {reviews && !reviews.pages[0].results.length ? (
          <p className="px-6 text-sm text-gray-400 font-light">{t("noInfo")}</p>
        ) : null}
        {reviews && reviews.pages[0].total_results > 2 ? (
          <div className="px-6 mt-6">
            <Link
              to={`/movie/${details?.id}/reviews`}
              className="block bg-gray-100 dark:bg-gray-800 w-full rounded-lg py-3 text-center"
              state={{ total: reviews.pages[0].total_results }}
            >
              {t("seeTotalReviews", { n: reviews.pages[0].total_results })}
            </Link>
          </div>
        ) : null}
      </Section>
      <Section headerTitle={t("similarMovies")}>
        <ScrollView
          data={similars?.results}
          renderItem={(data) => <Poster key={data.item.id} {...data} />}
          cacheKey="similarMovies"
          emptyText={t("noInfo")!}
        />
      </Section>
    </HeaderContainer>
  );
}
