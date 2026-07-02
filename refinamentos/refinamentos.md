# Refinamentos do Grana Certa

Este arquivo guarda as melhorias que ainda queremos fazer no projeto, separando o que esta em andamento do que fica para depois.

## O que estamos fazendo agora

### 1. Mostrar modo edicao de forma visual

Hoje o sistema ja entra em modo edicao quando o usuario clica em `Editar`.

O que ja acontece:
- o formulario e preenchido com os dados da movimentacao
- o `editingTransactionId` guarda o id da movimentacao
- o botao principal muda para `Atualizar movimentacao`
- o botao `Cancelar edicao` aparece

O que ainda queremos melhorar:
- deixar mais claro visualmente que o formulario esta em modo edicao
- talvez mudar o titulo do formulario
- talvez adicionar uma borda ou destaque no card do formulario
- voltar ao visual normal ao salvar ou cancelar

Fluxo esperado:

```text
clicou em Editar
-> formulario entra em modo edicao
-> usuario percebe visualmente que esta editando

salvou ou cancelou
-> formulario sai do modo edicao
-> visual volta ao normal
```

## Melhorias futuras

### Filtros

- adicionar filtro por ano
- manter o filtro por mes
- permitir combinacoes como:
  - todos os anos
  - ano especifico
  - mes especifico dentro de um ano
- pensar depois em filtro por tipo:
  - entrada
  - saida
  - todos
- pensar depois em filtro por categoria

### Formulario

- melhorar o comportamento ao trocar o filtro de mes com o formulario preenchido
- se estiver editando e o usuario trocar o filtro, decidir se a edicao deve ser cancelada automaticamente
- evitar perda acidental de dados digitados
- mostrar melhor quando o formulario esta em modo edicao

### Movimentacoes

- melhorar confirmacoes e mensagens para o usuario
- revisar comportamento ao excluir uma movimentacao que esta sendo editada
- garantir que os totais sempre refletem o filtro atual
- pensar em paginacao se houver muitas movimentacoes

### Organizacao do JavaScript

Depois que as funcionalidades estiverem estaveis, separar responsabilidades:

- `transactions.js`: regras principais das movimentacoes
- `storage.js`: chamadas para API (`GET`, `POST`, `PUT`, `DELETE`)
- `filters.js`: filtros e ordenacao
- `ui.js`: modal, mensagens e renderizacao visual
- `theme.js`: tema claro/escuro
- `main.js`: inicializacao geral do app

Importante:

```text
nao separar arquivos antes de entender bem a logica funcionando
```

### Layout e responsividade

- preencher `responsive.css`
- melhorar visual em telas pequenas
- ajustar cards de resumo no mobile
- melhorar tabela no mobile
- criar layout mais proximo das telas de referencia
- futuramente adicionar sidebar
- futuramente separar visualmente Dashboard e Movimentacoes

### Portfolio

- atualizar README principal com funcionalidades finais
- adicionar prints do projeto
- explicar as decisoes tecnicas
- listar proximas melhorias
- preparar o projeto para apresentacao no GitHub

### Futuro mais distante

- pensar em login e cadastro
- permitir multiplos usuarios
- suportar ate 10 pessoas usando o sistema
- trocar `json-server` por backend real
- trocar a API fake atual por uma API propria, pensada para escalabilidade
- criar um back-end real para usuarios, autenticacao e movimentacoes
- usar banco de dados real
- futuramente reconstruir ou evoluir para React, se fizer sentido

## Ordem recomendada

```text
1. terminar modo edicao visual
2. melhorar comportamento dos filtros
3. adicionar filtro por ano
4. revisar pequenos bugs e mensagens
5. organizar arquivos JS
6. melhorar responsividade
7. refinar layout para portfolio
```
