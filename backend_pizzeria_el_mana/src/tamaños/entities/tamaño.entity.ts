import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('tamaños')
export class Tamaño {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50, unique: true, nullable: false })
  nombre: string;

  @Column('varchar', { length: 50, nullable: true })
  dimension: string;

  @Column('decimal', { precision: 5, scale: 2, default: 1.0 })
  multiplicadorPrecio: number;

  @Column('boolean', { default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => Producto, (producto) => producto.tamaño)
  productos: Producto[];
}
