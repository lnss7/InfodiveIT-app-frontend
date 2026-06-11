import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/** Breadcrumb (estilo shadcn, sem Radix). */
export function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" className={className} {...props} />
}

export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em]",
        className
      )}
      {...props}
    />
  )
}

export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
}

export function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a className={cn("transition-colors hover:text-brand", className)} {...props} />
  )
}

export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-current", className)}
      {...props}
    />
  )
}

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li role="presentation" aria-hidden className={cn("opacity-50", className)} {...props}>
      {children ?? <ChevronRight className="h-3 w-3" />}
    </li>
  )
}
