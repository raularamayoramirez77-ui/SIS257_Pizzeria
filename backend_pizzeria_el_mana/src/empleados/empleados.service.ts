import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadosService {
  constructor(@InjectRepository(Empleado) private empleadosRepository: Repository<Empleado>) 
  {}
  async create(createEmpleadoDto: CreateEmpleadoDto) {
    let empleado= await this.empleadosRepository.findOneBy({
      nombre: createEmpleadoDto.nombre.trim(),
    });
    if(empleado) throw new ConflictException('El empleado ya existe');
    
    empleado=new Empleado();
    Object.assign(empleado,createEmpleadoDto);
    return this.empleadosRepository.save(empleado);
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadosRepository.find();
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado= await this.empleadosRepository.findOneBy({id});
    if(!empleado) throw new NotFoundException('El empleado no existe');
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado= await this.findOne(id);
    Object.assign(empleado,updateEmpleadoDto);
    return this.empleadosRepository.save(empleado);
  }

  async remove(id: number): Promise<Empleado> {
    const empleado= await this.findOne(id);
    return this.empleadosRepository.softRemove(empleado);
  }
}
