import { OrderItemDto } from './order-item.dto';
import { UserDto } from './user.dto';
import { ProjectDto } from './project.dto';

export type OrderDto = {
  items: OrderItemDto[];
  userId: UserDto['id'];
  // time that order should be delivered MUST BE IN USER TIMEZONE
  deliveryDatetime: Date;
  project: ProjectDto;
};
