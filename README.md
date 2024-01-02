
## Descripcion

Api bff de prueba sobre nestjs.

## requisitos:
- node>=v20.10 && npm >=10.2.3

## Instalacion

- crear el archivo .env en la raiz del proyecto o con una copia del env.example
- setear en el .env la variable: MELI_BACKEND_API_BASE_URL. para el caso de uso debe ser:
MELI_BACKEND_API_BASE_URL=https://api.mercadolibre.com/

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Probar la API:
ejemplos con cURL que pueden ser importados a POSTMAN

búsqueda:

```bash
curl --location --request GET 'http://localhost:3001/api/items?search=audifonos&limit=4'
```

detalle de un producto:

```bash
curl --location --request GET 'http://localhost:3001/api/items/MLA817704273'
```



## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Todo
- healtcheckers livez and readinness
- documentar API https://docs.nestjs.com/openapi/introduction
