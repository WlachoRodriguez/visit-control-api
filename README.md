# API Control de Visitas

API REST construida con Node.js para gestionar usuarios con autenticación.

---

## Tecnologías

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* Zod (validación)
* JWT (autenticación)

---

## Instalación

```bash
git clone https://github.com/TU-USUARIO/visit-control-api.git
cd visit-control-api
npm install
```

---

## Variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/appdb
JWT_SECRET=tu_secreto
PORT=3000
```

---

## Base de datos

```bash
npx prisma migrate dev
npx prisma generate
```

---

## Ejecutar proyecto

```bash
npm run dev
```

---


## Características

* CRUD de usuarios
* Autenticación con JWT
* Roles (ADMIN / USER)

---

## Estructura del proyecto

```bash
src/
  modules/
    auth/
    user/
  middlewares/
  validations/
  constants/
  utils/
```

---

## Seguridad

* Contraseñas hasheadas
* Variables sensibles en `.env`
* Validación de datos con Zod

---

## Autor

Wladimir Rodriguez

```
```
