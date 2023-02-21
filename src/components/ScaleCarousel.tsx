import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { IMovie } from "../libs/api/types";
import { GENRES } from "../libs/constants";
import { isPlaceholder, makeImgPath, Placeholder } from "../libs/utils";
import useBoundStore from "../store";
import RatioSkeleton from "./RatioSkeleton";

const TWEEN_FACTOR = 3;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

interface IProps {
  data: IMovie[] | Placeholder[];
}

export default function ScaleCarousel({ data }: IProps) {
  const { getCache, setCache } = useBoundStore(
    (state) => ({ getCache: state.getCache, setCache: state.setCache }),
    shallow
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: getCache("discover"),
  });
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      if (!emblaApi.slidesInView().includes(index)) return 0;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target().get();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
      return numberWithinRange(tweenValue, 0.8, 1);
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", () => {
      flushSync(() => onScroll());
    });
    emblaApi.on("reInit", onScroll);
  }, [emblaApi, onScroll]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [data, emblaApi]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {data.map((movie, i) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="flex-[0_0_60%] sm:flex-[0_0_40%] md:flex-[0_0_33%] min-w-0 relative"
            onClick={() => setCache("discover", i)}
          >
            <div
              className="relative pt-[150%] rounded-3xl overflow-hidden"
              style={{
                ...(tweenValues.length && {
                  transform: `scale(${tweenValues[i]})`,
                }),
              }}
            >
              {/* 새로고침하면 이미지는 바로 렌더링되지만 위 tweenValues를 계산하면서 
              scale에 적용하는 딜레이 때문에 이미지 scale이 순간적으로 1에서 0.8로 바뀌므로 아래처럼 함 */}
              {tweenValues.length ? (
                <>
                  {!isPlaceholder(movie) ? (
                    <img
                      className="absolute w-full h-full top-0 left-0 right-0 bottom-0 object-cover"
                      src={makeImgPath(movie.poster_path)}
                      alt="poster"
                    />
                  ) : (
                    <RatioSkeleton rounded="3xl" />
                  )}
                  {!isPlaceholder(movie) ? (
                    <div className="absolute text-white  bottom-0 w-full p-4 backdrop-blur-md md:py-6">
                      <div className="flex justify-between items-center">
                        <div className="flex-grow whitespace-nowrap text-ellipsis overflow-hidden pr-2 text-lg">
                          {movie.title}
                        </div>
                        <div className="flex-shrink-0">
                          <span>{movie.vote_average} </span>
                          <span className="text-yellow-300">★</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        {movie.genre_ids
                          .slice(0, 2)
                          .map(
                            (id) =>
                              GENRES.find((genre) => genre.id === id)?.name
                          )
                          .map((genre, i) => (
                            <div
                              key={i}
                              className="bg-blue-600 py-1 px-2 rounded-full text-sm"
                            >
                              {genre}
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
