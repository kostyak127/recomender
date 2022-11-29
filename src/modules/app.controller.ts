import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('system')
@Controller()
export class AppController {
  @ApiOkResponse({ description: 'returns pong if service enabled' })
  @Get('/ping')
  getPing(): string {
    return 'pong';
  }
}
