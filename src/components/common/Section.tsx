import { Fragment, ReactNode } from "react";

interface IProps {
  headerTitle: string;
  children: ReactNode;
}

export default function Section({ headerTitle, children }: IProps) {
  return (
    <Fragment>
      <div className="flex justify-between items-center px-4 h-16">
        <span className="text-xl font-bold">{headerTitle}</span>
        <button className="text-gray-500 text-sm">View all</button>
      </div>
      {children}
    </Fragment>
  );
}
