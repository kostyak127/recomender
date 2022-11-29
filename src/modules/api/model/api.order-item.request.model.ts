import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class ApiOrderItemRequestModel {
  @IsString({ message: 'mealId must be string' })
  @ApiProperty({
    name: 'mealId',
    type: 'string',
    description: 'unique meal id',
    nullable: false,
    required: true,
  })
  mealId: string;
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 },
    { message: 'price must be float or integer type' },
  )
  @ApiProperty({
    name: 'price',
    nullable: false,
    required: true,
    type: Number,
    description: 'item price',
  })
  price: number;

  @IsInt({ message: 'quantity must be integer type' })
  @ApiProperty({
    name: 'quantity',
    type: 'integer',
    nullable: false,
    required: true,
    description: 'meal count in order',
  })
  quantity: number;

  @IsString({ message: 'name must be string' })
  @ApiProperty({
    name: 'name',
    type: 'string',
    nullable: false,
    required: true,
    description: 'meal name',
  })
  name: string;
}
