import useEmblaCarousel from "embla-carousel-react";
import { ReactNode, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Placeholder, placeholders } from "../../libs/utils";
import useBoundStore from "../../store";
import { CacheKey } from "../../store/cacheSlice";

export interface RenderItemProps<T> {
  item: T | Placeholder;
  index: number;
  cacheKey?: CacheKey;
}

interface IProps<T> {
  data?: T[];
  renderItem: (data: RenderItemProps<T>) => ReactNode;
  cacheKey?: CacheKey;
  emptyText?: string;
  infiniteRef?: ReactNode;
}

export default function ScrollView<T>({
  data,
  renderItem,
  cacheKey,
  emptyText,
  infiniteRef,
}: IProps<T>) {
  const { id } = useParams();
  const getCache = useBoundStore((state) => state.getCache);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    ...(cacheKey && {
      startIndex: getCache(cacheKey, id ? parseInt(id) : undefined),
    }),
  });

  const reloadEmbla = useCallback(() => {
    if (!emblaApi) return;
    const oldEngine = emblaApi.internalEngine();
    emblaApi.reInit();
    const newEngine = emblaApi.internalEngine();
    Object.assign(newEngine.scrollBody, oldEngine.scrollBody);
    Object.assign(newEngine.location, oldEngine.location);
    Object.assign(newEngine.target, oldEngine.target);
    const { index } = newEngine.scrollTarget.byDistance(0, false);
    newEngine.index.set(index);
    newEngine.animation.start();
  }, [emblaApi]);

  useEffect(() => {
    if (!infiniteRef) return;
    if (emblaApi && data && emblaApi.slideNodes().length !== data.length) {
      reloadEmbla();
    }
  }, [emblaApi, reloadEmbla, data, infiniteRef]);

  return (
    <div className="overflow-hidden px-6" ref={data ? emblaRef : null}>
      {Boolean(data) && !data?.length && emptyText ? (
        <p className="text-sm text-gray-400 font-light">{emptyText}</p>
      ) : (
        <div className="flex space-x-3">
          {(data || placeholders()).map((item, index) =>
            renderItem({ item, index, cacheKey })
          )}
          {infiniteRef || null}
        </div>
      )}
    </div>
  );
}
