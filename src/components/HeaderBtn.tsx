import {
  useScroll,
  useTransform,
  motion,
  HTMLMotionProps,
} from "framer-motion";
import { ReactNode } from "react";
import { cls } from "../libs/utils";

interface IProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  transparent?: boolean;
}

export default function HeaderBtn({
  children,
  transparent = false,
  className,
  ...rest
}: IProps) {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["#1f293700", "#1f2937ff"]
  );

  return (
    <motion.button
      {...rest}
      className={cls(
        "font-bold text-xl w-10 h-10 bg-gray-800 flex justify-center items-center rounded-xl drop-shadow-md",
        className ? className : ""
      )}
      style={{ ...(transparent && { backgroundColor }) }}
    >
      {children}
    </motion.button>
  );
}
