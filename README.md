# 🛒 E-commerce Backend - Proyecto Final Backend II

Sistema completo de backend para e-commerce con autenticación JWT, gestión de productos, carritos y sistema de compras con generación de tickets.

---
## 🛠Dependencias 

- **Node.js** v18+
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **Bcrypt** - Encriptación de contraseñas
- **Passport.js** - Estrategias de autenticación
- **Nodemailer** - Envío de emails
- **Cookie-parser** - Manejo de cookies firmadas

---
---

## 🔐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `8080` |
| `NODE_ENV` | Entorno de ejecución 
| `MONGO_URL` | URL de conexión a MongoDB 
| `JWT_SECRET` | Clave para firmar tokens JWT 
| `JWT_EXPIRES_IN` | Tiempo de expiración del JWT | `24h` |
| `PASSWORD_RESET_SECRET` | clave para tokens de reset
| `PASSWORD_RESET_EXPIRES_IN` | Expiración del token de reset | `1h` |
| `EMAIL_SERVICE` | Servicio de email | `gmail` |
| `EMAIL_USER` | Email para envío | `tu_email@gmail.com` |
| `EMAIL_PASSWORD` | Contraseña de aplicación | `xxxx xxxx xxxx xxxx` |
| `EMAIL_PORT` | Puerto SMTP | `587` |
| `BCRYPT_SALT_ROUNDS` | Rondas de encriptación | `10` |
| `COOKIE_SECRET` | Clave para firmar cookies 

---

## 🏗 Arquitectura

```
src/
├── config/          # Configuraciones (env, passport)
├── controllers/     # Controladores (lógica HTTP)
├── dao/            # Data Access Objects
├── db/             # Conexión a base de datos
├── dto/            # Data Transfer Objects
├── middlewares/    # Middlewares (auth, validación)
├── models/         # Modelos de Mongoose
├── repository/     # Patrón Repository
├── routes/         # Rutas de la API
├── services/       # Lógica de negocio
├── utils/          # Utilidades (crypto, jwt)
├── app.js          # Configuración de Express
└── server.js       # Punto de entrada
```
---

## 📡 Endpoints
---

## Autenticación y Sesiones

### 📝 Registro de usuario

**Endpoint:** `POST /api/sessions/register`

**Permisos:** 🌐 Público

**Body:**
```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@test.com",
  "age": 25,
  "password": "123456",
  "role": "user"
}
```

**Respuesta exitosa (201):**
```json
{
  "status": "success",
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@test.com",
    "age": 25,
    "role": "user",
    "createdAt": "2026-02-07T10:00:00.000Z",
    "updatedAt": "2026-02-07T10:00:00.000Z"
  }
}
```

**Nota:** 
- El campo `role` es opcional (default: `"user"`)
- Para crear un admin: `"role": "admin"`
- Se envía un email de bienvenida
- Se crea automáticamente un carrito vacío

---

### 🔑 Login

**Endpoint:** `POST /api/sessions/login`

**Permisos:** 🌐 Público

**Body:**
```json
{
  "email": "juan@test.com",
  "password": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Login exitoso",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@test.com",
    "age": 25,
    "role": "user",
    "createdAt": "2026-02-07T10:00:00.000Z",
    "updatedAt": "2026-02-07T10:00:00.000Z"
  }
}
```

**Nota:** Se guarda un token JWT en una cookie firmada llamada `token`

---

### 👤 Usuario actual

**Endpoint:** `GET /api/sessions/current`

**Permisos:** 🔒 Requiere autenticación

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@test.com",
    "age": 25,
    "role": "user",
    "createdAt": "2026-02-07T10:00:00.000Z",
    "updatedAt": "2026-02-07T10:00:00.000Z"
  }
}
```

---

### 🚪 Logout

**Endpoint:** `POST /api/sessions/logout`

**Permisos:** 🌐 Público

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Logout exitoso"
}
```

---

### 🔄 Solicitar recuperación de contraseña

**Endpoint:** `POST /api/sessions/forgot-password`

**Permisos:** 🌐 Público

**Body:**
```json
{
  "email": "juan@test.com"
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Se ha enviado un email con instrucciones para restablecer tu contraseña"
}
```

**Nota:** Se envía un email con un token que expira en 1 hora

---

### 🔑 Restablecer contraseña

**Endpoint:** `PUT /api/sessions/reset-password/:token`

**Permisos:** 🌐 Público (con token válido)

**Body:**
```json
{
  "newPassword": "nuevaContraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Contraseña actualizada exitosamente"
}
```

**Errores posibles:**
- Token inválido o expirado (400)
- Nueva contraseña igual a la anterior (400)
- Contraseña muy corta (400)

---

## Productos

### 📦 Obtener todos los productos

**Endpoint:** `GET /api/products`

**Permisos:** 🌐 Público

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "products": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Laptop Gaming Pro",
      "description": "Laptop de alto rendimiento con RTX 4070",
      "price": 1800000,
      "status": true,
      "stock": 15,
      "category": "Computación",
      "thumbnail": "https://example.com/laptop.jpg",
      "createdAt": "2026-02-07T10:00:00.000Z",
      "updatedAt": "2026-02-07T10:00:00.000Z"
    }
  ]
}
```

---

### 🔍 Obtener producto por ID

**Endpoint:** `GET /api/products/:id`

**Permisos:** 🌐 Público

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "product": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Laptop Gaming Pro",
    "description": "Laptop de alto rendimiento con RTX 4070",
    "price": 1800000,
    "status": true,
    "stock": 15,
    "category": "Computación",
    "thumbnail": "https://example.com/laptop.jpg",
    "createdAt": "2026-02-07T10:00:00.000Z",
    "updatedAt": "2026-02-07T10:00:00.000Z"
  }
}
```

---

### 🏷️ Obtener productos por categoría

**Endpoint:** `GET /api/products/category/:category`

**Permisos:** 🌐 Público

**Ejemplo:** `GET /api/products/category/Computación`

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "count": 5,
  "products": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Laptop Gaming Pro",
      "category": "Computación",
      ...
    }
  ]
}
```

---

### ✅ Obtener productos disponibles (con stock)

**Endpoint:** `GET /api/products/available`

**Permisos:** 🌐 Público

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "count": 8,
  "products": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Laptop Gaming Pro",
      "stock": 15,
      "status": true,
      ...
    }
  ]
}
```

---

### ➕ Crear producto

**Endpoint:** `POST /api/products`

**Permisos:** 🔐 Solo Admin

**Body:**
```json
{
  "title": "Teclado Mecánico RGB",
  "description": "Teclado mecánico con switches Cherry MX Blue",
  "price": 80000,
  "stock": 25,
  "category": "Periféricos",
  "thumbnail": "https://example.com/teclado.jpg"
}
```

**Respuesta exitosa (201):**
```json
{
  "status": "success",
  "message": "Producto creado exitosamente",
  "product": {
    "id": "507f1f77bcf86cd799439012",
    "title": "Teclado Mecánico RGB",
    "description": "Teclado mecánico con switches Cherry MX Blue",
    "price": 80000,
    "status": true,
    "stock": 25,
    "category": "Periféricos",
    "thumbnail": "https://example.com/teclado.jpg",
    "createdAt": "2026-02-07T11:00:00.000Z",
    "updatedAt": "2026-02-07T11:00:00.000Z"
  }
}
```

---

### ✏️ Actualizar producto

**Endpoint:** `PUT /api/products/:id`

**Permisos:** 🔐 Solo Admin

**Body (campos opcionales):**
```json
{
  "price": 75000,
  "stock": 30
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Producto actualizado exitosamente",
  "product": {
    "id": "507f1f77bcf86cd799439012",
    "title": "Teclado Mecánico RGB",
    "price": 75000,
    "stock": 30,
    ...
  }
}
```

---

### 🗑️ Eliminar producto

**Endpoint:** `DELETE /api/products/:id`

**Permisos:** 🔐 Solo Admin

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Producto eliminado exitosamente"
}
```

---

## Carritos

### 🛒 Obtener carrito por ID

**Endpoint:** `GET /api/carts/:cid`

**Permisos:** 🌐 Público

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "cart": {
    "id": "507f1f77bcf86cd799439013",
    "products": [
      {
        "product": {
          "id": "507f1f77bcf86cd799439011",
          "title": "Laptop Gaming Pro",
          "price": 1800000,
          "stock": 15,
          "thumbnail": "https://example.com/laptop.jpg"
        },
        "quantity": 2,
        "price": 1800000,
        "subtotal": 3600000
      }
    ],
    "total": 3600000,
    "createdAt": "2026-02-07T10:00:00.000Z",
    "updatedAt": "2026-02-07T11:30:00.000Z"
  }
}
```

---

### 👤 Obtener carrito por usuario

**Endpoint:** `GET /api/carts/user/:uid`

**Permisos:** 🌐 Público

**Respuesta:** Igual que obtener por ID

---

### ➕ Crear carrito vacío

**Endpoint:** `POST /api/carts`

**Permisos:** 🔒 Requiere autenticación

**Body:**
```json
{
  "userId": "507f1f77bcf86cd799439014"
}
```

**Respuesta exitosa (201):**
```json
{
  "status": "success",
  "message": "Carrito creado exitosamente",
  "cart": {
    "id": "507f1f77bcf86cd799439015",
    "products": [],
    "total": 0,
    "createdAt": "2026-02-07T12:00:00.000Z",
    "updatedAt": "2026-02-07T12:00:00.000Z"
  }
}
```

---

### 🛍️ Agregar producto al carrito

**Endpoint:** `POST /api/carts/:cid/products`

**Permisos:** 🔒 Requiere autenticación

**Body:**
```json
{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Producto agregado al carrito",
  "cart": {
    "id": "507f1f77bcf86cd799439013",
    "products": [
      {
        "product": {
          "id": "507f1f77bcf86cd799439011",
          "title": "Laptop Gaming Pro",
          "price": 1800000,
          "stock": 15
        },
        "quantity": 2,
        "price": 1800000,
        "subtotal": 3600000
      }
    ],
    "total": 3600000
  }
}
```

**Nota:** Si el producto ya existe en el carrito, incrementa la cantidad

---

### ✏️ Actualizar cantidad de producto

**Endpoint:** `PUT /api/carts/:cid/products/:pid`

**Permisos:** 🔒 Requiere autenticación

**Body:**
```json
{
  "quantity": 5
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Cantidad actualizada",
  "cart": {
    "products": [
      {
        "quantity": 5,
        "subtotal": 9000000
      }
    ],
    "total": 9000000
  }
}
```

---

### 🗑️ Eliminar producto del carrito

**Endpoint:** `DELETE /api/carts/:cid/products/:pid`

**Permisos:** 🔒 Requiere autenticación

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Producto eliminado del carrito",
  "cart": {
    "products": [],
    "total": 0
  }
}
```

---

### 🧹 Vaciar carrito

**Endpoint:** `DELETE /api/carts/:cid`

**Permisos:** 🔒 Requiere autenticación

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Carrito vaciado",
  "cart": {
    "id": "507f1f77bcf86cd799439013",
    "products": [],
    "total": 0
  }
}
```

---

### 🗑️ Eliminar carrito completamente

**Endpoint:** `DELETE /api/carts/:cid/delete`

**Permisos:** 🔒 Requiere autenticación

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Carrito eliminado exitosamente"
}
```

---

## Tickets

### 🎫 Obtener todos los tickets

**Endpoint:** `GET /api/tickets`

**Permisos:** 🔐 Solo Admin

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "count": 15,
  "tickets": [
    {
      "id": "507f1f77bcf86cd799439016",
      "code": "TICKET-ABC123-XYZ789",
      "purchase_datetime": "2026-02-07T14:00:00.000Z",
      "amount": 3600000,
      "purchaser": "juan@test.com",
      "products": [
        {
          "product": {
            "id": "507f1f77bcf86cd799439011",
            "title": "Laptop Gaming Pro"
          },
          "title": "Laptop Gaming Pro",
          "quantity": 2,
          "price": 1800000,
          "subtotal": 3600000
        }
      ],
      "createdAt": "2026-02-07T14:00:00.000Z",
      "updatedAt": "2026-02-07T14:00:00.000Z"
    }
  ]
}
```

---

### 🔍 Obtener ticket por ID

**Endpoint:** `GET /api/tickets/:tid`

**Permisos:** 🔒 Requiere autenticación

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "ticket": {
    "id": "507f1f77bcf86cd799439016",
    "code": "TICKET-ABC123-XYZ789",
    "purchase_datetime": "2026-02-07T14:00:00.000Z",
    "amount": 3600000,
    "purchaser": "juan@test.com",
    "products": [
      {
        "product": {
          "id": "507f1f77bcf86cd799439011",
          "title": "Laptop Gaming Pro"
        },
        "title": "Laptop Gaming Pro",
        "quantity": 2,
        "price": 1800000,
        "subtotal": 3600000
      }
    ],
    "createdAt": "2026-02-07T14:00:00.000Z",
    "updatedAt": "2026-02-07T14:00:00.000Z"
  }
}
```

---

### 📧 Obtener tickets por email

**Endpoint:** `GET /api/tickets/purchaser/:email`

**Permisos:** 🔒 Requiere autenticación

**Ejemplo:** `GET /api/tickets/purchaser/juan@test.com`

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "count": 3,
  "tickets": [ ... ]
}
```

---

### 👤 Obtener tickets por usuario

**Endpoint:** `GET /api/tickets/user/:uid`

**Permisos:** 🔒 Requiere autenticación

**Respuesta:** Igual que por email

---

### 💳 Finalizar compra (Purchase)

**Endpoint:** `POST /api/tickets/:cid/purchase`

**Permisos:** 🔒 Requiere autenticación

**Body:**
```json
{
  "userId": "507f1f77bcf86cd799439014"
}
```

**Respuesta exitosa - Compra completa (201):**
```json
{
  "status": "success",
  "message": "Compra completada exitosamente",
  "ticket": {
    "id": "507f1f77bcf86cd799439017",
    "code": "TICKET-DEF456-UVW321",
    "purchase_datetime": "2026-02-07T15:00:00.000Z",
    "amount": 3600000,
    "purchaser": "juan@test.com",
    "products": [
      {
        "product": {
          "id": "507f1f77bcf86cd799439011",
          "title": "Laptop Gaming Pro"
        },
        "title": "Laptop Gaming Pro",
        "quantity": 2,
        "price": 1800000,
        "subtotal": 3600000
      }
    ]
  }
}
```

**Respuesta - Compra parcial (200):**
```json
{
  "status": "partial",
  "message": "Compra completada parcialmente",
  "ticket": {
    "id": "507f1f77bcf86cd799439017",
    "amount": 1800000,
    "products": [
      {
        "title": "Laptop Gaming Pro",
        "quantity": 1,
        "subtotal": 1800000
      }
    ]
  },
  "productsNotProcessed": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "title": "Teclado Mecánico RGB",
      "requestedQuantity": 5,
      "availableStock": 2,
      "reason": "Stock insuficiente"
    }
  ]
}
```

**Nota:** 
- Se verifica el stock de cada producto
- Se decrementa el stock automáticamente
- Se genera un código único
- Se envía email con el ticket al comprador
- Los productos comprados se eliminan del carrito

---

### 🗑️ Eliminar ticket

**Endpoint:** `DELETE /api/tickets/:tid`

**Permisos:** 🔐 Solo Admin

**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "message": "Ticket eliminado exitosamente"
}
```

---

## 🔐 Permisos y Roles

### Leyenda:
- 🌐 **Público:** No requiere autenticación
- 🔒 **Autenticado:** Requiere estar logueado (user o admin)
- 🔐 **Admin:** Solo usuarios con `role: "admin"`

### Tabla de permisos:

| Endpoint | Método | Permiso |
|----------|--------|---------|
| **SESIONES** |
| `/api/sessions/register` | POST | 🌐 Público |
| `/api/sessions/login` | POST | 🌐 Público |
| `/api/sessions/current` | GET | 🔒 Autenticado |
| `/api/sessions/logout` | POST | 🌐 Público |
| `/api/sessions/forgot-password` | POST | 🌐 Público |
| `/api/sessions/reset-password/:token` | PUT | 🌐 Público |
| **PRODUCTOS** |
| `/api/products` | GET | 🌐 Público |
| `/api/products/:id` | GET | 🌐 Público |
| `/api/products/category/:category` | GET | 🌐 Público |
| `/api/products/available` | GET | 🌐 Público |
| `/api/products` | POST | 🔐 Admin |
| `/api/products/:id` | PUT | 🔐 Admin |
| `/api/products/:id` | DELETE | 🔐 Admin |
| **CARRITOS** |
| `/api/carts/:cid` | GET | 🌐 Público |
| `/api/carts/user/:uid` | GET | 🌐 Público |
| `/api/carts` | POST | 🔒 Autenticado |
| `/api/carts/:cid/products` | POST | 🔒 Autenticado |
| `/api/carts/:cid/products/:pid` | PUT | 🔒 Autenticado |
| `/api/carts/:cid/products/:pid` | DELETE | 🔒 Autenticado |
| `/api/carts/:cid` | DELETE | 🔒 Autenticado |
| `/api/carts/:cid/delete` | DELETE | 🔒 Autenticado |
| **TICKETS** |
| `/api/tickets` | GET | 🔐 Admin |
| `/api/tickets/:tid` | GET | 🔒 Autenticado |
| `/api/tickets/purchaser/:email` | GET | 🔒 Autenticado |
| `/api/tickets/user/:uid` | GET | 🔒 Autenticado |
| `/api/tickets/:cid/purchase` | POST | 🔒 Autenticado |
| `/api/tickets/:tid` | DELETE | 🔐 Admin |

---

---

## 📧 Emails

El sistema envía emails automáticamente en los siguientes casos:

### 1. Email de bienvenida
**Trigger:** Al registrarse un nuevo usuario  
**Contenido:** Saludo personalizado y confirmación de registro

### 2. Email de ticket de compra
**Trigger:** Al completar una compra  
**Contenido:**
- Código de ticket
- Fecha y hora de compra
- Tabla de productos comprados
- Total pagado

### 3. Email de recuperación de contraseña
**Trigger:** Al solicitar reset de contraseña  
**Contenido:**
- Instrucciones para resetear
- Endpoint y token
- Advertencia de expiración (1 hora)

---
