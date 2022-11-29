import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiOrderRequestModel } from '../model/api.order.request.model';
import { DomainProjectGetter } from '../../domain/service/project/domain.project-getter.service';
import { DomainOrderHandler } from '../../domain/service/order/domain.order-handler.service';

@ApiTags('order')
@Controller('order')
export class ApiOrderController {
  public constructor(
    private readonly projectGetter: DomainProjectGetter,
    private readonly orderHandler: DomainOrderHandler,
  ) {}
  @HttpCode(204)
  @Post()
  @ApiOperation({ summary: 'compile rating for ordered meals' })
  @ApiNoContentResponse({ description: 'success' })
  @ApiUnauthorizedResponse({ description: 'not valid credentials' })
  public async handleOrder(
    @Body() requestBody: ApiOrderRequestModel,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new UnauthorizedException('token not passed in headers');
    }
    const project = await this.projectGetter.getByToken(token);
    if (project === null) {
      throw new UnauthorizedException('access token not registered');
    }
    await this.orderHandler.handleOrder({
      deliveryDatetime: new Date(requestBody.deliveryDatetime),
      items: requestBody.items,
      project: project,
      userId: requestBody.userId,
    });
    return;
  }
}
