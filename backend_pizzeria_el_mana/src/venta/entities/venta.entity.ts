import { Cliente } from 'src/clientes/entities/cliente.entity';
//import { VentaDetalle } from 'src/venta-detalles/entities/venta-detalle.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
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

@Entity('ventas')
export class Venta {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column('int', { name: 'id_cliente' })
    idCliente: number;

    @Column('int', { name: 'id_usuario' })
    idUsuario: number;

    @Column('int')
    transaccion: number;

    @Column('date')
    fecha: Date;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;

    @DeleteDateColumn({ name: 'fecha_eliminacion' })
    fechaEliminacion: Date;

    //@OneToMany(() => VentaDetalle, detalle => detalle.venta)
    //detalles: VentaDetalle[];

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente;

    // llave foranea viene de usuarios
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
}