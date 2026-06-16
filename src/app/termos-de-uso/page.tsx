import type { Metadata } from "next";
import { Footer } from "@/layout/footer";
import { Reveal } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Termos de Uso | Infodive IT",
  description: "Termos e condições de uso do portal e dos serviços da Infodive IT.",
};

export default function TermosDeUsoPage() {
  return (
    <>
      <main className="relative z-20 min-h-screen bg-white text-ink-900 pt-28 md:pt-36 pb-20">
        <div className="container-default">
          <div className="mx-auto max-w-3xl">
            {/* Cabeçalho simples com detalhe azul */}
            <Reveal>
              <nav className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
                Termos e Condições
              </nav>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl md:text-5xl">
                Termos de Uso
              </h1>
              {/* Linha azul de detalhe */}
              <div className="mt-5 h-1.5 w-16 rounded-full bg-brand" />
            </Reveal>

            <Reveal delay={0.12} className="mt-12">
              <div className="max-w-none text-[16px] md:text-[17px] leading-relaxed text-ink-900">
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  Bem-vindo ao portal da <strong>Infodive IT</strong>. Ao acessar e utilizar este website, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, por favor, não utilize nosso site.
                </p>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  1. Aceitação dos Termos
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  Os presentes Termos de Uso regulam o acesso e a utilização dos serviços e informações disponibilizados no site da Infodive IT. O uso continuado deste site confirma sua aceitação tácita e integral destes termos.
                </p>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  2. Propriedade Intelectual
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  Todo o conteúdo deste site — incluindo textos, gráficos, logotipos, ícones de botões, imagens, clipes de áudio, downloads digitais e compilações de dados — é propriedade da Infodive IT ou de seus fornecedores de conteúdo e parceiros de tecnologia (como IBM, Lenovo, Veeam, VMware, etc.), sendo protegido pelas leis de direitos autorais internacionais e nacionais.
                </p>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  3. Licença de Uso e Limitações
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou materiais corporativos) no site da Infodive IT apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título, e sob esta licença você não pode:
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed">Modificar ou copiar os materiais;</span>
                  </li>
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed">Usar os materiais para qualquer finalidade comercial ou para exibição pública;</span>
                  </li>
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed">Tentar descompilar ou fazer engenharia reversa de qualquer software ou recurso contido no site;</span>
                  </li>
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed">Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais.</span>
                  </li>
                </ul>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  4. Isenção de Responsabilidade
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  Os materiais no site da Infodive IT são fornecidos "como estão". A Infodive IT não oferece garantias, expressas ou implícitas, e por este meio isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual.
                </p>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  5. Limitações de Responsabilidade
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  Em nenhum caso a Infodive IT ou seus parceiros serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais contidos no portal.
                </p>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  6. Alterações nos Termos de Uso
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  A Infodive IT pode revisar estes termos de serviço a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses Termos de Uso.
                </p>

                <div className="mt-14 border-t border-ink-200/70 pt-6 text-sm text-ink-500">
                  Última atualização: 16 de Junho de 2026.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
