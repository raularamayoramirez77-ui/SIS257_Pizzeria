import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo id del categoria debe estar definido' })
  @IsInt({ message: 'El campo id del categoria debe ser numérico' })
  readonly idCategoria: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe estar vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tip cadena' })
  @MaxLength(40, {message: 'El campo descripcion no debe exceder los 40 caracteres'})
  @Transform(({ value }): string | undefined => typeof value === 'string' ? value.trim() : value)
  readonly descripcion: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo precioVenta debe estar definido' })
  @IsNumber({ maxDecimalPlaces: 5 }, { message:'El campo precioVenta debe ser numérico con máximo cinco decimales'})
  @Min(0, { message: 'El campo precioVenta no puede ser negativo' })
  readonly precioVenta: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo stock debe estar definido' })
  @IsInt({ message: 'El campo stock debe ser un número entero' })
  @Min(0, { message: 'El campo stock no puede ser negativo' })
  readonly stock: number;
}
