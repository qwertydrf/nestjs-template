import { randomUUID } from 'crypto';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DateTime } from 'luxon';

export class addCarsTableAndCars1681167938954 implements MigrationInterface {
  private readonly tableName = 'cars';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'uuid',
            type: 'varchar',
            length: '36',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'brand',
            type: 'varchar',
            length: '50',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'model',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'logo',
            type: 'varchar',
            length: '250',
            isNullable: true,
            isUnique: false,
          },
          {
            name: 'image',
            type: 'varchar',
            length: '250',
            isNullable: true,
            isUnique: false,
          },
          {
            name: 'year',
            type: 'integer',
            isNullable: true,
            isUnique: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await this.addExampleCars(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }

  private async addExampleCars(queryRunner: QueryRunner): Promise<void> {
    this.insetRow(
      queryRunner,
      'Toyota',
      'AE86',
      1986,
      'https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg',
      'https://soymotor.com/sites/default/files/styles/watermark_wide_960/public/imagenes/noticia/ae86_trueno.jpg.webp?itok=4VKi5Z-9',
      DateTime.now().toISO() as string,
    );

    this.insetRow(
      queryRunner,
      'Suzuki',
      'SJ413',
      1992,
      'https://www.pngmart.com/files/10/Suzuki-Logo-PNG-Image.png',
      'https://silverfenix7.files.wordpress.com/2010/05/suzukisamurai.jpeg',
      DateTime.now().toISO() as string,
    );
  }

  private async insetRow(
    queryRunner: QueryRunner,
    brand: string,
    model: string,
    year: number,
    logo: string,
    image: string,
    createdAt: string,
  ) {
    const uuid = randomUUID();
    await queryRunner.query(
      `INSERT INTO ${this.tableName} 
      (uuid, brand, model, year, logo, image, created_at) 
      VALUES 
      ('${uuid}', '${brand}', '${model}', '${year}', '${logo}', '${image}', '${createdAt}');`,
    );
  }
}
