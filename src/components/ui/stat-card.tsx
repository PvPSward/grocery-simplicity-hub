
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const statCardVariants = cva(
  "rounded-lg p-4 transition-all duration-300 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border",
        primary: "bg-primary/10 text-primary border border-primary/20",
        success: "bg-success/10 text-success border border-success/20",
        warning: "bg-warning/10 text-warning border border-warning/20",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",
        ghost: "bg-muted/50 text-muted-foreground",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  description?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  variant,
  className,
  description,
  ...props
}: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant }), className)} {...props}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              {description && (
                <span className="text-xs ml-1 opacity-70">{description}</span>
              )}
            </div>
          )}
          {!trend && description && (
            <p className="text-xs opacity-70 mt-1">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-full bg-background">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
