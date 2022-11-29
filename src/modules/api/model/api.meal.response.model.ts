import { ApiProperty } from '@nestjs/swagger';

export class ApiMealResponseModel {
  @ApiProperty({
    name: 'name',
    required: true,
    type: 'string',
    nullable: false,
  })
  name: string;

  @ApiProperty({
    name: 'id',
    required: true,
    type: 'string',
    nullable: false,
  })
  id: string;
}
