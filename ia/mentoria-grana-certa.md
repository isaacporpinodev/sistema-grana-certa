# Plano de Evolucao — Isaac Porpino

**Atualizado em:** 11 de maio de 2026  
**Projeto atual:** Grana Certa  
**Objetivo:** construir um projeto de portfolio simples, bem funcional e bem explicado, com base real em HTML, CSS, JavaScript e consumo de API fake com JSON Server.

---

## Meu momento atual

Estou desenvolvendo o `Grana Certa`, um sistema de controle financeiro pessoal.

A ideia atual e construir primeiro uma versao funcional, entendendo cada parte da logica, antes de refinar o layout e antes de pensar em recursos maiores como login, cadastro e multiplos usuarios.

O projeto hoje e basico, mas esta evoluindo para ficar apresentavel no portfolio.

---

## O que o projeto ja faz

Hoje o `Grana Certa` ja consegue:

- cadastrar movimentacoes financeiras
- separar movimentacoes por `entrada` e `saida`
- validar campos antes de salvar
- buscar movimentacoes no `json-server`
- listar movimentacoes na tabela
- editar movimentacoes
- cancelar uma edicao em andamento
- excluir movimentacoes
- confirmar exclusao com `confirm()`
- calcular total de entradas
- calcular total de saidas
- calcular saldo
- filtrar movimentacoes por mes
- ordenar movimentacoes da mais recente para a mais antiga
- exibir categorias com nomes mais amigaveis
- corrigir exibicao de datas no formato brasileiro sem voltar um dia
- confirmar exclusao com um card/modal proprio

---

## Tecnologias usadas agora

- `HTML`: estrutura da tela
- `CSS`: estilo visual
- `JavaScript`: logica, DOM, eventos, validacoes e consumo da API
- `JSON Server`: API fake para persistir movimentacoes em `db.json`

---

## O que estou consolidando com este projeto

### JavaScript

- variaveis globais de controle
- funcoes pequenas com responsabilidade clara
- objetos para mapear valores internos para textos amigaveis
- arrays com `forEach`, `filter` e `sort`
- comparacao com `startsWith`
- formatacao de moeda
- formatacao manual de data
- `async/await`
- `try/catch`
- `fetch`
- `POST`, `PUT` e `DELETE`

### DOM

- `getElementById`
- `querySelector`
- `createElement`
- `append`
- `innerText`
- `innerHTML`
- `addEventListener`
- eventos de `submit`, `click` e `change`
- controle de exibicao com `style.display`
- criacao de fluxo para modal/card de confirmacao

### Pensamento de produto

- pensar no fluxo antes de codar
- proteger acoes perigosas, como exclusao
- evitar perda acidental de dados digitados
- deixar a tabela mais clara para o usuario
- priorizar funcionalidade antes de layout

---

## Regras da mentoria

### Postura do mentor

- atuar como professor senior e mentor tecnico
- guiar Isaac com uma mudanca por vez
- nao fazer varias alteracoes de uma vez
- revisar o codigo antes de avancar
- explicar o motivo da mudanca
- priorizar entendimento real, nao copia de codigo
- manter o projeto como ferramenta de estudo e portfolio

### Forma de conduzir

Antes de codar, destrinchar:

1. O que a tarefa pede em palavras simples?
2. Qual problema isso resolve para o usuario?
3. Qual o input?
4. Qual o output esperado?
5. Quais variaveis ou estados serao necessarios?
6. Quais passos logicos resolvem isso?

Depois disso, fazer apenas o proximo passo.

---

## Fluxo atual do projeto

### Ao abrir a pagina

```text
pagina abre
-> busca movimentacoes na API
-> filtra por mes, se necessario
-> ordena por data
-> renderiza a tabela
-> atualiza cards de resumo
```

### Ao salvar movimentacao

```text
usuario preenche formulario
-> JS valida os campos
-> se for nova, faz POST
-> se for edicao, faz PUT
-> limpa formulario
-> atualiza tabela e cards
```

### Ao cancelar edicao

```text
usuario clica em cancelar edicao
-> formulario limpa
-> id de edicao volta para null
-> botao principal volta para salvar
-> botao cancelar edicao some
```

### Ao filtrar por mes

```text
usuario muda o select de mes
-> evento change chama fetchTransactions
-> lista e filtrada com startsWith
-> lista e ordenada por data
-> tabela e cards sao atualizados
```

### Ao excluir movimentacao hoje

```text
usuario clica em excluir
-> sistema guarda o id em transactionIdToDelete
-> modal de confirmacao abre
-> se cancelar, fecha modal e limpa id
-> se confirmar, exclui a movimentacao, fecha modal e limpa id
```

---

## Objetivo tecnico concluido

O `confirm()` nativo foi substituido por um card/modal proprio de confirmacao.

O fluxo atual e:

```text
clicou em excluir
-> guarda o id da movimentacao
-> abre card de confirmacao

clicou em cancelar
-> fecha card
-> limpa id guardado

clicou em confirmar
-> usa o id guardado
-> exclui movimentacao
-> fecha card
-> limpa id guardado
-> atualiza tabela
```

Ja foi iniciado no codigo:

```text
transactionIdToDelete = null
```

Essa variavel vai guardar temporariamente o id da movimentacao que o usuario quer excluir.

Foram criadas as funcoes:

```text
openDeleteConfirmation(id)
cancelDeleteConfirmation()
confirmDeleteTransaction()
```

Estado atual dessas funcoes:

- `openDeleteConfirmation(id)`: recebe o id da movimentacao e guarda em `transactionIdToDelete`.
- `cancelDeleteConfirmation()`: limpa o id guardado, voltando `transactionIdToDelete` para `null`, e fecha o modal.
- `confirmDeleteTransaction()`: verifica se existe id guardado, chama `deleteTransaction(transactionIdToDelete)`, limpa o id e fecha o modal.
- `deleteTransaction(id)`: ficou responsavel apenas por excluir de verdade na API.

---

## Proximos passos do projeto

### Passo 1 — Estado visual de edicao

- mostrar para o usuario quando o formulario estiver em modo de edicao
- deixar o titulo do formulario mais claro durante a edicao
- talvez adicionar uma classe visual na area do formulario

### Passo 2 — Experiencia ao trocar filtros

- decidir o que acontece se o usuario trocar o mes enquanto esta editando
- decidir o que acontece se o usuario trocar o mes com o formulario preenchido
- evitar perda acidental de dados digitados

### Passo 3 — Organizacao dos arquivos JS

- depois que as funcionalidades estiverem estaveis, separar responsabilidades
- `ui.js` pode receber modal e mensagens
- `filters.js` pode receber filtro por mes e ordenacao
- `storage.js` pode receber chamadas para API
- `theme.js` pode receber tema claro/escuro

### Passo 4 — Responsividade

- ajustar cards, formulario e tabela em telas menores
- preencher `responsive.css`
- garantir que a tabela continue usavel no mobile

---

## Refinamentos futuros anotados

- quando trocar o filtro de mes em modo edicao, cancelar a edicao automaticamente
- se o formulario estiver preenchido e o usuario trocar o mes, pensar em confirmacao antes de limpar
- separar melhor responsabilidades entre arquivos JS
- melhorar mensagens de erro quando o servidor estiver desligado
- criar layout com sidebar igual as referencias visuais
- criar tela de dashboard mais polida
- criar tela de movimentacoes mais completa
- melhorar botoes com icones
- preparar README principal para portfolio
- adicionar prints do projeto
- futuramente pensar em cadastro/login
- futuramente suportar ate 10 usuarios

---

## Ordem correta de evolucao

```text
funcionar bem
-> organizar a logica
-> melhorar experiencia do usuario
-> refinar layout
-> preparar portfolio
-> pensar em usuarios/login no futuro
```

---

## Lembrete principal

O foco agora nao e fazer tudo rapido.

O foco e:

```text
entender o problema
pensar no fluxo
fazer uma mudanca pequena
testar
revisar
avancar
```

Esse projeto deve provar que Isaac entende o que esta construindo.
