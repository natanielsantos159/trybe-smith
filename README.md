
# Trybe Smith
## Objetivo
Desenvolver um CRUD (Create, Read, Update e Delete) de itens medievais, no formato de uma API, utilizando Typescript, por meio endpoints que irão ler e escrever em um banco de dados, utilizando o MySQL.

## Habilidades

Neste projeto, foi praticado as seguintes habilidades:
- Declarar variáveis e funções com tipagens _Typescript_;

- Construir uma _API Node Express_ utilizando o _Typescript_.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar configurar as seguintes variáveis de ambiente no seu .env

`MYSQL_HOST`
`MYSQL_USER`
`MYSQL_PASSWORD`

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:natanielsantos159/trybe-smith.git
```

Entre no diretório do projeto

```bash
  cd trybe-smith
```

Instale as dependências

```bash
  npm install
```

Inicie o projeto

```bash
  npm run start
```


## Documentação da API

### Cadastra um usuário

```http
  POST /user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. O nome de usuário |
| `classe` | `string` | **Obrigatório**. A classe do usuário |
| `password` | `string` | **Obrigatório**. A senha do usuário, no mínimo 8 caracteres|
| `level` | `number` | **Obrigatório** O nível do usuário|


### Faz o login do usuário

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. O email do usuário  |
| `password` | `string` | **Obrigatório**. A senha do usuário |

Um token JWT deve ser gerado e retornado caso haja sucesso no login.

### Cadastra um produto

```http
  POST /products
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O nome do produto  |
| `amount` | `number` | **Obrigatório**. Quantidade de exemplares |

###  Obter todos os produtos

```http
  GET /products
```
- O cabeçalho da requisição deve conter um token JWT válido
- Esse endpoint retornará todos os produtos na seguinte estrutura:

```json
   [
      {
        "id": 1,
        "name": "Poção de cura",
        "amount": "20 gold",
        "orderId": null
      },
      {
        "id": 2,
        "name": "Escudo do Herói",
        "amount": "100 diamond",
        "orderId": 1
      }
    ]
```

### Cadastra um pedido

```http
  POST /orders
```
- O cabeçalho da requisição deve conter um token JWT válido

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `products`      | `array` | **Obrigatório**. Um array com IDs de produtos  |

  - O retorno em caso de sucesso:
    ```json
      {
        "order": {
          "userId": 1,
          "products": [1],
        }
      }
    ```

###  Obter pedido pelo id

```http
  GET /orders/:id
```
- O cabeçalho da requisição deve conter um token JWT válido
- Retorna um post com o `id` especificado. O retorno terá o seguinte formato:

  ```json
      {
        "id": 1,
        "userId": 2,
        "products": [1, 2]
      }
    ```

---
## Feedback

Se você tiver algum feedback, por favor entre em contato por meio de nathan.santos159@hotmail.com
