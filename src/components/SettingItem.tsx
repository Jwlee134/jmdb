import { ReactNode } from "react";

interface IProps {
  title: string;
  children: ReactNode;
}

export default function SettingItem({ title, children }: IProps) {
  return (
    <div className="flex justify-between items-center p-6">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
