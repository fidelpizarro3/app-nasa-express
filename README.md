# APP-NASA Express (Trabajo Práctico 3)

## Miembros del Equipo

- **JOAQUIN DAL DOSSO VULCANO** - (Desarrollador)
- **MATTEO ALDAY** - (PM / Scrum Master & Desarrollador)
- **FIDEL PIZARRO** - (Desarrollador)

---

## Links

- **Repositorio Frontend:** https://github.com/vulcanojoaquin/APP-NASA
- **Tablero Kanban:** `<URL_DEL_TABLERO>`
- **Deploy Backend:** `<URL_VERCEL>`
- **Deploy Frontend actualizado:** `<URL_FRONTEND_DEPLOY>`

---

## Descripción de la Aplicación

API REST desarrollada con Node.js y Express para dar soporte al frontend de APP-NASA. Reemplaza el uso de MockAPI y localStorage por una base de datos PostgreSQL real, brindando persistencia verdadera a los datos de imágenes astronómicas.

### Funcionalidades:

- CRUD completo sobre la entidad APOD
- Paginación y filtrado por título
- Validación manual de datos en POST y PUT
- Manejo de errores con códigos HTTP correctos
- CORS configurado para permitir el consumo desde el frontend

---

## Descripción de la Entidad Principal

La entidad principal es **APOD** (Astronomy Picture of the Day), que representa una imagen o fotografía astronómica publicada por la NASA.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Int | Identificador único autoincremental |
| title | String | Título de la imagen |
| date | String | Fecha de publicación (formato YYYY-MM-DD) |
| explanation | String | Descripción detallada de la imagen |
| url | String | URL de la imagen en resolución normal |
| hdurl | String? | URL de la imagen en alta resolución (opcional) |
| copyright | String? | Autor o fuente de la imagen (opcional) |
| createdAt | DateTime | Fecha de creación del registro |
| updatedAt | DateTime | Fecha de última modificación |

---

## Tecnologías Utilizadas

- **Runtime:** Node.js
- **Framework:** Express 5
- **ORM:** Prisma 7
- **Base de datos:** PostgreSQL (Neon)
- **Deploy:** Vercel

---

## Instrucciones de Instalación y Ejecución

### Prerrequisitos

- Tener instalado Node.js
- Tener instalado Git
- Tener una base de datos PostgreSQL disponible (se recomienda Neon)

### Paso a paso

**1. Clonar el repositorio:**
```bash
git clone https://github.com/fidelpizarro3/app-nasa-express
cd app-nasa-express
```

**2. Instalar las dependencias:**
```bash
npm install
```

**3. Configurar las variables de entorno** (ver sección siguiente)

**4. Ejecutar en modo desarrollo:**
```bash
npm run dev
```

**5. Ejecutar en producción:**
```bash
npm start
```

---

## Configuración de Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto basándose en `.env.example`:

```bash
cp .env.example .env
```

Completar los valores en el archivo `.env`:

```
PORT=3000
DATABASE_URL=postgresql://usuario:password@host/db?sslmode=require
FRONTEND_URL=http://localhost:5173
```

| Variable | Descripción |
|----------|-------------|
| PORT | Puerto en el que corre el servidor |
| DATABASE_URL | Cadena de conexión a PostgreSQL (se obtiene desde Neon) |
| FRONTEND_URL | URL del frontend permitida por CORS |

> El archivo `.env` no se sube al repositorio. Compartir por mensajería privada.

---

## Migraciones

Para crear las tablas en la base de datos:

```bash
npx prisma migrate dev
```

Para regenerar el cliente de Prisma:

```bash
npx prisma generate
```

---

## Seed

Para cargar los datos iniciales (26 imágenes astronómicas):

```bash
npx prisma db seed
```

El seed limpia los registros existentes e inserta 26 APODs con datos reales.

---

## Endpoints de la API

### Health Check

```
GET /api/health
```
```json
{ "status": "ok", "message": "API funcionando correctamente" }
```

### APOD

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/apod | Lista paginada de APODs |
| GET | /api/apod/:id | Obtiene un APOD por ID |
| POST | /api/apod | Crea un nuevo APOD |
| PUT | /api/apod/:id | Actualiza un APOD existente |
| DELETE | /api/apod/:id | Elimina un APOD |

### Parámetros de consulta para GET /api/apod

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| page | number | Página actual (default: 1) |
| limit | number | Registros por página (default: 10) |
| title | string | Filtro por título (búsqueda parcial) |

### Ejemplos de respuesta

**GET /api/apod?page=1&limit=2**
```json
{
  "data": [
    {
      "id": 1,
      "title": "The Tulip Nebula in Infrared",
      "date": "2023-10-18",
      "explanation": "The Tulip Nebula, or Sh2-101...",
      "url": "https://apod.nasa.gov/apod/image/2310/Tulip_Webb_960.jpg",
      "hdurl": "https://apod.nasa.gov/apod/image/2310/Tulip_Webb_960.jpg",
      "copyright": "NASA, ESA, CSA, STScI",
      "createdAt": "2026-06-03T01:13:11.000Z",
      "updatedAt": "2026-06-03T01:13:11.000Z"
    }
  ],
  "meta": {
    "total": 26,
    "page": 1,
    "limit": 2,
    "totalPages": 13
  }
}
```

**POST /api/apod — body inválido**
```json
{
  "error": "Datos inválidos",
  "details": {
    "title": "El título es requerido.",
    "date": "La fecha debe tener el formato YYYY-MM-DD."
  }
}
```

**GET /api/apod/999 — no encontrado**
```json
{ "error": "Recurso no encontrado" }
```

---

## Estructura del Proyecto

```
app-nasa-express/
├── src/
│   ├── index.js              # Punto de entrada, levanta el servidor
│   ├── app.js                # Configuración de Express, middlewares y rutas
│   ├── routes/
│   │   └── apod.routes.js    # Definición de los 5 endpoints
│   ├── controllers/
│   │   └── apod.controller.js # Manejo de requests y respuestas HTTP
│   ├── services/
│   │   └── apod.service.js   # Lógica de consultas con Prisma
│   ├── validations/
│   │   └── apod.validation.js # Validación manual del body
│   ├── prisma/
│   │   └── prismaClient.js   # Instancia única de Prisma
│   └── middlewares/
│       ├── errorHandler.js   # Manejo global de errores
│       └── notFound.js       # Respuesta 404 para rutas inexistentes
├── prisma/
│   ├── schema.prisma         # Modelo de datos
│   ├── seed.js               # Datos iniciales
│   └── migrations/           # Historial de migraciones
├── .env.example              # Plantilla de variables de entorno
└── package.json
```
