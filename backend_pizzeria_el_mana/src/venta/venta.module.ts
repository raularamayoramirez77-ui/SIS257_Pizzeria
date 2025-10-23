import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { VentasService } from './venta.service';
import { VentaController } from './venta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Venta])],
  controllers: [VentaController],
  providers: [VentasService],
})
export class VentaModule {}
