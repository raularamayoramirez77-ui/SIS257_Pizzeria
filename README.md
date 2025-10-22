Descripción del negocio SIS257_Pizzeria El Mana
Bienvenido/a la Pizzeria, una tienda especializada en las variedades de pizzas horneadas a la perfección con los ingredientes más frescos y de la más alta calidad. Este sistema está diseñado para vender eficientemente al cliente.

¿Qué ofrece La Pizzeria?
Variedades de pizzas 

Pizzas Personalizado al cliente 

Modelo de Base de Datos
El sistema esta compuesto por las siguientes tablas principales:
Modelo de Base de Datos
Entidades Iniciales

1. Categoría

id

descripcion

2. Producto

id

idCategoria

nombre

precioVenta

stock

3. Cliente

id

cedulaIdentidad

nombres

apellidos

direccion

celular

correoElectronico

4. Empleado

id

nombres

primerApellido

segundoApellido

direccion

celular

cargo

5. Usuario

id

idEmpleado

usuario

clave

6. Venta

id

idCliente

idUsuario

documentoCliente

montoPago

montoCambio

montoTotal

7. VentaDetalle

id

idVenta

idProducto

cantidad

precioUnitario

subtotal




Categoria (1) ────< (N) Producto

Empleado (1) ──── (1) Usuario

Cliente (1) ────< (N) Venta

Usuario (1) ────< (N) Venta

Venta (1) ────< (N) VentaDetalle

Producto (1) ────< (N) VentaDetalle

