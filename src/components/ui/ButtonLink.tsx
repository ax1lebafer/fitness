import { Link } from "react-router-dom";
import React from "react";

type ButtonLinkProps<E = React.MouseEvent<HTMLButtonElement>> = {
  text: string;
  to?: string;
  onClick?: (event: E) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function ButtonLink<E = React.MouseEvent<HTMLButtonElement>>({
  text,
  to,
  onClick,
  className,
  type,
  disabled,
}: ButtonLinkProps<E>) {
  const baseClasses =
    "px-[16px] xl:px-[26px] py-[8px] xl:py-[16px] rounded-[46px] bg-[#BCEC30] hover:bg-[#C6FF00] active:bg-black text-black hover:text-black active:text-white transition-colors duration-300 ease-linear inline-block text-center";

  const disabledClasses =
    "bg-[#F7F7F7] cursor-not-allowed hover:bg-gray-400 active:bg-gray-400";

  const combinedClasses = `${baseClasses} ${className} ${disabled ? disabledClasses : ""}`;

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
      className={combinedClasses}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
