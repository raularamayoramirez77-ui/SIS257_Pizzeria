import { IsDate, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateUsuarioDto {
    @IsNotEmpty({message:'El campo id empleado es obligatorio'})
    @IsInt({message:'El campo id empleado debe ser un numero entero'})
    @MaxLength(11,{message:'El campo id empleado debe tener maximo 11 caracteres'})
    readonly idEmpleado: number;
  
    @IsNotEmpty({message:'El campo usuario es obligatorio'})
    @IsString({message:'El campo  usuario debe ser un numero entero'})
    @MaxLength(50,{message:'El campo usuario debe tener maximo 50 caracteres'})
    readonly usuario: string;
  
    @IsNotEmpty({message:'El campo clave es obligatorio'})
    @IsString({message:'El campo clave debe ser un numero entero'})
    @MaxLength(100,{message:'El campo clave debe tener maximo 100 caracteres'})
    readonly clave: string;
  
    @IsNotEmpty({message:'El campo usuario registro es obligatorio'})
    @IsString({message:'El campo usuario registro debe ser un numero entero'})
    @MaxLength(50,{message:'El campo usuario registro debe tener maximo 50 caracteres'})
    readonly usuarioRegistro: string;

    @IsDefined({message:'El campo fecha registro es obligatorio'})
    @IsDate({message:'El campo fecha registro debe ser tipo fecha'})
    readonly fechaRegistro: Date;
  
}
