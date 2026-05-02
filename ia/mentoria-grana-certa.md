# Plano de Evolucao — Isaac Porpino

**Atualizado em:** 2 de maio de 2026  
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
-> confirm nativo pergunta se deseja excluir
-> se cancelar, nada acontece
-> se confirmar, faz DELETE
-> atualiza tabela e cards
```

---

## Proximo objetivo tecnico

Trocar o `confirm()` nativo por uma logica preparada para um card/modal de confirmacao.

O fluxo desejado sera:

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

Ja foi iniciado:

```text
transactionIdToDelete = null
```

Essa variavel vai guardar temporariamente o id da movimentacao que o usuario quer excluir.

---

## Proximos passos do projeto

### Passo 1 — Logica do card de confirmacao

- criar funcao `openDeleteConfirmation(id)`
- guardar o `id` em `transactionIdToDelete`
- trocar o clique do botao excluir para chamar essa funcao
- depois criar funcoes para confirmar ou cancelar a exclusao

### Passo 2 — HTML do card

- criar uma estrutura simples para o card/modal de confirmacao
- incluir titulo, mensagem e dois botoes
- botoes esperados:
  - `Cancelar`
  - `Excluir`

### Passo 3 — CSS do card

- criar fundo escurecido
- centralizar o card
- usar visual limpo e consistente com o projeto
- destacar o botao de excluir como acao perigosa

### Passo 4 — Integrar logica + card

- abrir card ao clicar em excluir
- fechar card ao clicar em cancelar
- excluir de verdade ao clicar em confirmar
- limpar `transactionIdToDelete` depois de qualquer decisao

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
