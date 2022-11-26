import { ProjectDto } from './project.dto';
import { RatingDto } from './rating.dto';

export type MealDto = {
  id: string;
  name: string;
  rating: RatingDto[];
  project: ProjectDto;
};
