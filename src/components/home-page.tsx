"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import type { Atleta, Curiosidade } from "@/lib/olympics";
import type { ModalidadeOlimpica, PaisMedalhista } from "@/lib/external-olympics";

type Secao = "atletas" | "esportes" | "curiosidades";

export function HomePage({ totalAtletas, totalCuriosidades }: { totalAtletas: number; totalCuriosidades: number }) {
  const [secao, setSecao] = useState<Secao>("atletas");
  const [consulta, setConsulta] = useState("");
  const [resultadosAtletas, setResultadosAtletas] = useState<Atleta[]>([]);
  const [modalidades, setModalidades] = useState<ModalidadeOlimpica[]>([]);
  const [paisesMedalhistas, setPaisesMedalhistas] = useState<PaisMedalhista[]>([]);
  const [resultadosCuriosidades, setResultadosCuriosidades] = useState<Curiosidade[]>([]);
  const [origemAtletas, setOrigemAtletas] = useState("Wikidata");
  const [origemEsportes, setOrigemEsportes] = useState("Codante APIs · Paris 2024");
  const [atualizacao, setAtualizacao] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [pesquisou, setPesquisou] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setCarregando(true);
      setPesquisou(true);
      try {
        const endpoint = secao === "atletas" ? "/api/atletas" : secao === "esportes" ? "/api/esportes" : "/api/curiosidades";
        const response = await fetch(`${endpoint}?q=${encodeURIComponent(consulta)}`, { signal: controller.signal });
        if (!response.ok) throw new Error("A pesquisa não pôde ser concluída.");
        const data = await response.json();
        if (secao === "atletas") {
          setResultadosAtletas(data.resultados);
          setOrigemAtletas(data.fonte);
          setAtualizacao(data.atualizacao ?? "");
        } else if (secao === "esportes") {
          setModalidades(data.disciplinas);
          setPaisesMedalhistas(data.paises);
          setOrigemEsportes(data.indisponivel ? "Base local" : "Codante APIs · Paris 2024");
          setAtualizacao(data.indisponivel ? "API temporariamente indisponível; exibindo modalidades locais." : "Modalidades e medalhas consultadas na API pública.");
        } else setResultadosCuriosidades(data.resultados);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setResultadosAtletas([]);
          setResultadosCuriosidades([]);
          setModalidades([]);
          setPaisesMedalhistas([]);
        }
      } finally {
        if (!controller.signal.aborted) setCarregando(false);
      }
    }, 800);
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [consulta, secao]);

  function pesquisar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPesquisou(true);
  }

  const quantidade = secao === "atletas" ? resultadosAtletas.length : secao === "esportes" ? modalidades.length + paisesMedalhistas.length : resultadosCuriosidades.length;
  const origemAtiva = secao === "atletas" ? origemAtletas : secao === "esportes" ? origemEsportes : "Arquivo Olímpico";

  return (
    <main>
      <nav className="nav wrap" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="Olímpica, início"><span className="brand-mark">O</span> olímpica<span className="brand-dot">.</span></a>
        <a className="nav-link" href="#explorar">Explorar <span aria-hidden="true">↗</span></a>
      </nav>

      <section className="hero wrap" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> ENCICLOPÉDIA OLÍMPICA BRASILEIRA</div>
          <h1>Grandes histórias<br />merecem ser <em>lembradas.</em></h1>
          <p>Encontre quem fez história no esporte brasileiro. Descubra as conquistas, os detalhes e as curiosidades por trás dos Jogos.</p>
          <a className="hero-cta" href="#explorar">Comece a explorar <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-label="Ilustração de uma pista de atletismo olímpica" role="img">
          <span className="art-sun" />
          <div className="art-rings" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="track"><span>BRASIL · DESDE 1920</span><b>01</b></div>
          <div className="art-caption"><span>JOGOS OLÍMPICOS</span><strong>Uma história<br />em movimento.</strong></div>
          <span className="art-spark">✳</span>
        </div>
        <div className="hero-index"><span>001 — 2024</span><span>BRASIL NO PÓDIO</span><span>ARRASTE PARA EXPLORAR ↓</span></div>
      </section>

      <section className="explore-section" id="explorar">
        <div className="wrap explore-inner">
          <div className="section-heading">
            <div><span className="eyebrow muted">ARQUIVO ABERTO · 001</span><h2>O próximo nome<br />pode ser o seu.</h2></div>
            <p>Uma busca por atletas e curiosidades olímpicas do Brasil. Digite um nome, esporte, edição ou medalha.</p>
          </div>

          <div className="search-panel">
            <div className="tabs" role="tablist" aria-label="Tipo de conteúdo">
              <button type="button" role="tab" aria-selected={secao === "atletas"} className={secao === "atletas" ? "tab active" : "tab"} onClick={() => { setSecao("atletas"); setPesquisou(false); }}>Atletas <span>{totalAtletas.toString().padStart(2, "0")}</span></button>
              <button type="button" role="tab" aria-selected={secao === "esportes"} className={secao === "esportes" ? "tab active" : "tab"} onClick={() => { setSecao("esportes"); setPesquisou(false); }}>Esportes <span>2024</span></button>
              <button type="button" role="tab" aria-selected={secao === "curiosidades"} className={secao === "curiosidades" ? "tab active" : "tab"} onClick={() => { setSecao("curiosidades"); setPesquisou(false); }}>Curiosidades <span>{totalCuriosidades.toString().padStart(2, "0")}</span></button>
            </div>
            <form className="search-form" onSubmit={pesquisar}>
              <label className="sr-only" htmlFor="busca">Pesquise por atleta, modalidade ou curiosidade</label>
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input id="busca" type="search" placeholder={secao === "atletas" ? "Ex.: Rebeca Andrade, skate, ouro..." : secao === "esportes" ? "Ex.: Atletismo, Brasil, França..." : "Ex.: chama olímpica, medalhas..."} value={consulta} onChange={(event) => setConsulta(event.target.value)} />
              <button type="submit">Pesquisar <span aria-hidden="true">↗</span></button>
            </form>
            <div className="result-meta"><span>{carregando ? "BUSCANDO..." : pesquisou ? `${quantidade.toString().padStart(2, "0")} RESULTADO${quantidade === 1 ? "" : "S"}` : "PESQUISA EM TEMPO REAL"}</span><span>{origemAtiva.toLocaleUpperCase("pt-BR")}</span></div>
          </div>

          <div className="results" aria-live="polite">
            {secao === "atletas" && resultadosAtletas.map((atleta, index) => (
              <article className="result-card athlete-card" key={atleta.id}>
                <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="card-content"><div className="card-kicker">{atleta.esporte} <span>·</span> {atleta.edicao}</div><h3>{atleta.nome}</h3><p>{atleta.resumo}</p><div className="card-facts"><span><small>MODALIDADE</small>{atleta.modalidade}</span><span><small>MEDALHAS / PRÊMIOS</small>{atleta.medalha}</span><a href={atleta.fonte} target="_blank" rel="noreferrer">Fonte dos dados ↗</a></div></div>
                <div className="card-badge" aria-hidden="true">✳</div>
              </article>
            ))}
            {secao === "curiosidades" && resultadosCuriosidades.map((curiosidade, index) => (
              <article className="result-card fact-card" key={curiosidade.id}>
                <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="card-content"><div className="card-kicker">CURIOSIDADE <span>·</span> {curiosidade.categoria}</div><h3>{curiosidade.titulo}</h3><p>{curiosidade.texto}</p></div><div className="fact-arrow" aria-hidden="true">↗</div>
              </article>
            ))}
            {secao === "esportes" && <>
              {paisesMedalhistas.slice(0, 8).map((pais) => (
                <article className="result-card fact-card" key={pais.id}>
                  <div className="card-number">{String(pais.posicao).padStart(2, "0")}</div>
                  <div className="card-content"><div className="card-kicker">QUADRO DE MEDALHAS <span>·</span> PARIS 2024</div><h3>{pais.nome}</h3><p>{pais.ouro} ouro · {pais.prata} prata · {pais.bronze} bronze · {pais.total} medalhas no total.</p><div className="card-facts"><span><small>POSIÇÃO OFICIAL</small>{pais.posicao}º lugar</span><a href="https://docs.apis.codante.io/olympic-games" target="_blank" rel="noreferrer">Fonte dos dados ↗</a></div></div>
                  <span className="medal-total">{pais.total}</span>
                </article>
              ))}
              {modalidades.map((modalidade, index) => (
                <article className="result-card sport-card" key={modalidade.id}>
                  <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
                  {modalidade.pictograma && <Image className="sport-pictogram" src={modalidade.pictograma} alt="" width={48} height={48} />}
                  <div className="card-content"><div className="card-kicker">MODALIDADE OLÍMPICA <span>·</span> PARIS 2024</div><h3>{modalidade.nome}</h3><p>Disciplina esportiva dos Jogos Olímpicos de Paris 2024.</p><div className="card-facts"><a href="https://docs.apis.codante.io/olympic-games" target="_blank" rel="noreferrer">Fonte dos dados ↗</a></div></div>
                </article>
              ))}
            </>}
            {!carregando && pesquisou && quantidade === 0 && <div className="empty-state"><span>○</span><h3>Nenhuma história encontrada.</h3><p>Tente outro nome, esporte ou palavra-chave.</p></div>}
          </div>
          <div className="api-note"><span className="live-dot" /> {atualizacao || "CONTEÚDO SERVIDO POR APIs PÚBLICAS"} <span className="api-divider">/</span> EXPLORE SEM PRESSA</div>
        </div>
      </section>

      <footer className="footer"><div className="wrap footer-inner"><a className="brand" href="#inicio"><span className="brand-mark">O</span> olímpica<span className="brand-dot">.</span></a><p>Feito para quem acredita que toda conquista tem uma história.</p><span className="signature">Criada por: <strong>Iasmin Angel</strong></span><span>© 2026 · BRASIL</span></div></footer>
    </main>
  );
}
