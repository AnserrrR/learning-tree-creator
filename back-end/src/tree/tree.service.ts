import { Injectable, NotFoundException } from '@nestjs/common';
import { TreeEntity } from './tree.entity';
import assert from '../common/assert';

@Injectable()
export class TreeService {
  async getTreeById(id: string): Promise<TreeEntity> {
    const tree = await TreeEntity.findOneBy({ id });

    assert(tree, new NotFoundException(`Tree with id ${id} not found`));

    return tree;
  }
}
