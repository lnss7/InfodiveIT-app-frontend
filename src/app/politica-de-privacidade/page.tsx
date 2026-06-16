import type { Metadata } from "next";
import { Footer } from "@/layout/footer";
import { Reveal } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Política de Privacidade | Infodive IT",
  description: "Política de privacidade e proteção de dados pessoais da Infodive IT.",
};

export default function PoliticaPrivacidadePage() {
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
                Política de Privacidade
              </h1>
              {/* Linha azul de detalhe */}
              <div className="mt-5 h-1.5 w-16 rounded-full bg-brand" />
            </Reveal>

            <Reveal delay={0.12} className="mt-12">
              <div className="max-w-none text-[16px] md:text-[17px] leading-relaxed text-ink-900">
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  Na <strong>Infodive IT</strong>, privacidade e segurança são prioridades e nos comprometemos com a transparência do tratamento de dados pessoais dos nossos usuários e clientes. Por isso, a presente Política de Privacidade estabelece como é feita a coleta, uso e transferência de informações de clientes ou outras pessoas que acessam ou usam nosso site.
                </p>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  1. Quais dados coletamos e com qual finalidade?
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  Nosso site coleta e utiliza alguns dados pessoais seus de forma a viabilizar a prestação de serviços e aprimorar a experiência de uso.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed"><strong>Dados de contato:</strong> Nome, e-mail, telefone e empresa fornecidos voluntariamente através de formulários de contato para atendimento técnico ou comercial.</span>
                  </li>
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed"><strong>Dados de navegação:</strong> Cookies e endereço IP coletados de forma automatizada para análise de performance e segurança do site.</span>
                  </li>
                </ul>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  2. Consentimento e Bases Legais
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  É a partir do seu consentimento ou de outras bases legais previstas na Lei Geral de Proteção de Dados (LGPD) que tratamos os seus dados pessoais. O consentimento é a manifestação livre, informada e inequívoca pela qual você autoriza a Infodive IT a tratar seus dados para as finalidades descritas.
                </p>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  3. Direitos dos Titulares de Dados
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  A Infodive IT assegura a seus usuários seus direitos de titular previstos no artigo 18 da Lei Geral de Proteção de Dados. Dessa forma, você pode, de maneira gratuita e a qualquer momento:
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed">Confirmar a existência de tratamento de dados;</span>
                  </li>
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed">Acessar seus dados pessoais;</span>
                  </li>
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed">Corrigir dados incompletos, inexatos ou desatualizados;</span>
                  </li>
                  <li className="flex gap-3 text-ink-900">
                    <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="leading-relaxed">Solicitar a eliminação dos seus dados pessoais tratados com base no seu consentimento.</span>
                  </li>
                </ul>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  4. Compartilhamento de Dados
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  A Infodive IT não vende ou comercializa seus dados pessoais. Podemos compartilhar seus dados com prestadores de serviços parceiros contratados apenas quando necessário para operacionalização do site ou para o envio de propostas comerciais por você solicitadas.
                </p>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  5. Segurança dos Dados
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  Para mantermos suas informações pessoais seguras, usamos ferramentas físicas, eletrônicas e gerenciais orientadas para a proteção da sua privacidade. Aplicamos essas medidas levando em consideração a natureza dos dados pessoais coletados, o contexto e a finalidade do tratamento.
                </p>

                <h2 className="mt-12 text-2xl font-semibold tracking-tight text-ink-950">
                  6. Alteração desta Política de Privacidade
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-ink-900">
                  A atual versão da Política de Privacidade foi formulada e atualizada pela última vez em 16 de Junho de 2026. Reservamos o direito de modificar essa Política de Privacidade a qualquer tempo, principalmente em função da adequação a eventuais alterações legislativas.
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
