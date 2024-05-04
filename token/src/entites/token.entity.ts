import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../common/entities/app-base.entity';

@Entity()
export class TokenEntity extends AppBaseEntity {
  @Column('text')
  token: string;

  @Column('uuid')
  userId: string;
}
