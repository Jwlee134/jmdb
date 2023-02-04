import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children: ReactNode;
}

export default function Portal({ children }: IProps) {
  const el = document.querySelector("#modal");
  return el ? createPortal(children, el) : null;
}
