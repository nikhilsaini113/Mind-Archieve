import type { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  onClick,
  active,
}: {
  text: string;
  icon: ReactElement;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <div
      className={`flex text-gray-700 py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150 ${
        active ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}
