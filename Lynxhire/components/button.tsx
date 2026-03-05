"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const Button = <T extends React.ElementType = "a">({
  href,
  as,
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: T;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "href" | "children" | "className" | "variant">) => {
  const Tag = as || "a" as React.ElementType as T;

  const baseStyles = cn(
    "px-4 py-2 flex rounded-xl text-sm font-bold relative",
    "cursor-pointer hover:-translate-y-0.5 transition duration-200",
    "inline-flex items-center justify-center",
    "text-black"
  );

  const variantStyles = {
    primary: cn(
      "rounded-xl",
      "bg-gradient-to-b from-neutral-700 to-neutral-900",
      "hover:from-neutral-800 hover:to-black",
      "shadow-sm",
      "text-white"
    ),
    secondary: cn("bg-white rounded-xl border border-neutral-200 hover:bg-neutral-50"),
    dark: cn("bg-gradient-to-b from-neutral-700 to-neutral-900 text-white rounded-xl"),
    gradient: cn(
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
      "shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]"
    ),
  };

  return React.createElement(
    Tag,
    {
      ...(href !== undefined && { href }),
      className: cn(baseStyles, variantStyles[variant], className),
      ...props
    },
    children
  );
};
