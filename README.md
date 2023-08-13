# Levantamento de Requisitos

## Cadastro de carro

**RF**
- Deve ser possivel cadastrar um novo carro
- Deve ser possivel listar todas as categorias

**RN**
- Não deve ser possivel cadastra um carro com uma placa já existente 
- O carro deve ser cadastrado, por padrão, com disponibilidade
- O usuário repsponsável pelo cadastro deve ser um usuário administrador

## Listagen de carros

**RF**
- Deve ser possivel listar todos os carros disponíveis 
- Deve ser possivel listar todos os carros disponíveis pelo nome da cateogira
- Deve ser possivel listar todos os carros disponíveis pelo nome da marca 
- Deve ser possivel listar todos os carros disponíveis pelo nome do carro

**RN**
- O usuario não precisa estar autenticado no sistema

## Cadastro de especificação do carro

**RF**
- Deve ser possivel cadastrar um especificação para um carro

**RN**
- Não deve ser possivel cadastrar uma especificação para um carro não cadastrado
- Não deve ser possivel cadastrar uma especificação já existente para o mesmo carro
- O usuario responsavel pelo cadastro deve ser um usuário administrador

## Cadastro de imagem do carro

**RF**
- Deve ser possivel cadastrar a imagem do carro
- Deve ser possivel listar todos os carros

**RNF**
- Utilizar o multer para upload dos arquivos

**RN**
- O usuario deve poder cadastrar mais de uma imagem para o mesmo carro
- O usario responsavel pelo cadastro deve ser um usuario administrador 

## Aluguel de carro 

**RF**
- Deve ser possivel cadastrar um aluguel

**RNF**
- O aluguel deve ter duração mínima de 24 horas
- Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario
- Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro




