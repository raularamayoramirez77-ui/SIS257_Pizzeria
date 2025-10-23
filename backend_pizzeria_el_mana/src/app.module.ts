import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { CategoriasModule } from './categorias/categorias.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { ClientesModule } from './clientes/clientes.module';
import { VentaModule } from './venta/venta.module';
import { VentaDetallesModule } from './venta-detalles/venta-detalles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    CategoriasModule,
    EmpleadosModule,
    UsuariosModule,
    ProductosModule,
    ClientesModule,
    VentaModule,
    VentaDetallesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
