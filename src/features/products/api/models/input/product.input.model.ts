import { IsInt, IsPositive, IsString, Length } from 'class-validator';

export class ProductInputModel {
  @IsString()
  @Length(1, 20)
  name: string;
  @IsPositive()
  price: number;
  @IsInt()
  @IsPositive()
  count: number;
}
