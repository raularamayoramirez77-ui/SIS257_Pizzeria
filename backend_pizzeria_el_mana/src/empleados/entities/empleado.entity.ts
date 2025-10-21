import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50, name: 'Nombre' })
  nombre: string;

  @Column('varchar', { length: 20, name: 'primer_apellido' })
  primerApellido: string;

  @Column('varchar', { length: 20, name: 'segundo_apellido' })
  segundoApellido: string;

  @Column('varchar', { length: 100, name: 'dirección' })
  direccion: string;

  @Column('varchar', { length: 15, name: 'celular' })
  celular: string;

  @Column('varchar', { length: 50, name: 'cargo' })
  cargo: string;

  @Column('varchar', { length: 50, name: 'usuario_registro' })
  usuarioRegistro: string;

  @Column('date')
  fechaRegistro: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @CreateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @CreateDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToOne(() => Usuario, (usuario) => usuario.idEmpleado)
  usuario: Usuario;
}
