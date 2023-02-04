import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function HeaderBtn({ children, ...rest }: IProps) {
  return (
    <button
      {...rest}
      className="font-bold text-xl w-10 h-10 bg-gray-800 flex justify-center items-center rounded-xl"
    >
      {children}
    </button>
  );
}
