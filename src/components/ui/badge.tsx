import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

type LandingBadgeProps = {
  children: React.ReactNode;
  variant?: "pink" | "dark" | "outline";
  className?: string;
};

export default function LandingBadge({
  children,
  variant = "pink",
  className,
}: LandingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold",
        variant === "pink" &&
          "border border-french-rose/30 bg-french-rose/10 text-french-rose",
        variant === "dark" &&
          "bg-deep-slate text-pale-gray border border-transparent",
        variant === "outline" &&
          "border border-french-rose text-french-rose bg-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
