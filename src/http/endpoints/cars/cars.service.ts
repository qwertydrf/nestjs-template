import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';
import { Connection, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { throwHttpException } from 'src/utils/exception';
import { I18nService } from 'nestjs-i18n';
import { randomUUID } from 'crypto';

@Injectable()
export class CarsService {
  constructor(
    private readonly i18n: I18nService,
    private readonly connection: Connection,
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const { brand, model, logo, image, year } = createCarDto;

    const car = this.carRepository.create({
      uuid: randomUUID(),
      brand,
      model,
      logo,
      image,
      year,
    });

    await this.connection.transaction(
      async (transactionalEntityManager: EntityManager): Promise<void> => {
        try {
          await transactionalEntityManager.save(car);
        } catch (error: unknown) {
          return throwHttpException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            await this.i18n.translate('ERROR_TRX'),
            { error },
          );
        }
      },
    );

    return car;
  }

  async findAll(): Promise<CarEntity[]> {
    return await this.carRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    return await this.carRepository.findOne(id);
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car: CarEntity = await this.carRepository.findOne(id);

    if (!car)
      return throwHttpException(
        HttpStatus.BAD_REQUEST,
        await this.i18n.translate('NOT_FOUND'),
      );

    const { brand, model, logo, image, year } = updateCarDto;

    car.brand = brand ? brand : car.brand;
    car.model = model ? model : car.model;
    car.logo = logo ? logo : car.logo;
    car.image = image ? image : car.image;
    car.year = year ? year : car.year;

    await this.connection.transaction(
      async (transactionalEntityManager: EntityManager): Promise<void> => {
        try {
          await transactionalEntityManager.save(car);
        } catch (error: unknown) {
          return throwHttpException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            await this.i18n.translate('ERROR_TRX'),
            { error },
          );
        }
      },
    );

    return car;
  }

  async remove(id: number) {
    const car: CarEntity = await this.carRepository.findOne(id);

    if (!car)
      return throwHttpException(
        HttpStatus.BAD_REQUEST,
        await this.i18n.translate('NOT_FOUND'),
      );

    await this.carRepository.delete(id);

    return car;
  }
}
