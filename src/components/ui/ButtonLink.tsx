import { Link } from "react-router-dom";
import React from "react";

type ButtonLinkProps<E = React.MouseEvent<HTMLButtonElement>> = {
  text: string;
  to?: string;
  onClick?: (event: E) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function ButtonLink<E = React.MouseEvent<HTMLButtonElement>>({
  text,
  to,
  onClick,
  className,
  type,
}: ButtonLinkProps<E>) {
  const baseClasses =
    "px-[28px] py-4 rounded-[46px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-black text-black hover:text-black active:text-white transition-colors duration-300 ease-linear inline-block text-center";

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        {text}
      </Link>
    );
  }

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
