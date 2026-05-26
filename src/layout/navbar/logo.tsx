import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  href?: string
}

export function Logo({ className, href = '/' }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Infodive — Portal de Soluções de TI"
      className={cn(
        'inline-flex items-center gap-2.5 text-ink-950 hover:text-ink-950',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 rounded-md',
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-ink-950"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <g className="text-white">
            <line x1="9" y1="11" x2="23" y2="11" />
            <line x1="9" y1="16" x2="19" y2="16" />
            <line x1="9" y1="21" x2="15" y2="21" />
          </g>
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight">Infodive</span>
    </Link>
  )
}
