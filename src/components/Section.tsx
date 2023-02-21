import { Fragment, ReactNode } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="flex justify-between items-center px-6 h-20">
        <span className="text-lg font-bold">{headerTitle}</span>
        {Boolean(onViewAllClick) ? (
          <button onClick={onViewAllClick} className="text-gray-400 text-sm">
            {t("viewAll")}
          </button>
        ) : null}
      </div>
      {children}
    </Fragment>
  );
}
