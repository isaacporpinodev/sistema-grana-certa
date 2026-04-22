# GranaCerta

O `GranaCerta` e um projeto de controle financeiro pessoal.

A ideia dele e simples:
- cadastrar movimentacoes
- separar o que e `entrada` e o que e `saida`
- calcular os totais
- mostrar tudo na tela

Este README foi escrito pensando em quem ainda esta aprendendo HTML, CSS e JavaScript.

## O que o projeto faz hoje

Hoje o projeto ja consegue:
- cadastrar uma movimentacao
- validar os campos do formulario antes de salvar
- buscar as movimentacoes salvas
- mostrar as movimentacoes na tabela
- calcular `Entradas`, `Saidas` e `Saldo`
- exibir um botao de acao na tabela

## Tecnologias usadas

- `HTML`: estrutura da pagina
- `CSS`: estilo visual
- `JavaScript`: comportamento da pagina
- `JSON Server`: API fake para salvar e buscar os dados

## Como pensar no projeto

Voce pode imaginar o projeto dividido em 3 partes:

1. A tela
Aqui entra o `HTML` e o `CSS`.
E a parte que o usuario ve.

2. A logica
Aqui entra o `JavaScript`.
E a parte que decide o que fazer quando o usuario clica, digita ou envia o formulario.

3. Os dados
Aqui entra o `db.json` junto com o `json-server`.
E a parte que guarda as movimentacoes.

## Estrutura do projeto

### `index.html`
E a estrutura principal da pagina.

Nele voce encontra:
- o cabecalho
- os cards de resumo
- o formulario
- a tabela de movimentacoes
- os scripts carregados no final da pagina

### `css/`
Guarda os arquivos de estilo.

Arquivos principais:
- `variables.css`: variaveis de cor, fonte, sombra e tema
- `style.css`: estilo geral da pagina
- `responsive.css`: ajustes para telas menores

### `js/`
Guarda os arquivos JavaScript.

Arquivos principais:
- `main.js`: cuida de partes gerais da interface, como menu do usuario e tema
- `transactions.js`: cuida do formulario, validacao, busca de dados, tabela e totais

Arquivos que ainda estao vazios ou em preparacao:
- `filters.js`
- `storage.js`
- `theme.js`
- `ui.js`

### `db.json`
E o arquivo que guarda as movimentacoes quando o `json-server` esta rodando.

Pense nele como um banco de dados simples para desenvolvimento.

### `package.json`
Guarda informacoes do projeto e o script para iniciar o servidor local.

## Como rodar o projeto

Para o projeto funcionar por completo, a API local precisa estar ligada.

### 1. Inicie o `json-server`

Use o script do projeto:

```bash
npm run server
```

Isso faz o servidor rodar em:

```text
http://localhost:3000
```

### 2. Abra o `index.html`

Depois disso, abra sua pagina normalmente.

Se o servidor estiver ligado, o JavaScript vai conseguir:
- buscar as movimentacoes
- salvar novas movimentacoes

Se o servidor nao estiver ligado, os dados nao vao aparecer e o `fetch` vai falhar.

## Como o fluxo funciona

Essa e a parte mais importante para entender o projeto.

### Fluxo ao abrir a pagina

Quando a pagina carrega:

1. O JavaScript chama a funcao que busca as movimentacoes.
2. Essa funcao faz um `fetch` na API local.
3. Os dados recebidos sao usados para montar as linhas da tabela.
4. Depois os cards de resumo sao atualizados.

Ou seja:

```text
pagina abre -> busca dados -> monta tabela -> calcula totais
```

### Fluxo ao enviar o formulario

Quando o usuario clica em salvar:

1. O JavaScript impede o envio padrao do formulario.
2. Le os valores dos campos.
3. Valida os dados.
4. Se estiver tudo certo, envia para a API.
5. Depois busca as movimentacoes de novo.
6. A tabela e os cards sao atualizados.

Ou seja:

```text
usuario envia -> JS valida -> salva -> busca de novo -> atualiza tela
```

## Como o `transactions.js` esta organizado

Antes, muita coisa ficava misturada no mesmo bloco.

Agora ele esta dividido em funcoes menores.
Isso ajuda muito na leitura e na manutencao.

### 1. Constantes iniciais

No comeco do arquivo existem constantes como:
- `API_URL`
- `transactionForm`
- `formMessage`
- `transactionsList`

Essas constantes servem para guardar:
- a URL da API
- referencias para elementos do HTML

Isso evita repetir `document.getElementById(...)` toda hora.

### 2. Funcoes de apoio

Exemplos:
- `showFormMessage()`
- `hideFormMessage()`
- `formatCurrency()`
- `formatDate()`

Essas funcoes fazem tarefas pequenas e repetidas.

A ideia delas e:
- deixar o codigo mais limpo
- evitar repeticao

### 3. Funcao para ler o formulario

Funcao:

```js
getTransactionFormData()
```

Ela pega os valores dos campos e devolve um objeto com os dados da movimentacao.

Pense assim:
- o usuario preenche o formulario
- essa funcao transforma os campos em um objeto JavaScript

### 4. Funcao para validar os dados

Funcao:

```js
validateTransactionData()
```

Ela verifica se:
- a descricao foi preenchida
- o valor e valido
- a categoria foi escolhida
- a data foi escolhida
- o tipo foi escolhido

Se algum dado estiver errado, ela devolve uma mensagem de erro.

Se estiver tudo certo, ela devolve `null`.

### 5. Funcoes que montam a tabela

Exemplos:
- `createActionsCell()`
- `createTransactionRow()`
- `renderTransactions()`
- `renderEmptyState()`

Essas funcoes cuidam da parte visual da tabela.

Elas fazem coisas como:
- criar uma linha
- criar o botao de acao
- mostrar mensagem quando nao ha dados

### 6. Funcao que calcula os cards

Funcao:

```js
updateSummaryCards()
```

Ela percorre as transacoes e soma:
- total de entradas
- total de saidas

Depois calcula:

```text
saldo = entradas - saidas
```

No final, ela atualiza os 3 cards da tela.

### 7. Funcoes principais

As duas funcoes principais hoje sao:

- `fetchTransactions()`
- `handleTransactionSubmit()`

#### `fetchTransactions()`
Responsabilidade:
- buscar as transacoes na API
- mandar renderizar a tabela

#### `handleTransactionSubmit()`
Responsabilidade:
- reagir ao envio do formulario
- validar os dados
- salvar a movimentacao
- atualizar a tela depois

## Explicando algumas ideias importantes

### O que e `fetch`

`fetch` e o comando usado para conversar com a API.

Exemplo de ideia:
- buscar dados
- enviar dados
- editar dados
- excluir dados

No seu projeto, hoje ele esta sendo usado para:
- `GET`: buscar movimentacoes
- `POST`: salvar movimentacoes

### O que e validacao

Validacao significa conferir se os dados fazem sentido antes de continuar.

Exemplo:
- descricao vazia -> erro
- valor menor ou igual a zero -> erro
- categoria nao escolhida -> erro

A logica e:

```text
se estiver invalido -> mostra erro -> para
```

### O que e `return`

`return` interrompe a funcao naquele ponto.

Exemplo simples:

```text
tem erro? -> return
nao tem erro? -> continua
```

Sem `return`, o codigo continuaria e poderia salvar dados errados.

### O que e separar responsabilidades

Separar responsabilidades significa:
- cada funcao faz uma coisa
- e faz so aquela coisa

Exemplo:
- uma funcao valida
- outra formata moeda
- outra monta a linha
- outra busca os dados

Isso deixa o projeto mais facil de:
- entender
- corrigir
- manter

## Padrao de nomes do projeto

Decidimos seguir este padrao:

- variaveis e funcoes em ingles
- mensagens para o usuario em portugues

Exemplo:
- `transactionForm`
- `fetchTransactions`
- `updateSummaryCards`

Mas na tela:
- "Selecione uma categoria."
- "Movimentacao adicionada com sucesso!"

Esse padrao ajuda porque:
- o codigo fica mais alinhado com o ecossistema do JavaScript
- e a experiencia do usuario continua em portugues

## O que ainda pode melhorar

Proximos passos naturais do projeto:
- fazer o botao `Excluir` realmente funcionar
- implementar edicao de movimentacoes
- criar filtro por mes
- organizar melhor os arquivos JS ainda vazios
- limpar dados antigos invalidos do `db.json`

## Resumo final

Se voce estiver perdido, lembre desta ideia:

### O projeto faz isso

```text
formulario -> validacao -> API -> tabela -> cards
```

### E o arquivo mais importante hoje faz isso

```text
ler dados -> validar -> salvar -> buscar de novo -> renderizar
```

Se voce entender esse fluxo, ja esta entendendo o coracao do projeto.
