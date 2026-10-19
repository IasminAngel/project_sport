import { buscarCuriosidades } from "@/lib/olympics";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const consulta = (searchParams.get("q") ?? "").slice(0, 100);
  const resultados = buscarCuriosidades(consulta);

  return Response.json({
    consulta,
    total: resultados.length,
    resultados,
  });
}
