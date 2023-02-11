import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Poster from "../components/Poster";
import Profile from "../components/Profile";
import ScrollView from "../components/ScrollView";
import Section from "../components/Section";
import Skeleton from "../components/Skeleton";
import Video from "../components/Video";
import { movie } from "../libs/api/movies";
import useImageLoad from "../libs/hooks/useImageLoad";
import { formatRuntime, makeImgPath, placeholders } from "../libs/utils";
import { IoHeartOutline } from "react-icons/io5";
import Review from "../components/Review";
import { useEffect } from "react";

export default function MovieDetail() {
  const { id } = useParams();
  const [
    { data: details },
    { data: credits },
    { data: similars },
    { data: videos },
  ] = useQueries({
    queries: [
      {
        queryFn: movie.getDetail,
        queryKey: ["movies", id],
      },
      {
        queryFn: movie.getCredits,
        queryKey: ["movies", id, "creidts"],
      },
      {
        queryFn: movie.getSimilar,
        queryKey: ["movies", id, "similars"],
      },
      {
        queryFn: movie.getVideos,
        queryKey: ["movies", id, "videos"],
      },
    ],
  });
  const { data: reviews } = useInfiniteQuery({
    queryFn: movie.getReviews,
    queryKey: ["movies", id, "reviews"],
  });
  const loaded = useImageLoad(
    details
      ? [
          makeImgPath(details.backdrop_path, 780),
          makeImgPath(details.poster_path),
        ]
      : ""
  );

  const isReady = details && loaded;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Header transparent rightIcons={[<IoHeartOutline />]} />
      <div className="relative pt-[100%] overflow-hidden">
        {isReady ? (
          <img
            src={makeImgPath(details.backdrop_path, 780)}
            alt="Backdrop"
            className="absolute top-0 left-0 right-0 bottom-0 object-cover w-full h-full blur-sm"
          />
        ) : null}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black flex items-end p-6 gap-3">
          <div className="w-[40%]">
            <div className="relative pt-[150%] rounded-2xl overflow-hidden">
              {isReady ? (
                <img
                  className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
                  src={makeImgPath(details.poster_path)}
                  alt="poster"
                />
              ) : (
                <Skeleton
                  containerClassName="overflow-hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full"
                  className="h-full"
                />
              )}
            </div>
          </div>
          <div className="w-[60%] space-y-1">
            {isReady ? (
              <>
                <div>
                  <span className="text-xl">{details.title}</span>{" "}
                  <span className="text-xs text-gray-400">
                    ({details.release_date.split("-")[0]})
                  </span>
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
      <Section headerTitle="Overview">
        <p className="px-6 text-sm text-gray-400 font-light">
          {isReady ? (
            details.overview || "No Overview provided."
          ) : (
            <Skeleton count={5} />
          )}
        </p>
      </Section>
      <Section headerTitle="Casts">
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
        />
      </Section>
      <Section headerTitle="Videos">
        <ScrollView
          data={videos?.results}
          renderItem={({ item }) => <Video key={item.id} data={item} />}
        />
        {videos && !videos.results.length ? (
          <p className="px-6 text-sm text-gray-400 font-light">
            No Videos provided.
          </p>
        ) : null}
      </Section>
      <Section headerTitle="Reviews">
        <div className="space-y-6">
          {(reviews?.pages[0].results.slice(0, 2) || placeholders(2)).map(
            (data) => (
              <Review key={data.id} data={data} />
            )
          )}
        </div>
        {reviews && !reviews.pages[0].results.length ? (
          <p className="px-6 text-sm text-gray-400 font-light">
            No Reviews exist.
          </p>
        ) : null}
        {reviews && reviews.pages[0].total_results > 2 ? (
          <div className="px-6 mt-6">
            <Link
              to={`/movie/${details?.id}/reviews`}
              className="block bg-gray-800 w-full rounded-lg py-3 text-center"
              state={{ total: reviews.pages[0].total_results }}
            >
              See {reviews.pages[0].total_results} reviews
            </Link>
          </div>
        ) : null}
      </Section>
      <Section headerTitle="Similar Movies">
        <ScrollView
          data={similars?.results}
          renderItem={(data) => <Poster key={data.item.id} {...data} />}
          cacheKey="similarMovies"
        />
      </Section>
    </>
  );
}
