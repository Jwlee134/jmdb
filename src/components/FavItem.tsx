import { useQuery } from "@tanstack/react-query";
import { movie } from "../libs/api/movies";
import useBoundStore from "../store";
import HorizontalPoster from "./HorizontalPoster";
import { placeholders } from "../libs/utils";

interface IProps {
  id: number;
}

export default function FavItem({ id }: IProps) {
  console.log(id);
  const lng = useBoundStore((state) => state.lng);
  const { data } = useQuery({
    queryFn: movie.getDetail,
    queryKey: ["movie", id, lng],
  });

  return <HorizontalPoster data={data || placeholders()[0]} showDelBtn />;
}
