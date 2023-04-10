import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { GetCarDto } from './dto/get-car.dto';
import { throwHttpException } from 'src/utils/exception';
import { I18nService } from 'nestjs-i18n';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  async create(@Body(new ValidationPipe()) createCarDto: CreateCarDto) {
    try {
      return this.carsService.create(createCarDto);
    } catch (error: unknown) {
      return throwHttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        await this.i18n.translate('ERROR'),
        { error },
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return this.carsService.findAll();
    } catch (error: unknown) {
      return throwHttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        await this.i18n.translate('ERROR'),
        { error },
      );
    }
  }

  @Get(':id')
  async findOne(@Param(new ValidationPipe()) params: GetCarDto) {
    try {
      return this.carsService.findOne(+params?.id);
    } catch (error: unknown) {
      return throwHttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        await this.i18n.translate('ERROR'),
        { error },
      );
    }
  }

  @Patch(':id')
  async update(
    @Param(new ValidationPipe()) params: GetCarDto,
    @Body(new ValidationPipe()) updateCarDto: UpdateCarDto,
  ) {
    try {
      return this.carsService.update(+params?.id, updateCarDto);
    } catch (error: unknown) {
      return throwHttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        await this.i18n.translate('ERROR'),
        { error },
      );
    }
  }

  @Delete(':id')
  async remove(@Param(new ValidationPipe()) params: GetCarDto) {
    try {
      return this.carsService.remove(+params?.id);
    } catch (error: unknown) {
      return throwHttpException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        await this.i18n.translate('ERROR'),
        { error },
      );
    }
  }
}
