import { ReactNode } from "react";

interface IProps {
  title: string;
  children: ReactNode;
}

export default function SettingItem({ title, children }: IProps) {
  return (
    <div className="flex justify-between items-center px-6 py-3">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
