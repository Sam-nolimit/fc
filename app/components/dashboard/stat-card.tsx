import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
}

export default function StatCard({ title, value, change,  trend }: StatCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:border-gray-300 active:scale-[0.99]">
      
      {/* SVG / Image Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
        <img 
          src="/images/card.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2 group-hover:text-white transition-colors duration-300">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  trend === "up" 
                    ? "text-green-600 group-hover:text-white" 
                    : "text-red-600 group-hover:text-white"
                )}
              >
                {trend === "up" ? "↗" : "↘"} {change}
              </span>
              <span className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300">
                from yesterday
              </span>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
}
