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
- excluir movimentacoes
- editar movimentacoes
- cancelar uma edicao em andamento
- filtrar as movimentacoes por mes
- ordenar as movimentacoes da mais recente para a mais antiga
- exibir categorias com nomes mais amigaveis
- mostrar datas no formato brasileiro sem alterar o dia
- confirmar exclusao usando um card/modal proprio
- exibir botoes de acao na tabela

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
- `transactions.js`: cuida do formulario, validacao, criacao, edicao, exclusao, tabela e totais

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
3. Os dados recebidos podem ser filtrados pelo mes selecionado.
4. Depois as movimentacoes sao ordenadas pela data mais recente.
5. Os dados tratados sao usados para montar as linhas da tabela.
6. Depois os cards de resumo sao atualizados.

Ou seja:

```text
pagina abre -> busca dados -> filtra -> ordena -> monta tabela -> calcula totais
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

### Fluxo ao editar uma movimentacao

Quando o usuario clica em `Editar`:

1. O JavaScript pega os dados da transacao daquela linha.
2. Preenche o formulario com esses dados.
3. Guarda o `id` da transacao em edicao.
4. O botao principal muda para mostrar que agora o formulario esta em modo edicao.

Depois, quando o usuario clica em salvar:

1. O JavaScript valida os dados novamente.
2. Percebe que existe uma transacao em edicao.
3. Em vez de criar uma nova, atualiza a transacao existente.
4. Depois limpa o modo de edicao.

Ou seja:

```text
clicou em editar -> formulario foi preenchido -> id foi guardado -> submit atualiza
```

### Fluxo ao cancelar uma edicao

Quando o usuario clica em `Editar`, o formulario entra em modo de edicao.
Se ele clicar em `Cancelar edicao`:

1. O formulario e limpo.
2. O `editingTransactionId` volta para `null`.
3. O botao principal volta para `Salvar movimentacao`.
4. O botao de cancelar edicao fica escondido novamente.

Ou seja:

```text
editar -> preencher formulario -> cancelar -> limpar modo de edicao
```

### Fluxo ao filtrar por mes

Quando o usuario muda o filtro de mes:

1. O evento `change` do filtro chama `fetchTransactions()`.
2. As movimentacoes sao buscadas novamente.
3. A funcao `filterTransactionsByMonth()` verifica o mes selecionado.
4. Se o filtro for `todos`, todas as movimentacoes continuam na lista.
5. Se for um mes especifico, ficam apenas as movimentacoes cuja data comeca com aquele ano e mes.
6. Depois a lista filtrada e ordenada por data.

Ou seja:

```text
mudou o mes -> busca dados -> filtra por mes -> ordena -> renderiza
```

### Fluxo de exclusao com modal

Hoje a exclusao usa um card/modal proprio em vez do `confirm()` nativo do navegador.

1. O usuario clica em `Excluir`.
2. O sistema guarda o `id` da movimentacao em `transactionIdToDelete`.
3. O card/modal de confirmacao e aberto.
4. Se o usuario cancelar, o `id` guardado volta para `null`.
5. Se o usuario confirmar, o sistema usa o `id` guardado para excluir a movimentacao.
6. O modal fecha.
7. Depois da decisao, o `id` guardado tambem volta para `null`.

Ou seja:

```text
clicou em excluir -> abre modal -> confirma ou cancela -> fecha modal -> limpa id
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

Tambem existe uma variavel importante:
- `editingTransactionId`
- `transactionIdToDelete`

Essas constantes servem para guardar:
- a URL da API
- referencias para elementos do HTML

Ja `editingTransactionId` serve para guardar qual transacao esta sendo editada no momento.

Ja `transactionIdToDelete` serve para guardar temporariamente qual movimentacao o usuario pretende excluir.

Isso evita repetir `document.getElementById(...)` toda hora.

### 2. Funcoes de apoio

Exemplos:
- `showFormMessage()`
- `hideFormMessage()`
- `formatCurrency()`
- `formatDate()`
- `formatCategory()`

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
- `openDeleteConfirmation()`
- `cancelDeleteConfirmation()`
- `confirmDeleteTransaction()`

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

### 7. Funcoes de filtro e ordenacao

Funcoes:

```js
filterTransactionsByMonth()
sortTransactionsByDate()
```

`filterTransactionsByMonth()` recebe as movimentacoes e devolve apenas as que pertencem ao mes selecionado.

`sortTransactionsByDate()` recebe as movimentacoes e coloca as mais recentes primeiro.

Essas funcoes deixam o fluxo mais claro:

```text
lista original -> lista filtrada -> lista ordenada
```

### 8. Funcoes de confirmacao de exclusao

Funcoes:

```js
openDeleteConfirmation()
cancelDeleteConfirmation()
confirmDeleteTransaction()
```

`openDeleteConfirmation()` guarda o `id` da movimentacao que o usuario quer excluir.

`cancelDeleteConfirmation()` limpa esse `id`, indicando que a exclusao foi cancelada.

`confirmDeleteTransaction()` verifica se existe um `id` guardado e, se existir, chama a exclusao daquela movimentacao. Depois disso, limpa o `id` e fecha o modal.

### 9. Funcoes principais

As duas funcoes principais hoje sao:

- `fetchTransactions()`
- `handleTransactionSubmit()`
- `deleteTransaction()`

#### `fetchTransactions()`
Responsabilidade:
- buscar as transacoes na API
- filtrar as transacoes pelo mes selecionado
- ordenar as transacoes pela data
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
- `PUT`: atualizar movimentacoes
- `DELETE`: excluir movimentacoes

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

### O que e `startsWith`

`startsWith` verifica se um texto comeca com outro texto.

No filtro por mes, a data salva vem assim:

```text
2026-04-30
```

E o filtro vem assim:

```text
2026-04
```

Entao o projeto verifica:

```text
"2026-04-30" comeca com "2026-04"?
```

Se sim, aquela movimentacao pertence ao mes selecionado.

### Por que a data e formatada manualmente

Antes, a data era exibida usando `new Date(dateString)`.
Isso podia causar um problema de fuso horario: uma data salva como `2026-04-30` podia aparecer como `29/04/2026`.

Agora a funcao `formatDate()` separa a string manualmente:

```text
2026-04-30 -> 30/04/2026
```

Assim a data aparece no formato brasileiro sem mudar o dia.

### O que e `null`

`null` significa, de forma simples:

- vazio
- sem valor no momento
- nada guardado ali agora

Exemplo mental:

```text
caixa vazia = null
```

No seu projeto, essa ideia aparece em:

```js
let editingTransactionId = null;
```

Isso significa:
- a variavel existe
- mas no inicio nao tem nenhum `id` guardado nela
- ou seja, nenhuma transacao esta sendo editada

### Por que `editingTransactionId = null` aparece mais de uma vez

Essa e uma duvida muito comum para quem esta comecando.

Voce pode ver estas duas linhas:

```js
let editingTransactionId = null;
```

e depois:

```js
editingTransactionId = null;
```

Parece igual, mas nao e a mesma acao.

#### Primeiro caso

```js
let editingTransactionId = null;
```

Aqui voce esta:
- criando a variavel
- definindo o valor inicial dela

Ou seja:
- "quero uma variavel chamada `editingTransactionId`"
- "ela vai comecar vazia"

#### Segundo caso

```js
editingTransactionId = null;
```

Aqui voce nao esta criando a variavel de novo.

Aqui voce esta:
- pegando a variavel que ja existe
- limpando o valor dela

Ou seja:
- antes ela podia ter um `id`
- agora ela volta a ficar vazia

### Exemplo simples

```js
let nome = "Isaac";
nome = "Maria";
nome = null;
```

O que aconteceu:

1. A variavel `nome` foi criada com `"Isaac"`
2. Depois o valor mudou para `"Maria"`
3. Depois o valor mudou para `null`

A variavel continuou sendo a mesma.
So o valor dela mudou.

Com `editingTransactionId` e igual:

```text
inicio da pagina -> null
clicou em editar -> id da transacao
salvou ou cancelou -> null de novo
```

Entao:
- o valor `null` e o mesmo
- mas o momento e a acao sao diferentes

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
- mostrar visualmente quando o formulario estiver em modo edicao
- tratar o formulario quando o usuario trocar o filtro de mes
- organizar melhor os arquivos JS ainda vazios
- limpar dados antigos invalidos do `db.json`
- melhorar responsividade em telas menores
- melhorar o layout para ficar mais proximo das telas de referencia
- preparar o projeto para portfolio com README final, prints e explicacao das funcionalidades

## Plano para a proxima etapa

Na proxima etapa, o foco sera continuar melhorando a parte funcional antes do layout.

Ordem sugerida:

1. Mostrar visualmente quando o formulario estiver em modo edicao.
2. Melhorar a experiencia quando o usuario troca o filtro de mes com o formulario preenchido.
3. Revisar pequenos pontos de organizacao no `transactions.js`.
4. Melhorar responsividade em telas menores.
5. Depois disso, comecar a reformar o layout com calma, seguindo as telas de referencia.

## Resumo final

Se voce estiver perdido, lembre desta ideia:

### O projeto faz isso

```text
formulario -> validacao -> API -> tabela -> cards
```

### E o arquivo mais importante hoje faz isso

```text
ler dados -> validar -> criar ou editar -> buscar de novo -> renderizar
```

Se voce entender esse fluxo, ja esta entendendo o coracao do projeto.
