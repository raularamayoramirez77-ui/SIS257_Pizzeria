import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 20 })
  primerApellido: string;

  @Column('varchar', { length: 20 })
  segundoApellido: string;

  @Column('varchar', { length: 100 })
  direccion: string;

  @Column('varchar', { length: 15 })
  celular: string;

  @Column('varchar', { length: 50 })
  cargo: string;

  @Column('varchar', { length: 50 })
  usuarioRegistro: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @Column({ type: 'smallint', default: 1 })
  estado: number;

  @OneToOne(() => Usuario, (usuario) => usuario.idEmpleado)
  usuario: Usuario;
}
