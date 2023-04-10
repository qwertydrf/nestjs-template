import { IsNotEmpty, IsString } from 'class-validator';

export class GetCarDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
