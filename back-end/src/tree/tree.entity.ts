import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../common/entities/app-base.entity';

@Entity()
export class TreeEntity extends AppBaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
