import { registerEnumType } from '@nestjs/graphql';

export enum PositionEnum {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}
registerEnumType(PositionEnum, {
  name: 'PositionEnum',
  description: 'Position of the edge',
});
