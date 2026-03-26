import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
};

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = true,
  light = false,
}: Props) {
  return (
    <div className={cn("mb-10 md:mb-12", centered ? "text-center" : "text-left")}>
      {label ? (
        <p
          className={cn(
            "p2-b tracking-[0.18em] uppercase",
            light ? "text-white/70" : "text-ink-warm/55"
          )}
        >
          {label}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-2 font-display text-3xl md:text-[44px] leading-[1.12]",
          light ? "text-white" : "text-ink-warm"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "mt-5 h-1 w-12 rounded-full bg-french-rose",
          centered ? "mx-auto" : "mx-0"
        )}
      />
      {subtitle ? (
        <p
          className={cn(
            "p1-r mt-4",
            light ? "text-pale-gray/80" : "text-ink-warm/70"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
