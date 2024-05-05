import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {

  /**
   * Get user by id.
   * @param id - User ID to get the user by.
   * @returns User with the given ID.
   */
  public async getById(id: string): Promise<IUser> {
    return UserEntity.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException(`User with id ${id} not found`);
    });
  }

  /**
   * Get user by credentials.
   * @param input - User credentials to get the user by.
   * @returns User with the given credentials.
   */
  public async getByCredentials(input: { email: string, password: string }): Promise<IUser> {
    const user = await UserEntity.findOneByOrFail({ email: input.email }).catch(() => {
      throw new NotFoundException(`User not found`);
    });

    if (!await user.checkPassword(input.password)) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  /**
   * Create a new user.
   * @param input - User data to create the user with.
   * @returns Created user.
   */
  public async create(input: { email: string, password: string }): Promise<IUser> {
    const user = UserEntity.create( { ...input });
    await user.encryptPassword(input.password);
    return user.save();
  }
}
