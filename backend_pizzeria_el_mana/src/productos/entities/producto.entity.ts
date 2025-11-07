import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { DetalleVenta } from 'src/detalle-ventas/entities/detalle-venta.entity';
import { Tamaño } from 'src/tamaños/entities/tamaño.entity';
import { ProductoIngrediente } from 'src/producto-ingredientes/entities/producto-ingrediente.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_categoria', nullable: false })
  idCategoria: number;

  @Column('integer', { name: 'id_tamaño', nullable: true })
  idTamaño: number;

  @Column('varchar', { length: 150, nullable: false })
  nombre: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false, name: 'precio_base', default: 0 })
  precioBase: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  precio: number;

  @Column('varchar', { length: 255, nullable: true })
  imagenUrl: string;

  @Column('boolean', { default: true })
  disponible: boolean;

  @Column('boolean', { default: false })
  destacado: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @ManyToOne(() => Tamaño, (tamaño) => tamaño.productos)
  @JoinColumn({ name: 'id_tamaño', referencedColumnName: 'id' })
  tamaño: Tamaño;

  @OneToMany(() => DetalleVenta, (detalle) => detalle.producto)
  detalles: DetalleVenta[];

  @OneToMany(() => ProductoIngrediente, (pi) => pi.producto)
  ingredientes: ProductoIngrediente[];
}
