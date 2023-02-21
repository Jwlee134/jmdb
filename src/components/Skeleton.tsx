import SkeletonCmp, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useBoundStore from "../store";

interface IProps extends SkeletonProps {}

export default function Skeleton({ ...rest }: IProps) {
  const theme = useBoundStore((state) => state.theme);

  return (
    <SkeletonCmp
      baseColor={theme === "dark" ? "#27272a" : undefined}
      highlightColor={theme === "dark" ? "#525252" : undefined}
      {...rest}
    />
  );
}
