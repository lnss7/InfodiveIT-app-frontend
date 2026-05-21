export default function HomePage() {
  return (
    <main className="container-default section">
      <div className="max-w-3xl">
        <span className="eyebrow">Infodive</span>
        <h1 className="text-balance mb-6">
          Tecnologia corporativa para empresas que precisam evoluir com
          segurança.
        </h1>
        <p className="text-lg text-ink-500 mb-10 text-balance">
          Ambiente de desenvolvimento configurado. As telas serão construídas
          a partir do protótipo aprovado da home.
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="/admin" className="btn-primary">
            Acessar Admin
          </a>
          <a href="#" className="btn-secondary">
            Documentação
          </a>
        </div>
      </div>
    </main>
  )
}
