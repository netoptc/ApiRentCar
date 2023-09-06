# study-rentcar-api

This is a study project of a car rental api

## 📘 Tech Stack

**Server:**

- Typescript
- Node
- Express
- Docker
- Jest

## ⭐ Installation

Install my-project with npm

```bash
  docker-compose up --build
```

## ✅ Running Tests

To run tests, run the following command

```bash
  npm run test
```

## 📌 Requirements

**Cadastro de carro**

Requisito Funcional

- Deve ser possivel cadastrar um novo carro
- Deve ser possivel listar todas as categorias

Regra de negocio

- Não deve ser possivel cadastra um carro com uma placa já existente
- O carro deve ser cadastrado, por padrão, com disponibilidade
- O usuário repsponsável pelo cadastro deve ser um usuário administrador

**Listagen de carros**

Requisito Funcional

- Deve ser possivel listar todos os carros disponíveis
- Deve ser possivel listar todos os carros disponíveis pelo nome da cateogira
- Deve ser possivel listar todos os carros disponíveis pelo nome da marca
- Deve ser possivel listar todos os carros disponíveis pelo nome do carro

Regra de negocio

- O usuario não precisa estar autenticado no sistema

**Cadastro de especificação do carro**

Requisito Funcional

- Deve ser possivel cadastrar um especificação para um carro

Regra de negocio

- Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
- Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro
- O usuario responsavel pelo cadastro deve ser um usuário administrador

**Cadastro de imagem do carro**

Requisito Funcional

- Deve ser possivel cadastrar a imagem do carro
- Deve ser possivel listar todos os carros

Requisito Não funciona

- Utilizar o multer para upload dos arquivos

Regra de negocio

- O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
- O usario responsavel pelo cadastro deve ser um usuario administrador

**Aluguel de carro**

Requisito Funcional

- Deve ser possivel cadastrar um aluguel

Regra de negocio

- O aluguel deve ter duração mínima de 24 horas
- Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario
- Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
