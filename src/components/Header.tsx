import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { cls } from "../libs/utils";
import { Fragment, ReactNode } from "react";
import HeaderBtn from "./HeaderBtn";

interface IProps {
  title?: string;
  subTitle?: string;
  showBackBtn?: boolean;
  rightBtns?: ReactNode[] | null;
}

export default function Header({
  title,
  subTitle,
  showBackBtn,
  rightBtns,
}: IProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-black h-20 fixed top-0 w-full z-[999] px-6 flex items-center">
      <div className="w-[25%] flex items-center">
        {showBackBtn ? (
          <HeaderBtn onClick={() => navigate(-1)}>
            <FiChevronLeft />
          </HeaderBtn>
        ) : null}
      </div>
      <div className="w-[50%] flex flex-col justify-center items-center">
        {title ? (
          <p className={cls("font-bold", subTitle ? "text-lg" : "text-xl")}>
            {title}
          </p>
        ) : null}
        {subTitle ? <p className="text-gray-500 text-sm">{subTitle}</p> : null}
      </div>
      <div className="w-[25%] flex justify-end items-center space-x-2">
        {rightBtns?.length
          ? rightBtns.map((icon, i) => <Fragment key={i}>{icon}</Fragment>)
          : null}
      </div>
    </header>
  );
}
