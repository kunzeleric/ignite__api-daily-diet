# Daily Diet API Challenge

Segundo desafio do curso de Node.js da Rocketseat. 

Consiste na implantação de uma API que permite o usuário a criar conta, editar seus dados e fazer login para adicionar e controlar suas refeições diárias. 

Além disso, o usuário pode também obter métricas de total de calorias, melhor sequência de pratos na dieta, entre outros indicadores.


## Tecnologias

- Node w/ Typescript
- Fastify
- Supertest
- Vitest
- Knex & SQLite
- Zod

### Regras da aplicação

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    - [x] Nome
    - [x] Descrição
    - [x] Data e Hora
    - [x] Está dentro ou não da dieta
    - [x] Quantidade de calorias
    - [x] Tipo de refeição (café da manhã, lanche, almoço, janta)
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [x] Deve ser possível recuperar as métricas de um usuário
    - [x] Quantidade total de refeições registradas
    - [x] Quantidade total de refeições dentro da dieta
    - [x] Quantidade total de refeições fora da dieta
    - [x] Melhor sequência de refeições dentro da dieta
    - [x] Total de calorias de todas refeições
    - [x] Total de calorias de pratos na dieta
    - [x] Total de calorias de pratos fora da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

### Next Level
- [x] Documentação em swagger
- [x] Deve ser possível deletar um usuário
- [x] Deve ser possível editar um usuário
- [x] Permitir que os usuários registrem a quantidade de calorias para cada refeição
- [x] Permitir que os usuários categorizem suas refeições em grupos como café da manhã, almoço, jantar, lanches, etc
- [x] Implementação de testes de integração
    - [x] Testes das Rotas de Usuários:
        - [x] Deve ser possível criar um usuário
        - [x] Deve ser possível logar um usuário
        - [x] Deve ser possível editar um usuário
        - [x] Não deve ser possível criar um usuário com email duplicado
    - [x] Testes das Rotas de Refeições
        - [x] Deve ser possível cadastrar uma refeição
        - [x] Deve ser possível editar uma refeição
        - [x] Deve ser possível buscar uma refeição por um ID

## Rodando localmente

Clone o projeto

```bash
  git clone https://link-para-o-projeto
```

Entre no diretório do projeto

```bash
  cd my-project
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Documentação da API

Documentação feita no Swagger. Para acessar, rode o projeto localmente com ```npm run dev``` e acesse as rotas para testar.

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Aprendizados

- Documentar rotas com Swagger integrado ao Fastify
- Testes de integração com o Vitest e Supertest
- Aprofundamento no conhecimento do query builder Knex
- Estruturação de código e tipagem com TypeScript
- Melhor entendimento de API's e como tratar e verificar dados e devolver respostas ao cliente

## Melhorias Futuras

- Testes unitários
- Reestruturação para implementação de princípio SOLID
- Utilização de Token para identificação do usuário.
