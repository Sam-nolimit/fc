import * as React from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-green-700 text-white hover:bg-green-800",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline:
    "border border-gray-300 text-gray-900 hover:bg-gray-100",
  ghost: "text-gray-700 hover:bg-gray-100",
};

const sizes = {
  sm: "h-9 px-4 text-sm rounded-lg",
  md: "h-11 px-6 text-sm rounded-xl",
  lg: "h-12 px-8 text-base rounded-full",
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          "relative",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className={cn(
              "border-2 border-white border-t-transparent rounded-full animate-spin",
              size === "sm" ? "w-4 h-4" : "w-5 h-5"
            )} />
          </div>
        )}
        <span className={loading ? "invisible" : "visible"}>
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";