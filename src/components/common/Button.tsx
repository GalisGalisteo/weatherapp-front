import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  hoverColor?: string;
}

export default function Button({
  bgColor = "bg-primary",
  hoverColor = "hover:bg-primary-light",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `xs:text-xl px-10 xs:px-12 py-3 xs:py-4 rounded-2xl my-5`,
        bgColor,
        hoverColor,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
