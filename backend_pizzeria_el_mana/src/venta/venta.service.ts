import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventasRepository: Repository<Venta>,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const existe = await this.ventasRepository.findOneBy({
      transaccion: createVentaDto.transaccion,
    });

    if (existe) throw new ConflictException('La venta ya existe');

    const venta = new Venta();
    venta.idCliente = createVentaDto.idCliente;
    venta.idUsuario = createVentaDto.idUsuario;
    venta.transaccion = createVentaDto.transaccion;
    venta.fecha = createVentaDto.fecha;

    return this.ventasRepository.save(venta);
  }

  async findAll(): Promise<Venta[]> {
    return this.ventasRepository.find({
      relations: {
        cliente: true,
        usuario: {
          empleado: true,
        },
      },
      select: {
        id: true,
        idCliente: true,
        idUsuario: true,
        transaccion: true,
        fecha: true,
        cliente: {
          id: true,
        },
        usuario: {
          id: true,
          usuario: true,
          empleado: {
            id: true,
            nombre: true,
            primerApellido: true,
            segundoApellido: true,
            direccion: true,
            celular: true,
            cargo: true,
          },
        },
      },
      order: {
        fecha: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: {
        cliente: true,
        usuario: {
          empleado: true,
        },
      },
    });

    if (!venta) throw new NotFoundException('La venta no existe');
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    const ventaUpdate = Object.assign(venta, updateVentaDto);
    return this.ventasRepository.save(ventaUpdate);
  }

  async remove(id: number) {
    const venta = await this.findOne(id);
    if (!venta) throw new NotFoundException('La venta no existe');
    return this.ventasRepository.softRemove(venta);
  }
}