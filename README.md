Descripción del negocio SIS257_Pizzeria El Mana
Bienvenido/a la Pizzeria, una tienda especializada en las variedades de pizzas horneadas a la perfección con los ingredientes más frescos y de la más alta calidad. Este sistema está diseñado para vender eficientemente al cliente.

¿Qué ofrece La Pizzeria?
Variedades de pizzas 

Pizzas Personalizado al cliente 

Modelo de Base de Datos
El sistema esta compuesto por las siguientes tablas principales:
Modelo de Base de Datos
Entidades Iniciales


1. Menu

id

nombre

descripcion

precioVenta

stock

usuarioRegistro

fechaRegistro

2. Cliente

id

cedulaIdentidad

nombres

apellidos

direccion

celular

correoElectronico

usuarioRegistro

fechaRegistro

3. Empleado

id

nombres

primerApellido

segundoApellido

direccion

celular

cargo

usuarioRegistro

fechaRegistro

4. Usuario

id

idEmpleado

usuario

clave

usuarioRegistro

fechaRegistro

5. Venta

id

idCliente

idUsuario

documentoCliente

montoPago

montoCambio

montoTotal

usuarioRegistro

fechaRegistro

6. VentaDetalle

id

idVenta

idProducto

cantidad

precioUnitario

subtotal

usuarioRegistro

fechaRegistro
