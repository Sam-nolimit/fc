import * as React from "react";
import { cn } from "@/lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, type, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full h-12 rounded-xl border px-4 text-sm transition focus:outline-none focus:ring-2 focus:ring-green-600",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300",
          className
        )}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";
