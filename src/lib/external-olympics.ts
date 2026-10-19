import { atletas, normalizar, type Atleta } from "@/lib/olympics";

const wikidataApi = "https://www.wikidata.org/w/api.php";
const codanteBase = "https://apis.codante.io/olympic-games";

type Claim = { mainsnak?: { datavalue?: { value?: { id?: string } } } };
type WikidataEntity = {
  labels?: Record<string, { value: string }>;
  descriptions?: Record<string, { value: string }>;
  claims?: Record<string, Claim[]>;
};
type WikidataEntitiesResponse = { entities?: Record<string, WikidataEntity> };

export type ModalidadeOlimpica = { id: string; nome: string; pictograma?: string };
export type PaisMedalhista = {
  id: string;
  nome: string;
  bandeira: string;
  ouro: number;
  prata: number;
  bronze: number;
  total: number;
  posicao: number;
};

const wikidataHeaders = { "User-Agent": "ProjectSport/1.0 (Olympic research app)" };

function getEntityId(claims: Record<string, Claim[]> | undefined, property: string) {
  return claims?.[property]?.[0]?.mainsnak?.datavalue?.value?.id;
}

function getLabel(entity: WikidataEntity | undefined) {
  return entity?.labels?.pt?.value ?? entity?.labels?.en?.value;
}

export async function buscarAtletasWikidata(consulta: string): Promise<Atleta[]> {
  const searchUrl = new URL(wikidataApi);
  searchUrl.search = new URLSearchParams({
    action: "wbsearchentities", search: consulta, language: "pt", uselang: "pt",
    type: "item", limit: "8", format: "json",
  }).toString();
  const searchResponse = await fetch(searchUrl, {
    headers: wikidataHeaders, next: { revalidate: 3600 }, signal: AbortSignal.timeout(7000),
  });
  if (!searchResponse.ok) throw new Error(`Wikidata respondeu ${searchResponse.status}`);

  const searchData = await searchResponse.json() as { search?: Array<{ id: string; label?: string; description?: string }> };
  const matches = searchData.search ?? [];
  if (!matches.length) return [];

  const detailsUrl = new URL(wikidataApi);
  detailsUrl.search = new URLSearchParams({
    action: "wbgetentities", ids: matches.map(({ id }) => id).join("|"),
    props: "labels|descriptions|claims", languages: "pt|en", format: "json",
  }).toString();
  const detailsResponse = await fetch(detailsUrl, {
    headers: wikidataHeaders, next: { revalidate: 3600 }, signal: AbortSignal.timeout(7000),
  });
  if (!detailsResponse.ok) throw new Error(`Wikidata respondeu ${detailsResponse.status}`);
  const detailsData = await detailsResponse.json() as WikidataEntitiesResponse;
  const entities = detailsData.entities ?? {};

  const relatedIds = Array.from(new Set(Object.values(entities).flatMap(({ claims }) =>
    ["P641", "P1344", "P166"].flatMap((property) => (claims?.[property] ?? [])
      .map((claim) => claim.mainsnak?.datavalue?.value?.id)
      .filter((id): id is string => Boolean(id))),
  ))).slice(0, 40);
  let relatedEntities: Record<string, WikidataEntity> = {};
  if (relatedIds.length) {
    const labelsUrl = new URL(wikidataApi);
    labelsUrl.search = new URLSearchParams({
      action: "wbgetentities", ids: relatedIds.join("|"), props: "labels",
      languages: "pt|en", format: "json",
    }).toString();
    const labelsResponse = await fetch(labelsUrl, {
      headers: wikidataHeaders, next: { revalidate: 3600 }, signal: AbortSignal.timeout(7000),
    });
    if (labelsResponse.ok) {
      const labelsData = await labelsResponse.json() as WikidataEntitiesResponse;
      relatedEntities = labelsData.entities ?? {};
    }
  }

  return matches.flatMap((match) => {
    const entity = entities[match.id];
    const claims = entity?.claims;
    const human = claims?.P31?.some((claim) => claim.mainsnak?.datavalue?.value?.id === "Q5") ?? false;
    const hasSportsRecord = Boolean(claims?.P641?.length || claims?.P1344?.length);
    if (!entity || !human || !hasSportsRecord) return [];

    const sportId = getEntityId(claims, "P641");
    const games = (claims?.P1344 ?? []).map((claim) => claim.mainsnak?.datavalue?.value?.id).filter((id): id is string => Boolean(id));
    const awards = (claims?.P166 ?? []).map((claim) => claim.mainsnak?.datavalue?.value?.id).filter((id): id is string => Boolean(id));
    const name = getLabel(entity) ?? match.label ?? match.id;
    const description = entity.descriptions?.pt?.value ?? entity.descriptions?.en?.value ?? match.description ?? "Atleta com registro esportivo na Wikidata.";
    const sport = getLabel(relatedEntities[sportId ?? ""]) ?? description;
    const edition = games.map((id) => getLabel(relatedEntities[id])).filter((label): label is string => Boolean(label)).slice(0, 2).join(", ") || "Perfil esportivo";
    const medals = awards.map((id) => getLabel(relatedEntities[id])).filter((label): label is string => Boolean(label)).slice(0, 2);

    return [{
      id: `wikidata-${match.id}`,
      nome: name,
      esporte: sport,
      modalidade: sport,
      edicao: edition,
      medalha: medals.join(", ") || "Consulte o perfil",
      resumo: description,
      curiosidade: "Ficha pesquisada ao vivo na Wikidata. Consulte a fonte para acessar as referências e os dados completos.",
      tags: [sport, edition, ...medals],
      fonte: `https://www.wikidata.org/wiki/${match.id}`,
    }];
  });
}

export async function pesquisarAtletas(consulta: string) {
  const termo = normalizar(consulta);
  const locais = atletas.filter((atleta) => normalizar([
    atleta.nome, atleta.esporte, atleta.modalidade, atleta.edicao, atleta.medalha,
    atleta.resumo, atleta.curiosidade, ...atleta.tags,
  ].join(" ")).includes(termo));

  if (consulta.length < 2) return { resultados: locais, fonte: "base local", atualizacao: "" };
  try {
    const externos = await buscarAtletasWikidata(consulta);
    const nomesExternos = new Set(externos.map((atleta) => normalizar(atleta.nome)));
    const resultados = [...externos, ...locais.filter((atleta) => !nomesExternos.has(normalizar(atleta.nome)))];
    return { resultados, fonte: "Wikidata", atualizacao: "Dados consultados ao vivo" };
  } catch (error) {
    console.warn("Busca Wikidata indisponível; usando o acervo local.", error);
    return { resultados: locais, fonte: "base local", atualizacao: "Fonte externa indisponível; exibindo dados locais" };
  }
}

export async function buscarEsportesEOlimpiada(consulta = "") {
  const [disciplinesResponse, countriesResponse] = await Promise.all([
    fetch(`${codanteBase}/disciplines`, { next: { revalidate: 21600 }, signal: AbortSignal.timeout(7000) }),
    fetch(`${codanteBase}/countries`, { next: { revalidate: 21600 }, signal: AbortSignal.timeout(7000) }),
  ]);
  if (!disciplinesResponse.ok || !countriesResponse.ok) throw new Error("A API olímpica não está disponível agora.");

  const [disciplinesData, countriesData] = await Promise.all([disciplinesResponse.json(), countriesResponse.json()]) as [
    { data?: Array<{ id: string; name: string; pictogram_url?: string }> },
    { data?: Array<{ id: string; name: string; flag_url: string; gold_medals: number; silver_medals: number; bronze_medals: number; total_medals: number; rank: number }> },
  ];
  const term = normalizar(consulta);
  return {
    competicao: "Jogos Olímpicos de Paris 2024",
    fonte: "Codante APIs",
    disciplinas: (disciplinesData.data ?? []).filter((item) => !term || normalizar(item.name).includes(term))
      .map((item): ModalidadeOlimpica => ({ id: item.id, nome: item.name, pictograma: item.pictogram_url })),
    paises: (countriesData.data ?? []).filter((item) => !term || normalizar(item.name).includes(term) || item.id.toLowerCase().includes(term))
      .map((item): PaisMedalhista => ({
        id: item.id, nome: item.name, bandeira: item.flag_url,
        ouro: item.gold_medals, prata: item.silver_medals, bronze: item.bronze_medals,
        total: item.total_medals, posicao: item.rank,
      })),
  };
}
