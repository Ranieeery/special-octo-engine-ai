import Confetti from "./confetti";

// Lê a API a cada acesso, sem cache.
export const dynamic = "force-dynamic";

const TABNEWS_URL = "https://www.tabnews.com.br";

async function getTotalConteudos(): Promise<number | null> {
  try {
    const res = await fetch(`${TABNEWS_URL}/api/v1/contents?per_page=1&strategy=new`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const total = Number(res.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) && total > 0 ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const total = await getTotalConteudos();

  return (
    <main className="container">
      <Confetti />
      <p className="badge">🚧 Em Construção</p>
      <h1>
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto
      </h1>
      <p className="total">
        <strong>
          {total !== null ? total.toLocaleString("pt-BR") : "—"}
        </strong>{" "}
        conteúdos publicados no TabNews
      </p>
      <a className="link" href={TABNEWS_URL} target="_blank" rel="noopener noreferrer">
        Visitar o site oficial →
      </a>
    </main>
  );
}
