import { SkeletonProps } from "react-loading-skeleton";
import { cls } from "../libs/utils";
import Skeleton from "./Skeleton";

interface IProps extends SkeletonProps {
  rounded?: "xl" | "2xl" | "3xl";
}

export default function RatioSkeleton({
  rounded = "2xl",
  className,
  ...rest
}: IProps) {
  return (
    <Skeleton
      containerClassName="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
      className={cls(
        `absolute h-full rounded-${rounded}`,
        className ? className : ""
      )}
      {...rest}
    />
  );
}
