import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClienteDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo cedulaIdentidad no debe estar vacío' })
    @IsString({ message: 'El campo cedulaIdentidad debe ser de tip cadena' })
    @MaxLength(40, {message: 'El campo cedulaIdentidad no debe exceder los 10 caracteres'})
    @Transform(({ value }): string | undefined => typeof value === 'string' ? value.trim() : value)
    readonly cedulaIdentidad: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombres no debe estar vacío' })
    @IsString({ message: 'El campo nombres debe ser de tip cadena' })
    @MaxLength(40, {message: 'El campo nombres no debe exceder los 40 caracteres'})
    @Transform(({ value }): string | undefined => typeof value === 'string' ? value.trim() : value)
    readonly nombres: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo primerApellido no debe estar vacío' })
    @IsString({ message: 'El campo primerApellido debe ser de tip cadena' })
    @MaxLength(40, {message: 'El campo primerApellido no debe exceder los 20 caracteres'})
    @Transform(({ value }): string | undefined => typeof value === 'string' ? value.trim() : value)
    readonly primerApellido: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo segundoApellido no debe estar vacío' })
    @IsString({ message: 'El campo segundoApellido debe ser de tip cadena' })
    @MaxLength(40, {message: 'El campo segundoApellido no debe exceder los 20 caracteres'})
    @Transform(({ value }): string | undefined => typeof value === 'string' ? value.trim() : value)
    readonly segundoApellido: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo direccion no debe estar vacío' })
    @IsString({ message: 'El campo direccion debe ser de tip cadena' })
    @MaxLength(40, {message: 'El campo direccion no debe exceder los 100 caracteres'})
    @Transform(({ value }): string | undefined => typeof value === 'string' ? value.trim() : value)
    readonly direccion: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo celular no debe estar vacío' })
    @IsString({ message: 'El campo celular debe ser de tip cadena' })
    @MaxLength(40, {message: 'El campo celular no debe exceder los 15 caracteres'})
    @Transform(({ value }): string | undefined => typeof value === 'string' ? value.trim() : value)
    readonly celular: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo correoElectronico no debe estar vacío' })
    @IsString({ message: 'El campo correoElectronico debe ser de tip cadena' })
    @MaxLength(40, {message: 'El campo correoElectronico no debe exceder los 200 caracteres'})
    @Transform(({ value }): string | undefined => typeof value === 'string' ? value.trim() : value)
    readonly correoElectronico: string;
}
