import { Fragment, ReactNode } from "react";

interface IProps {
  headerTitle: string;
  children: ReactNode;
  onViewAllClick?: () => void;
}

export default function Section({
  headerTitle,
  children,
  onViewAllClick,
}: IProps) {
  return (
    <Fragment>
      <div className="flex justify-between items-center px-6 h-16">
        <span className="text-lg font-bold">{headerTitle}</span>
        {Boolean(onViewAllClick) ? (
          <button onClick={onViewAllClick} className="text-gray-400 text-sm">
            View all
          </button>
        ) : null}
      </div>
      {children}
    </Fragment>
  );
}
