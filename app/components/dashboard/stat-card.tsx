import { cn } from "@/lib/cn";
import { ReactNode } from "react";
// import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon?: ReactNode;
  trend?: "up" | "down";
}

export default function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                "text-sm font-medium",
                trend === "up" ? "text-green-600" : "text-red-600"
              )}>
                {trend === "up" ? "↗" : "↘"} {change}
              </span>
              <span className="text-sm text-gray-500">from yesterday</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-gray-50 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}