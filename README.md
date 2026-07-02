# Grana Certa

Projeto simples de controle financeiro pessoal desenvolvido com HTML, CSS e JavaScript.

A proposta do projeto é permitir o cadastro, edição, exclusão e filtragem de movimentações financeiras, mantendo uma base de código enxuta e fácil de entender para portfólio.

## Funcionalidades

- Cadastrar movimentações financeiras
- Editar movimentações existentes
- Cancelar edição em andamento
- Excluir movimentações com modal de confirmação
- Filtrar movimentações por mês
- Ordenar movimentações por data mais recente
- Calcular total de entradas
- Calcular total de saídas
- Calcular saldo atual
- Alternar tema claro/escuro com persistência em `localStorage`

## Tecnologias

- HTML
- CSS
- JavaScript
- JSON Server
- Fetch API
- LocalStorage

## Estrutura

```text
grana-certa/
├── assets/
│   ├── icons/
│   └── images/
├── css/
│   └── style.css
├── js/
│   └── app.js
├── index.html
├── db.json
├── package.json
└── README.md
```

## Como rodar

Instale as dependências:

```bash
npm install
```

Inicie a API fake:

```bash
npm run server
```

A API ficará disponível em:

```text
http://localhost:3000/transactions
```

Depois abra o `index.html` no navegador, preferencialmente usando a extensão Live Server do VS Code.

## Observação

Este projeto usa `json-server` como API fake para fins de estudo e portfólio. Futuramente, a ideia é evoluir para uma API própria com back-end real e banco de dados.
