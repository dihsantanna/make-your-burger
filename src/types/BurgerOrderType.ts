import type { Status } from './StatusType';

export interface BurgerOrderType {
  id: number;
  name: string;
  meat: string;
  bread: string;
  optionals: string[];
  status: Status;
}
