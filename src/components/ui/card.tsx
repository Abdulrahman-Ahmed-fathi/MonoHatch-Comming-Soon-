import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

type LandingCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
  style?: React.CSSProperties;
};

export default function LandingCard({
  children,
  className,
  hover,
  dark,
  style,
}: LandingCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      style={style}
      whileHover={
        hover && !reduceMotion ? { y: -6, transition: { duration: 0.25, ease: "easeOut" } } : undefined
      }
      whileTap={hover && !reduceMotion ? { y: -2, scale: 0.99 } : undefined}
      className={cn(
        "rounded-shell p-6 md:p-7",
        dark
          ? "bg-near-black/60 border border-french-rose/20"
          : "border border-[#efe8e5] bg-white shadow-card",
        hover &&
          "transition-all duration-300 will-change-transform hover:border-french-rose/40 hover:shadow-pink",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
