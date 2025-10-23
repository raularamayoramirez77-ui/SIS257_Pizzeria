export class CreateVentasDto {}
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, IsInt, IsDate } from 'class-validator';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class CreateVentaDto {
  @ApiProperty({ description: 'ID del cliente' })
  @IsNotEmpty({ message: 'El campo idCliente es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El campo idCliente debe ser de tipo numérico' })
  readonly idCliente: Cliente['id'];

  @ApiProperty({ description: 'ID del usuario' })
  @IsNotEmpty({ message: 'El campo idUsuario es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El campo idUsuario debe ser de tipo numérico' })
  readonly idUsuario: Usuario['id'];

  @ApiProperty({ description: 'Número de transacción de la venta' })
  @IsNotEmpty({ message: 'El campo transacción es obligatorio' })
  @IsNumber({}, { message: 'El campo transacción debe ser un número' })
  @Min(0, { message: 'La transacción debe ser mayor o igual a 0' })
  readonly transaccion: number;

  @ApiProperty({ description: 'Fecha de la venta', default: new Date() })
  @Type(() => Date)
  @IsNotEmpty({ message: 'El campo fecha es obligatorio' })
  @IsDate({ message: 'El campo fecha debe ser de tipo fecha' })
  readonly fecha: Date = new Date();
}