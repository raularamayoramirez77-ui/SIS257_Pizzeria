import {
  IsDate,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsDefined({ message: 'El campo id del genero debe estar definido' })
  @IsInt({ message: 'El campo id del genero debe ser numérico' })
  readonly idEmpleado: number;

  @IsNotEmpty({ message: 'El campo usuario es obligatorio' })
  @IsString({ message: 'El campo  usuario debe ser un numero entero' })
  @MaxLength(50, {
    message: 'El campo usuario debe tener maximo 50 caracteres',
  })
  readonly usuario: string;

  @IsNotEmpty({ message: 'El campo clave es obligatorio' })
  @IsString({ message: 'El campo clave debe ser un numero entero' })
  @MaxLength(100, {
    message: 'El campo clave debe tener maximo 100 caracteres',
  })
  readonly clave: string;
}
