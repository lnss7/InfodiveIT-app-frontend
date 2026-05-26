import * as React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/animations/spotLight";

interface SpotlightBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SpotlightBorder({
  children,
  className,
  ...props
}: SpotlightBorderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-white/5 p-[1px] transition-all duration-300 group select-none",
        className
      )}
      {...props}
    >
      <Spotlight
        className="from-brand/30 via-brand-light/10 to-transparent blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        size={120}
      />
      <div className="relative h-full w-full rounded-[7px] bg-ink-950/80 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
