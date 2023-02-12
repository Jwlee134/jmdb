import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Image from "../components/Image";
import Poster from "../components/Poster";
import ScrollView from "../components/containers/ScrollContainer";
import Section from "../components/Section";
import Skeleton from "../components/Skeleton";
import { person } from "../libs/api/people";
import useImageLoad from "../libs/hooks/useImageLoad";
import { makeImgPath } from "../libs/utils";

export default function PersonDetail() {
  const { id } = useParams();
  const [{ data: details }, { data: movieCredits }, { data: images }] =
    useQueries({
      queries: [
        { queryFn: person.getDetail, queryKey: ["person", id] },
        {
          queryFn: person.getMovieCredits,
          queryKey: ["person", id, "movieCredits"],
        },
        { queryFn: person.getImages, queryKey: ["person", id, "images"] },
      ],
    });
  const loaded = useImageLoad(
    details ? makeImgPath(details.profile_path, 300) : ""
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
            src={makeImgPath(details.profile_path, 300)}
            alt="Backdrop"
            className="absolute top-0 left-0 right-0 bottom-0 object-cover w-full h-full blur-sm"
          />
        ) : null}
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black flex gap-3 items-end p-6">
          <div className="w-[45%]">
            <div className="relative pt-[150%] rounded-2xl overflow-hidden">
              {isReady ? (
                <img
                  className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
                  src={makeImgPath(details.profile_path, 300)}
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
          <div className="w-[55%] space-y-1">
            {isReady ? (
              <>
                <div className="text-xl">{details.name}</div>
                <div className="text-sm text-gray-400">
                  {details.known_for_department}
                </div>
                <div className="text-xs font-light text-gray-400">
                  <div>{details.birthday}</div>
                  <div>{details.place_of_birth}</div>
                </div>
              </>
            ) : (
              <Skeleton count={3} />
            )}
          </div>
        </div>
      </div>
      <Section headerTitle="Biography">
        <p className="px-6 text-sm text-gray-400 font-light">
          {isReady ? (
            details.biography || "No biography provided."
          ) : (
            <Skeleton count={20} />
          )}
        </p>
      </Section>
      <Section headerTitle="Gallery">
        <ScrollView
          data={images?.profiles}
          renderItem={(data) => <Image key={data.index} {...data} />}
          emptyText="No images available."
        />
      </Section>
      <Section headerTitle="Movie Credits">
        <ScrollView
          data={movieCredits?.cast}
          renderItem={(data) => <Poster key={data.item.id} {...data} />}
          cacheKey="movieCredits"
          emptyText="No movies contributed."
        />
      </Section>
    </>
  );
}
