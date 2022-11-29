import { ApiProperty } from '@nestjs/swagger';

export class ApiProjectResponseModel {
  @ApiProperty({
    name: 'name',
    required: true,
    type: 'string',
    nullable: false,
  })
  name: string;

  @ApiProperty({
    name: 'apiKey',
    required: true,
    type: 'string',
    nullable: false,
  })
  apiKey: string;
}
