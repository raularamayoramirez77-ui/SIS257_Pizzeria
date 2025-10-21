import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column('varchar',{length:50, name:'Nombre'})
    nombre: string;
    
    @Column('varchar',{length:200, name:'Descripcion'})
    descripcion: string;

    @CreateDateColumn({ name: 'fecha_creacion'})
    fechaCreacion: Date;

    @CreateDateColumn({ name: 'fecha_modificacion'})
    fechaModificacion: Date;

    @CreateDateColumn({ name: 'fecha_eliminacion'})
    fechaEliminacion: Date;
}
