import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function HorizontalPosterContainer({ children }: IProps) {
  return (
    <div className="p-6 max-md:space-y-4 md:grid md:grid-cols-2 md:gap-3">
      {children}
    </div>
  );
}
