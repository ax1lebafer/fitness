import React from "react";

type ButtonLinkProps<E = React.MouseEvent<HTMLButtonElement>> = {
  text: string;
  onClick?: (event: E) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function ButtonInActive<E = React.MouseEvent<HTMLButtonElement>>({
  text,
  onClick,
  className,
  type,
}: ButtonLinkProps<E>) {
  const baseClasses =
    "px-[28px] py-4 rounded-[46px] bg-[#F7F7F7] hover:bg-[#F7F7F7] active:bg-[#F7F7F7] text-[#999999] hover:text-[#999999] active:text-[#999999] inline-block text-center cursor-default";

  return (
    <button
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={`${baseClasses} ${className}`}
      type={type}
    >
      {text}
    </button>
  );
}
