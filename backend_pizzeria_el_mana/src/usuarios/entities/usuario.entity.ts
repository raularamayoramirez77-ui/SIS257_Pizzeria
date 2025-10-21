import { Empleado } from 'src/empleados/entities/empleado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('int', { name: 'id_empleado' })
  idEmpleado: number;

  @Column('varchar', { length: 50, name: 'Usuario' })
  usuario: string;

  @Column('varchar', { length: 100, name: 'Clave' })
  clave: string;

  @Column('varchar', { length: 50, name: 'Usuario_registro' })
  usuarioRegistro: string;

  @Column('date')
  fechaRegistro: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @CreateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @CreateDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToOne(() => Empleado, (empleado) => empleado.usuario)
  @JoinColumn({ name: 'id_empleado', referencedColumnName: 'id' })
  empleado: Empleado;
}
