import Skeleton from "./Skeleton";

interface IProps {
  rounded?: "xl" | "2xl" | "3xl";
}

export default function RatioSkeleton({ rounded = "2xl" }: IProps) {
  return (
    <Skeleton
      containerClassName="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
      className={`absolute h-full rounded-${rounded}`}
    />
  );
}
