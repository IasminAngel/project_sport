import { pesquisarAtletas } from "@/lib/external-olympics";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const consulta = (searchParams.get("q") ?? "").slice(0, 100);
  const { resultados, fonte, atualizacao } = await pesquisarAtletas(consulta);

  return Response.json({
    consulta,
    total: resultados.length,
    fonte,
    atualizacao,
    resultados,
  });
}
