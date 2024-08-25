# Project Title

A brief description of what this project does and who it's for

# Don Pietro - Backend

El backend de Don Pietro es un proyecto basado en Node.js y Express, diseñado para manejar las operaciones del lado del servidor de la aplicación. Proporciona una API RESTful que permite a comunicación entre el frontend y el backend, asegurando una integración fluida de datos.

## Integrantes

- [Anabela Guillermo](https://github.com/AnabelaGuillermo)
- [Benjamin Gimenez](https://github.com/BenjaminGimenez)
- [Ignacio Sal Paz](https://github.com/nachosalpaz)
- [Santiago Puertas](https://github.com/SantiagoPuertas4)

## Instalacion del proyecto

### Requisitos previos

1. **Node.js:**

- Versión mínima: v16.13.0 o superior.
- Puedes descargar Node.js desde nodejs.org.

2. **npm (Node Package Manager):**

- Se incluye con Node.js. Verifica que tienes la versión mínima v8.1.0 o superior.
- Puedes comprobar tu versión instalada con:

  npm -v

3. **Postman:**

- Herramienta para probar y documentar las API. Puedes descargar Postman desde postman.com.

4.  **MongoDB:**

- Versión mínima: v4.4 o superior.
- Necesitarás tener un servidor MongoDB en funcionamiento, ya sea localmente o a través de un servicio en la nube como MongoDB Atlas.

5. **Render Account:**

- Una cuenta en Render para desplegar el backend. Puedes registrarte en Render.com.

6. **Git:**

- Para clonar el repositorio y manejar el control de versiones. Puedes descargar Git desde git-scm.com.
- Verifica que tienes la versión mínima v2.28.0 o superior.

### Pasos para la instalacion

- Clonar el repositorio:

  https://github.com/AnabelaGuillermo/backendDonPietro.git

- Navegar al directorio del proyecto.

- Instalar las dependencias:

  npm install

- Crear un archivo .env en la raíz del proyecto con las siguientes variables:

PORT=3000

DB_URI=your_database_uri

JWT_SECRET=your_secret_key

## Uso

### Ejecucion en Desarrollo

- Para iniciar el servidor en modo de desarrollo:

  npm run dev

- La aplicación estará disponible en http://localhost:3000.

## Arquitectura del Proyecto

- **Node.js:** Entorno de ejecución para JavaScript en el servidor.
- **Express:** Framework web para construir la API.
- **JWT:** Manejo de autenticación y autorización.
- **Mongoose:** Para la modelación de datos.
- **Render:** Plataforma de despliegue.
- **Postman:** Herramienta para probar la API.

## Documentacion de API

La tabla a continuación detalla los endpoints de cada servicio disponible:

Autenticacion:
Ruta principal: `/api/v1/auth`

| Método | Endpoint | Protegido | Debe ser Admin | Descripcion                  | Body                                                                      |
| ------ | -------- | --------- | -------------- | ---------------------------- | ------------------------------------------------------------------------- |
| POST   | `/login` | ❌        | ❌             | Inicia sesión con un usuario | `{user: {id: string, fullname: string, email: string, isAdmin: boolean}}` |

Configuracion:
Ruta principal: `/api/v1/config`

| Método | Endpoint | Protegido | Debe ser Admin | Descripcion                              | Body                                |
| ------ | -------- | --------- | -------------- | ---------------------------------------- | ----------------------------------- |
| GET    | `/`      | ❌        | ❌             | Obtiene la configuracion del sitio       | `{config: {cantidadMesas: number}}` |
| PUT    | `/`      | ✅        | ✅             | Guarda o crea la configuracion del sitio | `{config: {cantidadMesas: number}`  |

Historial:
Ruta principal: `/api/v1/orderhistorial`

| Método | Endpoint | Protegido | Debe ser Admin | Descripcion                                      | Body                                                                                                                                                                                   |
| ------ | -------- | --------- | -------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/:id`   | ❌        | ✅             | Obtiene el historial de un usuario en particular | `{historial: {_id: string, userID: string, userName: string, products: array, comments: string, status: string, paymentMethod: string, total: number, createdAt: Date, table: number}` |

Ordenes de compra:
Ruta principal: `/api/v1/order`

| Método | Endpoint               | Protegido | Debe ser Admin | Descripcion                                                                                  | Body                                                                                                                                                                 |
| ------ | ---------------------- | --------- | -------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/waiting`             | ✅        | ✅             | Obtiene las ordenes de compra en estado "WaitingForPayment"                                  | `{historial: {_id: string, userName: string, products: array, comments: string, status: string, paymentMethod: "WaitingForPayment", total: number, createdAt: Date}` |
| GET    | `/preparingorder`      | ✅        | ✅             | Obtiene las ordenes de compra en estado "PreparingOrder"                                     | `{historial: {_id: string, userName: string, products: array, comments: string, status: string, paymentMethod: "PreparingOrder", total: number, createdAt: Date}`    |
| GET    | `/pendingdelivery`     | ✅        | ✅             | Obtiene las ordenes de compra en estado "PendingDelivery"                                    | `{historial: {_id: string, userName: string, products: array, comments: string, status: string, paymentMethod: "PendingDelivery", total: number, createdAt: Date}`   |
| GET    | `/preparingordertv`    | ✅        | ✅             | Obtiene las ordenes de compra en estado "PreparingOrder" para mostrar en TVPanel             | `{historial: {_id: string, userID: string}`                                                                                                                          |
| GET    | `/pendingdeliverytv`   | ✅        | ✅             | Obtiene las ordenes de compra en estado "PendingDelivery" para mostrar en TVPanel            | `{historial: {_id: string, userID: string}`                                                                                                                          |
| DELETE | `/:id`                 | ✅        | ✅             | Elimina una orden de compra por su id (borrado fisico)                                       | -                                                                                                                                                                    |
| POST   | `/hand`                | ✅        | ❌             | Crea una orden de compra                                                                     | -                                                                                                                                                                    |
| PATCH  | `/:id/waiting`         | ✅        | ✅             | Cambia el estado de una orden de "WaitingForPayment" a "PreparingOrder"                      | -                                                                                                                                                                    |
| PATCH  | `/:id/preparingorder`  | ✅        | ✅             | Cambia el estado de una orden de "PreparingOrder" a "PendingDelivery"                        | -                                                                                                                                                                    |
| PATCH  | `/:id/pendingdelivery` | ✅        | ✅             | Cambia el estado de una orden de "PendingDelivery" a "Completed" y la mueve a orderHistorial | -                                                                                                                                                                    |

Productos:
Ruta principal: `/api/v1/products`

| Método | Endpoint | Protegido | Debe ser Admin | Controla Nombre | Descripcion                         | Body |
| ------ | -------- | --------- | -------------- | --------------- | ----------------------------------- | ---- |
| GET    | `/`      | ✅        | ❌             | ❌              | Obtiene todos los productos         | -    |
| POST   | `/`      | ✅        | ✅             | ✅              | Carga un producto                   | -    |
| PUT    | `/:id`   | ✅        | ✅             | ❌              | Edita un producto                   | -    |
| DELETE | `/:id`   | ✅        | ✅             | ❌              | Elimina un producto(borrado logico) | -    |

Usuarios:
Ruta principal: `/api/v1/users`

| Método | Endpoint            | Protegido | Debe ser Admin | Ya registrado | Descripcion                        | Body |
| ------ | ------------------- | --------- | -------------- | ------------- | ---------------------------------- | ---- |
| GET    | `/`                 | ✅        | ✅             | ❌            | Obtiene todos los de usuarios      | -    |
| POST   | `/`                 | ❌        | ❌             | ✅            | Registra un usuario                | -    |
| PUT    | `/:id/toggle-admin` | ✅        | ✅             | ❌            | Cambia isAdmin a True              | -    |
| DELETE | `/:id`              | ✅        | ✅             | ❌            | Elimina un usuario(borrado logico) | -    |

## Dependencias Utilizadas

"bcryptjs": "^2.4.3"

"cors": "^2.8.5"

"esbuild": "^0.23.1",

"express": "^4.19.2"

"http-status-codes": "^2.3.0"

"joi": "^17.13.3"

"jsonwebtoken": "^9.0.2"

"mongoose": "^8.5.2"

"morgan": "^1.10.0"

## Contribución

Para contribuir al proyecto:

- Contactarse con algun autor.
- Crear un fork del repositorio.
- Crear una nueva rama (git checkout -b feature/nueva-funcionalidad).
- Realizar los cambios necesarios y commit (git commit -m 'Añadir - nueva funcionalidad').
- Hacer push a la rama (git push origin feature/nueva-funcionalidad).
- Crear un Pull Request.

## Agradecimientos

Nosotros, los 4 integrantes del equipo Don Pietro, queremos expresar nuestro más sincero agradecimiento por el apoyo incondicional y la guía que nos brindaron nuestros mentores durante el desarrollo de este proyecto. Su conocimiento, paciencia y dedicación fueron fundamentales para que pudiéramos superar los desafíos y alcanzar nuestros objetivos. Gracias por estar siempre ahí para nosotros y por ayudarnos a crecer tanto profesional como personalmente.

Eze y Gabi ❤
