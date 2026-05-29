import { Server, ShieldCheck, Cloud, Cpu } from "lucide-react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

// Fundo decorativo leve e on-brand (sem animações que distraem) — um ícone grande
// e desbotado no canto, mascarado pra cima, que ganha leve destaque no hover.
function SoftBackground({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)]">
      <Icon
        className="absolute -right-6 -top-6 h-48 w-48 text-ink-200/60 transition-transform duration-300 ease-out group-hover:scale-105"
        strokeWidth={1}
      />
    </div>
  )
}

const features = [
  {
    Icon: Server,
    name: "Infraestrutura",
    description: "Servidores, storage e redes de alta performance para cargas críticas.",
    href: "/solucoes",
    cta: "Saiba mais",
    className: "col-span-3 lg:col-span-1",
    background: <SoftBackground Icon={Server} />,
  },
  {
    Icon: ShieldCheck,
    name: "Segurança & Proteção de Dados",
    description: "Cibersegurança, backup e recuperação para manter a operação sempre de pé.",
    href: "/solucoes",
    cta: "Saiba mais",
    className: "col-span-3 lg:col-span-2",
    background: <SoftBackground Icon={ShieldCheck} />,
  },
  {
    Icon: Cloud,
    name: "Cloud",
    description: "Migração, gestão e otimização de nuvem pública, privada e híbrida.",
    href: "/solucoes",
    cta: "Saiba mais",
    className: "col-span-3 lg:col-span-2",
    background: <SoftBackground Icon={Cloud} />,
  },
  {
    Icon: Cpu,
    name: "Inteligência Artificial",
    description: "IA aplicada ao negócio, integrada à sua infraestrutura.",
    href: "/solucoes",
    cta: "Saiba mais",
    className: "col-span-3 lg:col-span-1",
    background: <SoftBackground Icon={Cpu} />,
  },
]

export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}
