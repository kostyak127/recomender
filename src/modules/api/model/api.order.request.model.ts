import { ApiOrderItemRequestModel } from './api.order-item.request.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class ApiOrderRequestModel {
  @IsArray({ message: 'items must be array type' })
  @ApiProperty({
    type: () => ApiOrderItemRequestModel,
    name: 'items',
    isArray: true,
    required: true,
    description: 'items in order',
  })
  items: ApiOrderItemRequestModel[];
  @IsString({ message: 'userId must be string' })
  @ApiProperty({
    name: 'userId',
    type: 'string',
    description: 'unique user id',
    nullable: false,
    required: true,
  })
  userId: string;
  // time that order should be delivered MUST BE IN USER TIMEZONE
  @ApiProperty({
    name: 'deliveryDatetime',
    type: 'string',
    example: '2019-09-12T11:59:49.056',
    description: 'datetime in user timezone',
    nullable: false,
    required: true,
  })
  deliveryDatetime: string;
}
