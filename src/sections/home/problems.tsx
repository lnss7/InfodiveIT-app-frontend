import Link from "next/link"
import { ArrowRight, Activity } from "lucide-react"
import { TextReveal } from "@/components/ui/text-reveal"
import { Reveal } from "@/components/animations/reveal"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"

type ChallengeItem = {
  title: string
  description: string
  solution: string
  href: string
}

const CHALLENGES_FALLBACK: ChallengeItem[] = [
  { title: "Instabilidade e quedas constantes nos sistemas", description: "Sistemas indisponíveis durante picos de demanda ou operações sazonais geram prejuízos diretos, desgaste com clientes e arranham a reputação da sua marca.", solution: "Alta Disponibilidade & Cloud Elástica", href: "/solucoes" },
  { title: "Backups lentos e vulnerabilidade a ataques cibernéticos", description: "Políticas manuais de cópias de dados falham quando mais se precisa. Sua empresa está realmente protegida contra ameaças modernas como ransomware?", solution: "Backup Imutável & Cibersegurança Ativa", href: "/solucoes" },
  { title: "Servidores obsoletos gargalando a operação", description: "Hardware antigo e sistemas legados limitam a velocidade do seu ERP, gerando atrasos crônicos no faturamento, na entrega e na linha de produção.", solution: "Modernização de Hardware & Servidores Dedicados", href: "/solucoes" },
  { title: "Dificuldade na integração e adoção prática de IA", description: "Embora a IA seja vital para a competitividade, a falta de expertise técnica e infraestrutura especializada impede que projetos de inteligência saiam do papel.", solution: "IA Aplicada a Negócios & Modelagem de Dados", href: "/solucoes" },
  { title: "Complexidade e custos inflados com nuvem híbrida", description: "Manter dados confidenciais localmente enquanto se aproveita a flexibilidade da nuvem gera desafios de compliance, latência e custos de nuvem imprevisíveis.", solution: "Gestão Híbrida & Otimização FinOps", href: "/solucoes" },
]

export async function Problems() {
  const challenges: ChallengeItem[] = await api.homeProblemas()
    .then((data) =>
      data.length > 0
        ? data.map((d) => ({ title: d.titulo, description: d.descricao, solution: d.solucaoIndicada || "", href: d.href || "/solucoes" }))
        : CHALLENGES_FALLBACK
    )
    .catch(() => CHALLENGES_FALLBACK)
  return (
    <section id="problemas" className="relative bg-white">
      {/* Texto revelado conforme o scroll. trackHeight maior = a frase fica fixa
          (revelada) por mais tempo, dando palco pro painel escuro subir por cima. */}
      <TextReveal
        text={"Problemas reais.\nSoluções reais."}
        highlightLines={[1]}
        trackHeight="h-[260vh]"
      />

      {/* Painel escuro que SOBE por cima do reveal (efeito de camada/cortina).
          Contém o conteúdo "Problemas que resolvemos" re-estilizado pro escuro. */}
      <div className="relative z-10 -mt-[60vh] rounded-t-[2rem] bg-ink-950 pb-20 pt-20 shadow-[0_-30px_70px_-25px_rgba(0,0,0,0.55)] md:-mt-[70vh] md:rounded-t-[2.5rem] md:pb-28 md:pt-28">
        <div className="container-default">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

            {/* Coluna Esquerda: Título Editorial Pinned (Sticky) */}
            <div className="lg:col-span-5">
              <Reveal className="lg:sticky lg:top-28">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                  Problemas que resolvemos
                </span>
                <h2 className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl">
                  Desafios complexos de TI. <br />
                  <span className="text-brand-accent">Soluções simples e definitivas.</span>
                </h2>
                <p className="mt-6 max-w-md font-sans text-sm font-light leading-relaxed text-ink-300 sm:text-base">
                  A tecnologia deve impulsionar o seu negócio, não paralisá-lo. Mapeamos os principais gargalos operacionais do mercado e desenvolvemos arquiteturas sob medida para superá-los.
                </p>

                {/* Badge Informativa Estática */}
                <div className="mt-8 hidden max-w-sm items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 lg:flex">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-accent">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Suporte Proativo 24/7/365</h4>
                    <p className="mt-0.5 text-[11px] leading-normal text-ink-300">
                      Sua infraestrutura crítica é monitorada ativamente para conter anomalias antes que virem incidentes.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Coluna Direita: Lista de Desafios Interativos */}
            <div className="divide-y divide-white/10 lg:col-span-7">
              {challenges.map((item, index) => (
                <Reveal as="div" key={index} delay={index * 0.07}>
                <Link
                  href={item.href}
                  className={cn(
                    "group block py-7 transition-colors duration-300",
                    index === 0 && "pt-0",
                    index === challenges.length - 1 && "pb-0"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Número Editorial */}
                    <span className="mt-1 shrink-0 select-none font-mono text-xs font-bold text-brand-accent/70 sm:text-sm">
                      {`0${index + 1}.`}
                    </span>

                    <div className="flex-grow">
                      {/* Título & Seta */}
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-base font-bold leading-snug text-white transition-colors duration-300 group-hover:text-brand-accent sm:text-lg">
                          {item.title}
                        </h3>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-brand/20">
                          <ArrowRight className="h-4 w-4 text-ink-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-accent" />
                        </div>
                      </div>

                      {/* Descrição */}
                      <p className="mt-2 font-sans text-xs font-light leading-relaxed text-brand-accent sm:text-sm">
                        {item.description}
                      </p>

                      {/* Solução recomendada que expande no hover */}
                      <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover:max-h-16 group-hover:opacity-100">
                        <div className="mt-4 inline-flex items-center gap-2 rounded border border-brand/20 bg-brand/15 px-2.5 py-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent">
                            Solução indicada:
                          </span>
                          <span className="text-[11px] font-bold text-white">
                            {item.solution}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Problems
