# Daily Diet API

## Tecnologias

- Node w/ Typescript
- Fastify
- Supertest
- Vitest
- Knex & SQLite

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
- [ ] Implementação de testes unitários
- [ ] Implementação de testes de integração