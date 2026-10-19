import { buscarEsportesEOlimpiada } from "@/lib/external-olympics";
import { atletas, normalizar } from "@/lib/olympics";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const consulta = (searchParams.get("q") ?? "").slice(0, 100);

  try {
    const jogos = await buscarEsportesEOlimpiada(consulta);
    return Response.json({ consulta, origem: "Codante APIs", ...jogos });
  } catch {
    const termo = normalizar(consulta);
    const disciplinas = Array.from(new Set(atletas.map((atleta) => atleta.esporte)))
      .filter((nome) => !termo || normalizar(nome).includes(termo))
      .map((nome) => ({ id: nome, nome }));
    return Response.json({
      consulta,
      origem: "base local",
      indisponivel: true,
      competicao: "Jogos Olímpicos",
      disciplinas,
      paises: [],
    });
  }
}
