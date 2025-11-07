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

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 100, unique: true, nullable: false })
  nombre: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('varchar', { length: 255, nullable: true })
  imagenUrl: string;

  @Column('boolean', { default: true })
  activo: boolean;

  @Column('integer', { default: 0 })
  orden: number;

  @Column('boolean', { default: false, name: 'requiere_personalizacion' })
  requierePersonalizacion: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
