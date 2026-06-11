"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type TabsContextValue = {
  value: string
  setValue: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("Tabs.* deve ser usado dentro de <Tabs>")
  return ctx
}

interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

/** Tabs (estilo shadcn, sem Radix) — controlado ou não-controlado. */
export function Tabs({
  defaultValue = "",
  value: controlled,
  onValueChange,
  className,
  children,
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const value = controlled ?? uncontrolled

  const setValue = React.useCallback(
    (next: string) => {
      onValueChange?.(next)
      if (controlled === undefined) setUncontrolled(next)
    },
    [controlled, onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-ink-200 bg-ink-50 p-1",
        className
      )}
      {...props}
    />
  )
}

interface TabsTriggerProps extends Omit<React.ComponentProps<"button">, "value"> {
  value: string
}

export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { value: active, setValue } = useTabs()
  const isActive = active === value
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setValue(value)}
      className={cn(
        "cursor-pointer rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
        isActive
          ? "bg-white text-ink-950 shadow-[0_1px_3px_rgba(20,20,19,0.08)]"
          : "text-ink-500 hover:text-ink-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

interface TabsContentProps extends React.ComponentProps<"div"> {
  value: string
}

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: active } = useTabs()
  if (active !== value) return null
  return <div role="tabpanel" className={className} {...props} />
}
