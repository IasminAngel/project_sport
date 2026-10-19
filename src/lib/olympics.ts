export type Atleta = {
  id: string;
  nome: string;
  esporte: string;
  modalidade: string;
  edicao: string;
  medalha: string;
  resumo: string;
  curiosidade: string;
  tags: string[];
  fonte: string;
};

export const atletas: Atleta[] = [
  {
    id: "rebeca-andrade", nome: "Rebeca Andrade", esporte: "Ginástica artística", modalidade: "Solo e individual geral", edicao: "Paris 2024", medalha: "Ouro, prata e bronze",
    resumo: "Ginasta paulista e maior medalhista olímpica do Brasil. Em Paris 2024, conquistou o ouro no solo e recebeu uma homenagem histórica das finalistas Simone Biles e Jordan Chiles.",
    curiosidade: "É a primeira brasileira a conquistar seis medalhas olímpicas.", tags: ["ginástica", "ginastica", "solo", "ouro", "prata", "bronze"], fonte: "https://olympics.com/pt/atletas/rebeca-andrade",
  },
  {
    id: "rayssa-leal", nome: "Rayssa Leal", esporte: "Skate", modalidade: "Street", edicao: "Tóquio 2020 e Paris 2024", medalha: "Prata e bronze",
    resumo: "A maranhense conhecida como Fadinha conquistou a prata em Tóquio e o bronze em Paris na prova de skate street.",
    curiosidade: "Aos 13 anos, tornou-se a mais jovem medalhista olímpica do Brasil.", tags: ["skate", "street", "fadinha", "prata", "bronze"], fonte: "https://olympics.com/pt/atletas/rayssa-leal",
  },
  {
    id: "beatriz-souza", nome: "Beatriz Souza", esporte: "Judô", modalidade: "+78 kg", edicao: "Paris 2024", medalha: "Ouro e bronze",
    resumo: "Judoca paulista, Beatriz abriu o quadro de medalhas do Brasil em Paris com ouro na categoria acima de 78 kg e depois conquistou o bronze por equipes mistas.",
    curiosidade: "O ouro em Paris foi o primeiro título olímpico individual do judô feminino brasileiro.", tags: ["judô", "judo", "pesado", "ouro", "bronze"], fonte: "https://olympics.com/pt/atletas/beatriz-souza",
  },
  {
    id: "isaquias-queiroz", nome: "Isaquias Queiroz", esporte: "Canoagem velocidade", modalidade: "C1 1000 m", edicao: "Rio 2016, Tóquio 2020 e Paris 2024", medalha: "Ouro, prata e bronze",
    resumo: "Canoísta baiano de Ubaitaba, Isaquias construiu uma trajetória olímpica com cinco medalhas em três edições consecutivas dos Jogos.",
    curiosidade: "Foi o primeiro brasileiro a conquistar três medalhas em uma única edição olímpica, no Rio 2016.", tags: ["canoagem", "canoa", "c1", "ouro", "prata", "bronze", "bahia"], fonte: "https://olympics.com/pt/atletas/isaquias-queiroz",
  },
  {
    id: "martine-grael", nome: "Martine Grael", esporte: "Vela", modalidade: "49er FX", edicao: "Rio 2016 e Tóquio 2020", medalha: "Dois ouros",
    resumo: "Velejadora brasileira que, ao lado de Kahena Kunze, venceu a classe 49er FX em duas edições consecutivas dos Jogos Olímpicos.",
    curiosidade: "É filha do bicampeão olímpico Torben Grael; os dois fazem parte de uma família marcante da vela brasileira.", tags: ["vela", "velejadora", "49er", "ouro"], fonte: "https://olympics.com/pt/atletas/martine-grael",
  },
  {
    id: "kahena-kunze", nome: "Kahena Kunze", esporte: "Vela", modalidade: "49er FX", edicao: "Rio 2016 e Tóquio 2020", medalha: "Dois ouros",
    resumo: "Velejadora carioca que venceu a classe 49er FX ao lado de Martine Grael nos Jogos do Rio e de Tóquio.",
    curiosidade: "A parceria com Martine conquistou dois ouros olímpicos consecutivos na mesma classe.", tags: ["vela", "velejadora", "49er", "ouro"], fonte: "https://olympics.com/pt/atletas/kahena-kunze",
  },
  {
    id: "thiago-braz", nome: "Thiago Braz", esporte: "Atletismo", modalidade: "Salto com vara", edicao: "Rio 2016 e Tóquio 2020", medalha: "Ouro e bronze",
    resumo: "O saltador com vara venceu o ouro diante da torcida no Rio 2016 e conquistou o bronze nos Jogos de Tóquio.",
    curiosidade: "O salto de 6,03 m no Rio 2016 estabeleceu recorde olímpico na época.", tags: ["atletismo", "salto com vara", "ouro", "bronze"], fonte: "https://olympics.com/pt/atletas/thiago-braz",
  },
  {
    id: "bruninho", nome: "Bruninho (Bruno Rezende)", esporte: "Vôlei", modalidade: "Quadra masculina", edicao: "Rio 2016", medalha: "Ouro",
    resumo: "Levantador da seleção brasileira de vôlei, Bruno Rezende foi capitão da equipe campeã olímpica nos Jogos do Rio.",
    curiosidade: "É filho de Bernardinho, técnico da seleção masculina campeã olímpica em 2004 e 2016.", tags: ["vôlei", "volei", "levantador", "quadra", "ouro"], fonte: "https://olympics.com/pt/atletas/bruno-mossa-de-rezende",
  },
  {
    id: "maurren-magalhaes", nome: "Maurren Maggi", esporte: "Atletismo", modalidade: "Salto em distância", edicao: "Pequim 2008", medalha: "Ouro",
    resumo: "Saltadora paulista, Maurren Maggi conquistou em Pequim o primeiro ouro olímpico individual feminino do Brasil.",
    curiosidade: "Seu salto de 7,04 m garantiu a vitória por apenas um centímetro.", tags: ["atletismo", "salto em distância", "ouro"], fonte: "https://olympics.com/pt/atletas/maurren-higa-maggi",
  },
  {
    id: "robert-scheidt", nome: "Robert Scheidt", esporte: "Vela", modalidade: "Laser e Star", edicao: "1996 a 2012", medalha: "Dois ouros, duas pratas e um bronze",
    resumo: "Um dos maiores nomes da vela mundial, Robert Scheidt conquistou cinco medalhas olímpicas em cinco edições consecutivas.",
    curiosidade: "É um dos atletas brasileiros com mais medalhas olímpicas, empatado com Torben Grael.", tags: ["vela", "laser", "star", "ouro", "prata", "bronze"], fonte: "https://olympics.com/pt/atletas/robert-scheidt",
  },
  {
    id: "torben-grael", nome: "Torben Grael", esporte: "Vela", modalidade: "Soling e Star", edicao: "1984 a 2004", medalha: "Dois ouros, uma prata e dois bronzes",
    resumo: "Velejador brasileiro com cinco medalhas em seis participações olímpicas, incluindo dois ouros na classe Star.",
    curiosidade: "Divide com Robert Scheidt o recorde brasileiro de cinco medalhas olímpicas.", tags: ["vela", "soling", "star", "ouro", "prata", "bronze"], fonte: "https://olympics.com/pt/atletas/torben-grael",
  },
  {
    id: "ana-marcela", nome: "Ana Marcela Cunha", esporte: "Maratona aquática", modalidade: "10 km", edicao: "Tóquio 2020", medalha: "Ouro",
    resumo: "A nadadora de maratona aquática venceu os 10 km em Tóquio e se tornou campeã olímpica da modalidade.",
    curiosidade: "A prova olímpica de águas abertas tem 10 quilômetros e pode durar cerca de duas horas.", tags: ["natação", "natacao", "águas abertas", "maratona", "ouro"], fonte: "https://olympics.com/pt/atletas/ana-marcela-cunha",
  },
];

export type Curiosidade = { id: string; categoria: string; titulo: string; texto: string };

export const curiosidades: Curiosidade[] = [
  { id: "primeiro-ouro", categoria: "História", titulo: "O primeiro ouro olímpico do Brasil", texto: "Guilherme Paraense venceu a prova de tiro rápido nos Jogos de Antuérpia, em 1920, e entrou para a história como o primeiro campeão olímpico brasileiro." },
  { id: "paris-medalhas", categoria: "Brasil", titulo: "Paris 2024 foi a melhor campanha feminina", texto: "Em Paris, as atletas brasileiras conquistaram 12 das 20 medalhas do país, o maior número de medalhas femininas do Brasil em uma edição dos Jogos." },
  { id: "tocha", categoria: "Tradição", titulo: "A chama olímpica viaja antes dos Jogos", texto: "A chama é acesa em Olímpia, na Grécia, e segue em um revezamento até a cidade-sede. A tradição moderna começou nos Jogos de Berlim, em 1936." },
  { id: "aneis", categoria: "Símbolos", titulo: "Os cinco anéis representam a união", texto: "Criados por Pierre de Coubertin em 1913, os anéis entrelaçados simbolizam a união dos continentes e o encontro de atletas de todo o mundo." },
  { id: "mascotes", categoria: "Tradição", titulo: "Mascotes olímpicos têm uma longa história", texto: "Schuss, um esquiador estilizado dos Jogos de Inverno de Grenoble 1968, é considerado a primeira mascote olímpica. A primeira mascote oficial de verão foi Waldi, em Munique 1972." },
  { id: "medalhas", categoria: "Medalhas", titulo: "Medalhas de ouro são feitas principalmente de prata", texto: "Pelas regras olímpicas modernas, as medalhas de ouro devem conter ao menos 92,5% de prata e ser banhadas com pelo menos seis gramas de ouro." },
  { id: "paralimpiadas", categoria: "Jogos", titulo: "Os Jogos Paralímpicos nasceram de uma iniciativa médica", texto: "Em 1948, o neurologista Ludwig Guttmann organizou uma competição esportiva para veteranos com lesão medular. O movimento evoluiu para os Jogos Paralímpicos, realizados pela primeira vez em Roma, em 1960." },
  { id: "brasil-sede", categoria: "Brasil", titulo: "O Rio foi a primeira cidade sul-americana a sediar os Jogos", texto: "Em 2016, o Rio de Janeiro recebeu os primeiros Jogos Olímpicos realizados na América do Sul." },
];

export function normalizar(valor: string) {
  return valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
}

export function buscarAtletas(consulta = "") {
  const termo = normalizar(consulta);
  if (!termo) return atletas;
  return atletas.filter((atleta) =>
    normalizar([atleta.nome, atleta.esporte, atleta.modalidade, atleta.edicao, atleta.medalha, atleta.resumo, atleta.curiosidade, ...atleta.tags].join(" ")).includes(termo),
  );
}

export function buscarCuriosidades(consulta = "") {
  const termo = normalizar(consulta);
  if (!termo) return curiosidades;
  return curiosidades.filter((curiosidade) => normalizar([curiosidade.categoria, curiosidade.titulo, curiosidade.texto].join(" ")).includes(termo));
}
