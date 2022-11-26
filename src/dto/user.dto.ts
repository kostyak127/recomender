import { ProjectDto } from './project.dto';

export type UserDto = {
  id: string;
  project: ProjectDto;
};
