# 🍕 Proyecto Sistema de Pizzería "El Maná"

Este proyecto corresponde a un sistema de gestión para una pizzería desarrollado para administrar de manera eficiente las ventas, productos, clientes, empleados y control de inventario. La aplicación está diseñada para facilitar la organización y automatización de los procesos de venta, mejorando la experiencia tanto para el personal como para los clientes.

## 🚀 Funcionalidades principales

- **Gestión de productos**: Registro, edición y eliminación de pizzas y otros productos, organizados por categorías.
- **Gestión de clientes**: Administración de los datos de los clientes, con historial de compras.
- **Control de ventas**: Sistema automatizado de registro de ventas con detalles de productos vendidos.
- **Gestión de empleados**: Administración del personal que trabaja en la pizzería.
- **Sistema de usuarios**: Control de acceso al sistema para empleados autorizados.
- **Control de inventario**: Registro del stock disponible de cada producto.
- **Categorización de productos**: Organización de productos por categorías para mejor gestión.

## 📋 Entidades del Sistema

### 1️⃣ Categoría

Esta entidad almacena las categorías de productos disponibles en la pizzería.

**Campos:**
- `id`: Identificador único.
- `descripcion`: Descripción de la categoría (ej. Pizzas Clásicas, Pizzas Especiales, Bebidas).

**Fechas de control:**
- `fecha_creacion`
- `fecha_modificacion`
- `fecha_eliminacion`

### 2️⃣ Producto

Registro de todos los productos disponibles en la pizzería.

**Campos:**
- `id`: Identificador único.
- `idCategoria`: Identificador de la categoría a la que pertenece.
- `nombre`: Nombre del producto (ej. Pizza Margarita, Pizza Hawaiana).
- `precioVenta`: Precio de venta al público.
- `stock`: Cantidad disponible en inventario.

**Fechas de control:**
- `fecha_creacion`
- `fecha_modificacion`
- `fecha_eliminacion`

### 3️⃣ Cliente

Esta entidad gestiona la información de los clientes que compran en la pizzería.

**Campos:**
- `id`: Identificador único.
- `cedulaIdentidad`: Número de cédula de identidad del cliente.
- `nombres`: Nombres del cliente.
- `primerApellido`: Primer apellido del cliente.
- `segundoApellido`: Segundo apellido del cliente.
- `direccion`: Dirección de entrega.
- `celular`: Número de contacto.
- `correoElectronico`: Correo electrónico del cliente.

**Fechas de control:**
- `fecha_creacion`
- `fecha_modificacion`
- `fecha_eliminacion`

### 4️⃣ Empleado

Almacena la información del personal que trabaja en la pizzería.

**Campos:**
- `id`: Identificador único.
- `nombres`: Nombres del empleado.
- `primerApellido`: Primer apellido del empleado.
- `segundoApellido`: Segundo apellido del empleado.
- `direccion`: Dirección del empleado.
- `celular`: Número de contacto.
- `cargo`: Puesto que ocupa en la pizzería (ej. Cajero, Cocinero, Repartidor).

**Fechas de control:**
- `fecha_creacion`
- `fecha_modificacion`
- `fecha_eliminacion`

### 5️⃣ Usuario

Entidad para gestionar los usuarios del sistema con acceso al panel administrativo.

**Campos:**
- `id`: Identificador único.
- `idEmpleado`: Identificador del empleado asociado.
- `usuario`: Nombre de usuario para acceso al sistema.
- `clave`: Contraseña encriptada.

**Fechas de control:**
- `fecha_creacion`
- `fecha_modificacion`
- `fecha_eliminacion`

### 6️⃣ Venta

Registro de las transacciones de venta realizadas en la pizzería.

**Campos:**
- `id`: Identificador único.
- `idCliente`: Identificador del cliente que realizó la compra.
- `idUsuario`: Identificador del usuario que registró la venta.
- `documentoCliente`: Número de documento del cliente.
- `montoPago`: Monto pagado por el cliente.
- `montoCambio`: Cambio devuelto al cliente.
- `montoTotal`: Total de la venta.

**Fechas de control:**
- `fecha_creacion`
- `fecha_modificacion`
- `fecha_eliminacion`

### 7️⃣ VentaDetalle

Tabla intermedia que almacena el detalle de los productos vendidos en cada transacción.

**Campos:**
- `id`: Identificador único.
- `idVenta`: Identificador de la venta asociada.
- `idProducto`: Identificador del producto vendido.
- `cantidad`: Cantidad de productos vendidos.
- `precioUnitario`: Precio unitario del producto al momento de la venta.
- `subtotal`: Total del producto (cantidad × precioUnitario).

**Fechas de control:**
- `fecha_creacion`
- `fecha_modificacion`
- `fecha_eliminacion`

## 🔗 Relaciones entre Entidades

```
Categoria (1) ────< (N) Producto
Empleado (1) ──── (1) Usuario
Cliente (1) ────< (N) Venta
Usuario (1) ────< (N) Venta
Venta (1) ────< (N) VentaDetalle
Producto (1) ────< (N) VentaDetalle
```

## 💻 Tecnologías utilizadas

### Base de Datos
- **PostgreSQL**: Sistema de gestión de base de datos relacional que almacena y organiza la información de la pizzería.
- **pgAdmin**: Herramienta gráfica para administrar y visualizar la base de datos PostgreSQL.

### Backend
- **Node.js**: Entorno de ejecución de JavaScript utilizado como base para el backend.
- **NestJS**: Framework moderno y escalable basado en Node.js que utiliza TypeScript para la lógica del servidor.
- **TypeORM**: ORM (Object-Relational Mapping) utilizado para la interacción con la base de datos.
- **JWT**: Sistema de autenticación basado en tokens para el control de acceso de usuarios.

### Frontend
- **Vue.js 3**: Framework progresivo para crear interfaces de usuario dinámicas e interactivas.
- **TypeScript**: Superset de JavaScript que añade tipado estático para mayor robustez.
- **Vue Router**: Gestión de rutas para navegación SPA (Single Page Application).
- **Axios**: Cliente HTTP para realizar peticiones al backend.

### Herramientas de Desarrollo
- **Postman**: Herramienta para probar y documentar las APIs del backend.
- **Swagger**: Documentación automática de APIs para explorar y probar endpoints.
- **Git**: Control de versiones del código fuente.
- **VS Code**: Editor de código utilizado para el desarrollo.

## 📂 Estructura del Proyecto

```
SIS257_Pizzeria/
├── backend_pizzeria/       # Backend desarrollado con NestJS
│   ├── src/
│   │   ├── categoria/      # Módulo de categorías
│   │   ├── producto/       # Módulo de productos
│   │   ├── cliente/        # Módulo de clientes
│   │   ├── empleado/       # Módulo de empleados
│   │   ├── usuario/        # Módulo de usuarios
│   │   ├── venta/          # Módulo de ventas
│   │   └── venta-detalle/  # Módulo de detalles de venta
│   └── ...
└── frontend_pizzeria/      # Frontend desarrollado con Vue 3
    ├── src/
    │   ├── components/     # Componentes reutilizables
    │   ├── views/          # Vistas principales
    │   ├── router/         # Configuración de rutas
    │   ├── services/       # Servicios para consumir APIs
    │   └── models/         # Interfaces TypeScript
    └── ...
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

### Backend

```bash
# Navegar a la carpeta del backend
cd backend_pizzeria

# Instalar dependencias
npm install

# Configurar variables de entorno (.env)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=pizzeria_db

# Ejecutar migraciones (si aplica)
npm run migration:run

# Iniciar el servidor
npm run start:dev
```

### Frontend

```bash
# Navegar a la carpeta del frontend
cd frontend_pizzeria

# Instalar dependencias
npm install

# Iniciar la aplicación
npm run dev
```

## 🌐 Endpoints Principales

- **Categorías**: `/api/v1/categorias`
- **Productos**: `/api/v1/productos`
- **Clientes**: `/api/v1/clientes`
- **Empleados**: `/api/v1/empleados`
- **Usuarios**: `/api/v1/usuarios`
- **Ventas**: `/api/v1/ventas`
- **Detalles de Venta**: `/api/v1/venta-detalle`

## 📝 Documentación API

Una vez iniciado el backend, la documentación Swagger está disponible en:

```
http://localhost:3000/api/docs
```

## 👥 Contribuidores

- **Raúl Aramayo Ramírez** - [@raularamayoramirez77-ui](https://github.com/raularamayoramirez77-ui)
- **Erika Daniela Mendoza Daza** - [@erikadanielamendozadaza-sketch](https://github.com/erikadanielamendozadaza-sketch)
- **Daniel Huata** - [@danielhuata2-ship-it](https://github.com/danielhuata2-ship-it)

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para la materia SIS257.

## 🎯 Objetivos del Proyecto

1. Implementar un sistema completo de gestión de ventas.
2. Aplicar arquitectura de software moderna (Frontend/Backend separados).
3. Utilizar patrones de diseño y buenas prácticas de programación.
4. Gestionar base de datos relacionales con TypeORM.
5. Implementar autenticación y autorización segura.
6. Crear interfaces de usuario intuitivas y responsivas.

---

**Desarrollado con ❤️ para la Pizzería "El Maná"** 🍕
