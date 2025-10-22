import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column('varchar', { length: 10})
    cedulaIdentidad: string;

    @Column('varchar', { length: 40})
    nombres: string;

    @Column('varchar', { length: 20})
    primerApellido: string;

    @Column('varchar', { length: 20})
    segundoApellido: string;

    @Column('varchar', { length: 100})
    direccion: string;

    @Column('varchar', { length : 15})
    celular: string;

    @Column('varchar', { length: 200})
    correoElectronico: string;

    @Column('varchar', { length: 40 })
    usuarioRegistro: string;
    
    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
    
    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;
    
    @DeleteDateColumn({ name: 'fecha_eliminacion' })
    fechaEliminacion: Date;
    
    @Column({ type: 'smallint', default: 1 })
    estado: number;
}

