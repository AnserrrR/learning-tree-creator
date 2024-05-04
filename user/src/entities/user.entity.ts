import { Column, Entity } from 'typeorm';
import { UserRoleEnum } from '../enums/user-role.enum';
import { AppBaseEntity } from '../common/entities/app-base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends AppBaseEntity {
  /**
   * User email.
   */
  @Column('text', { unique: true })
  email: string;

  /**
   * User role.
   * @enum UserRoleEnum
   */
  @Column('enum', { enum: UserRoleEnum })
  role: UserRoleEnum;

  @Column('text')
  @Exclude()
  password: string;
}
