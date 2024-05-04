import { Injectable, NotFoundException } from '@nestjs/common';
import { TreeEntity } from './tree.entity';

@Injectable()
export class TreeService {
  async getTreeById(id: string): Promise<TreeEntity> {
    return TreeEntity
      .findOneByOrFail({ id })
      .catch(() => {
        throw new NotFoundException(`Tree with id ${id} not found`);
      });
  }
}
