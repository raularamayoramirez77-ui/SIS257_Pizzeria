import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'El campo descripcion es obligatorio' })
  @IsString({ message: 'El campo descripcion debe ser tipo cadena' })
  @MaxLength(200, {
    message: 'El campo descripcion debe tener maximo 200 caracteres',
  })
  readonly descripcion: string;
}
