import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApiProjectRequestModel {
  @IsString({ message: 'name must be string type' })
  @ApiProperty({
    name: 'name',
    required: true,
    type: 'string',
    nullable: false,
  })
  name: string;
}
