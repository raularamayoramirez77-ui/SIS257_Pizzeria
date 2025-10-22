import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class CreateEmpleadoDto {
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser tipo cadena' })
  @MaxLength(50, { message: 'El campo nombre debe tener maximo 50 caracteres' })
  readonly nombre: string;

  @IsNotEmpty({ message: 'El campo del primer apellido es obligatorio' })
  @IsString({ message: 'El campo del primer apellido debe ser tipo cadena' })
  @MaxLength(20, { message: 'El campo nombre debe tener maximo 20 caracteres' })
  readonly primerApellido: string;

  @IsNotEmpty({ message: 'El campo del segundo apellido es obligatorio' })
  @IsString({ message: 'El campo del segundo apellido debe ser tipo cadena' })
  @MaxLength(20, {
    message: 'El campo del segundo apellido debe tener maximo 20 caracteres',
  })
  readonly segundoApellido: string;

  @IsNotEmpty({ message: 'El campo dirección es obligatorio' })
  @IsString({ message: 'El campo dirección debe ser tipo cadena' })
  @MaxLength(100, {
    message: 'El campo dirección debe tener maximo 100 caracteres',
  })
  readonly direccion: string;

  @IsNotEmpty({ message: 'El campo celular es obligatorio' })
  @IsString({ message: 'El campo celular debe ser tipo cadena' })
  @MaxLength(15, {
    message: 'El campo celular debe tener maximo 15 caracteres',
  })
  readonly celular: string;

  @IsNotEmpty({ message: 'El campo cargo es obligatorio' })
  @IsString({ message: 'El campo cargo debe ser tipo cadena' })
  @MaxLength(50, { message: 'El campo cargo debe tener maximo 50 caracteres' })
  readonly cargo: string;
}
