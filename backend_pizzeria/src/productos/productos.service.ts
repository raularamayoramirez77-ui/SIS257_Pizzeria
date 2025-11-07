import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { ProductoIngrediente } from 'src/producto-ingredientes/entities/producto-ingrediente.entity';
import { Ingrediente } from 'src/ingredientes/entities/ingrediente.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
    @InjectRepository(ProductoIngrediente)
    private productoIngredientesRepository: Repository<ProductoIngrediente>,
    @InjectRepository(Ingrediente)
    private ingredientesRepository: Repository<Ingrediente>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    // Validar si la categoría requiere personalización
    const categoria = await this.categoriasRepository.findOne({
      where: { id: createProductoDto.idCategoria }
    });

    if (!categoria) {
      throw new NotFoundException('La categoría no existe');
    }

    // Si la categoría requiere personalización, el tamaño es obligatorio
    if (categoria.requierePersonalizacion && !createProductoDto.idTamaño) {
      throw new BadRequestException('Esta categoría requiere que selecciones un tamaño');
    }

    const existe = await this.productosRepository.findOneBy({
      nombre: createProductoDto.nombre.trim(),
      idCategoria: createProductoDto.idCategoria,
    });

    if (existe) throw new ConflictException('El producto ya existe');

    const producto = new Producto();
    producto.idCategoria = createProductoDto.idCategoria;
    if (createProductoDto.idTamaño) {
      producto.idTamaño = createProductoDto.idTamaño;
    }
    producto.nombre = createProductoDto.nombre.trim();
    producto.descripcion = (createProductoDto.descripcion ?? '').trim();
    // El precio base lo establece el usuario (ej: 40 Bs)
    producto.precioBase = Number(createProductoDto.precio);
    // El precio final será: precioBase + costo ingredientes
    producto.precio = Number(createProductoDto.precio); // Por ahora, sin ingredientes
    producto.imagenUrl = (createProductoDto.imagenUrl ?? '').trim();
    producto.disponible = createProductoDto.disponible ?? true;
    producto.destacado = createProductoDto.destacado ?? false;
    
    const productoGuardado = await this.productosRepository.save(producto);
    
    // El precio se actualizará cuando se agreguen ingredientes
    // (precio final = precio base + costo ingredientes)
    return productoGuardado;
  }

  async findAll(): Promise<Producto[]> {
    return this.productosRepository.find({ 
      relations: ['categoria', 'tamaño', 'ingredientes', 'ingredientes.ingrediente'],
      order: { nombre: 'ASC' } 
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({
      where: { id },
      relations: ['categoria', 'tamaño', 'ingredientes', 'ingredientes.ingrediente'],
    });
    if (!producto) throw new NotFoundException('El producto no existe');
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    
    // Si se actualiza el precio, actualizar precioBase y recalcular precio final
    if (updateProductoDto.precio !== undefined) {
      producto.precioBase = Number(updateProductoDto.precio);
      // No actualizar precio aquí, se recalculará automáticamente con ingredientes
    }
    
    const productoUpdate = Object.assign(producto, updateProductoDto);
    const resultado = await this.productosRepository.save(productoUpdate);
    
    // Recalcular precio final (base + ingredientes)
    return this.recalcularPrecio(resultado.id);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productosRepository.softRemove(producto);
  }

  /**
   * Calcula el precio de un producto basado en sus ingredientes
   * Suma: (ingrediente.precioPorUnidad * productoIngrediente.cantidad)
   */
  async calcularPrecioProducto(idProducto: number): Promise<number> {
    const productoIngredientes = await this.productoIngredientesRepository.find({
      where: { idProducto },
      relations: ['ingrediente'],
    });

    if (productoIngredientes.length === 0) {
      // Si no tiene ingredientes, el precio es 0
      return 0;
    }

    let precioTotal = 0;

    for (const prodIng of productoIngredientes) {
      const ingrediente = prodIng.ingrediente;
      
      if (!ingrediente.precioPorUnidad) {
        throw new BadRequestException(
          `El ingrediente "${ingrediente.nombre}" no tiene precio por unidad definido. ` +
          `Por favor, establece un precio antes de calcular el precio del producto.`
        );
      }

      // Sumar: precio del ingrediente * cantidad usada en el producto
      // Convertir a números para evitar concatenación de strings
      const precioIngrediente = Number(ingrediente.precioPorUnidad) || 0;
      const cantidadIngrediente = Number(prodIng.cantidad) || 0;
      precioTotal += precioIngrediente * cantidadIngrediente;
    }

    return Number(precioTotal);
  }

  /**
   * Recalcula y actualiza el precio de un producto
   * Precio Final = Precio Base (manual) + Costo Ingredientes (automático)
   */
  async recalcularPrecio(idProducto: number): Promise<Producto> {
    const producto = await this.findOne(idProducto);
    const costoIngredientes = await this.calcularPrecioProducto(idProducto);
    
    // Convertir a números para asegurar la suma correcta
    const precioBase = Number(producto.precioBase) || 0;
    const costoIng = Number(costoIngredientes) || 0;
    
    // Precio final = precio base (ej: 40) + costo ingredientes (ej: 6) = 46
    producto.precio = precioBase + costoIng;
    await this.productosRepository.save(producto);
    
    return this.findOne(idProducto);
  }
}
