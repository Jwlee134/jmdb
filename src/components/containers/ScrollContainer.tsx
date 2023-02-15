import useEmblaCarousel from "embla-carousel-react";
import { ReactNode } from "react";
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
}

export default function ScrollView<T>({
  data,
  renderItem,
  cacheKey,
  emptyText,
}: IProps<T>) {
  const { id } = useParams();
  const getCache = useBoundStore((state) => state.getCache);
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    ...(cacheKey && {
      startIndex: getCache(cacheKey, id ? parseInt(id) : undefined),
    }),
  });

  return (
    <div className="overflow-hidden px-6" ref={data ? emblaRef : null}>
      {Boolean(data) && !data?.length && emptyText ? (
        <p className="text-sm text-gray-400 font-light">{emptyText}</p>
      ) : (
        <div className="flex space-x-3">
          {(data || placeholders()).map((item, index) =>
            renderItem({ item, index, cacheKey })
          )}
        </div>
      )}
    </div>
  );
}
