import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarEntity } from './entities/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
