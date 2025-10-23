import * as productoEntity from 'src/productos/entities/producto.entity';
import { Venta } from 'src/venta/entities/venta.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('venta_detalles')
export class VentaDetalle {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('int', { name: 'id_venta' })
  idVenta: number;

  @Column('int', { name: 'id_producto' })
  idProducto: number;

  @Column('int')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'precio_unitario' })
  precioUnitario: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  total: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

// Relación con Venta
  //@ManyToOne(() => Venta, venta => venta.detalles)
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;

  // Relación con Producto
  @ManyToOne(() => productoEntity.Producto)
  @JoinColumn({ name: 'id_producto' })
  producto: productoEntity.Producto;
}