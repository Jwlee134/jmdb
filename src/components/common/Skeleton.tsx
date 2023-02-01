import SkeletonCmp, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface IProps extends SkeletonProps {}

export default function Skeleton({ ...rest }: IProps) {
  return <SkeletonCmp baseColor="#27272a" highlightColor="#525252" {...rest} />;
}
