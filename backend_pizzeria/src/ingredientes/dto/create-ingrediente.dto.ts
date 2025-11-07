import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateIngredienteDto {
  @ApiProperty({ example: 'Queso Mozzarella' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty({ example: 'Queso italiano de alta calidad', required: false })
  @IsOptional()
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  readonly descripcion?: string;

  @ApiProperty({ example: 15.50, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El campo precioPorUnidad debe ser de tipo número' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  readonly precioPorUnidad?: number;

  @ApiProperty({ example: 'gramos', required: false })
  @IsOptional()
  @IsString({ message: 'El campo unidadMedida debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo unidadMedida no debe ser mayor a 50 caracteres',
  })
  readonly unidadMedida?: string;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El campo stock debe ser de tipo número' })
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  readonly stock?: number;

  @ApiProperty({
    example: 'https://ejemplo.com/queso.jpg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El campo imagenUrl debe ser de tipo cadena' })
  @MaxLength(255, {
    message: 'El campo imagenUrl no debe ser mayor a 255 caracteres',
  })
  readonly imagenUrl?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'El campo disponible debe ser de tipo booleano' })
  readonly disponible?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean({ message: 'El campo esAlergeno debe ser de tipo booleano' })
  readonly esAlergeno?: boolean;
}
