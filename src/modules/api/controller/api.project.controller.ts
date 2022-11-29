import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Config } from '../../config/config.variable-getter.service';
import { DomainProjectCreator } from '../../domain/service/project/domain.project-creator.service';
import { DomainProjectGetter } from '../../domain/service/project/domain.project-getter.service';
import { ApiProjectResponseModel } from '../model/api.project.response.model';
import { Helper } from '../../utils/utils.helper';
import { ApiProjectRequestModel } from '../model/api.project.request.model';

@ApiTags('project')
@Controller('project')
export class ApiProjectController {
  public constructor(
    private readonly projectCreator: DomainProjectCreator,
    private readonly projectGetter: DomainProjectGetter,
  ) {}
  @HttpCode(200)
  @ApiOperation({ summary: 'compile rating for ordered meals' })
  @ApiUnauthorizedResponse({ description: 'not valid credentials' })
  @ApiOkResponse({
    status: 200,
    description: 'Success',
    type: ApiProjectResponseModel,
  })
  @Post()
  public async addProject(
    @Body() requestBody: ApiProjectRequestModel,
    @Headers('authorization') token: string,
  ): Promise<ApiProjectResponseModel> {
    if (Config.TOKEN !== token) {
      throw new UnauthorizedException('not valid credentials');
    }
    const project = await this.projectGetter.getByToken(token);
    if (project !== null) {
      return {
        name: project.name,
        apiKey: project.token,
      };
    }
    return this.projectCreator
      .createProject({
        id: Helper.UUID,
        name: requestBody.name,
        token: Helper.UUID,
      })
      .then((project) => {
        return {
          name: project.name,
          apiKey: project.token,
        };
      });
  }
}
