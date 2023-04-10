import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  readonly model: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly logo: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  readonly year: number;
}
