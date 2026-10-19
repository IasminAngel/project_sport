# Olímpica — histórias que inspiram

Aplicação Next.js para pesquisar atletas brasileiros e descobrir curiosidades sobre os Jogos Olímpicos. A interface em português consome os Route Handlers da própria aplicação.

## Requisitos

- Node.js 20.9 ou superior
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Para produção, use `npm run build` e depois `npm start`.

## API

- `GET /api/atletas` lista os atletas do acervo local.
- `GET /api/atletas?q=Rebeca` pesquisa atletas na API pública do Wikidata e combina os resultados com o acervo local. Fichas externas incluem modalidade, participações e reconhecimentos quando esses dados estão cadastrados.
- `GET /api/esportes` consulta modalidades e quadro de medalhas da API pública de Paris 2024 da Codante.
- `GET /api/esportes?q=Brasil` filtra modalidades e o quadro de medalhas.
- `GET /api/curiosidades` lista curiosidades olímpicas.
- `GET /api/curiosidades?q=chama` filtra as curiosidades por categoria, título ou texto.

As respostas incluem consulta, fonte e resultados. O acervo local e as curiosidades vivem em `src/lib/olympics.ts`. A busca de atletas usa a API pública do Wikidata, com cache de uma hora. Modalidades e medalhas usam a API Codante, com cache de seis horas e Paris 2024 como edição coberta. Se uma API externa ficar indisponível, o app continua com os dados locais.

## Tecnologias

Next.js 16 App Router, React 19, TypeScript, Route Handlers e CSS responsivo.
