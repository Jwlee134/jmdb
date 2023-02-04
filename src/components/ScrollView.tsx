import useEmblaCarousel from "embla-carousel-react";
import { ReactNode } from "react";
import { Placeholder, placeholders } from "../libs/utils";

interface IProps<T> {
  data?: T[];
  renderItem: (item: T | Placeholder, index: number) => ReactNode;
}

export default function ScrollView<T>({ data, renderItem }: IProps<T>) {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <div className="overflow-hidden px-6" ref={data ? emblaRef : null}>
      <div className="flex space-x-3">
        {(data || placeholders()).map((item, i) => renderItem(item, i))}
      </div>
    </div>
  );
}
