import { ReactNode } from "react";
import { cls } from "../../libs/utils";

interface IProps {
  children: ReactNode;
  Header: ReactNode;
  overwrap?: boolean;
}

export default function HeaderContainer({
  children,
  Header,
  overwrap = false,
}: IProps) {
  return (
    <>
      {Header}
      <div className={cls(!overwrap ? "pt-20" : "")}>{children}</div>
    </>
  );
}
