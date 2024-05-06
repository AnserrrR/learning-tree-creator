import { Column, Entity } from 'typeorm';
import { UserRoleEnum } from '../enums/user-role.enum';
import { AppBaseEntity } from '../common/entities/app-base.entity';
import bcrypt from 'bcrypt';

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
  @Column('enum', { enum: UserRoleEnum, default: UserRoleEnum.User })
  role: UserRoleEnum;

  @Column('text')
  password: string;

  async encryptPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
