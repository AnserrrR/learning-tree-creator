import { Injectable, NotFoundException } from '@nestjs/common';
import { TreeEntity } from './tree.entity';
import { SectionService } from '../section/section.service';
import { ITreeUpdate } from './interfaces/tree-update.interface';
import { ITreeCreate } from './interfaces/tree-create.interface';
import { ITreeGetFiltered } from './interfaces/tree-get-filtered.interface';

@Injectable()
export class TreeService {
  constructor(
    private readonly sectionService: SectionService,
  ) {}

  async getTreeById(id: string): Promise<TreeEntity> {
    return TreeEntity
      .findOneByOrFail({ id })
      .catch(() => {
        throw new NotFoundException(`Tree with id ${id} not found`);
      });
  }

  async getFilteredTrees(input: ITreeGetFiltered): Promise<TreeEntity[]> {
    return TreeEntity.find({
      where: {
        ...input.filter,
      },
      skip: input.pagination.offset,
      take: input.pagination.limit,
    });
  }

  async createTree(input: ITreeCreate): Promise<TreeEntity> {
    return TreeEntity.create(input);
  }

  async updateTree(input: ITreeUpdate): Promise<TreeEntity> {
    return TreeEntity.save(input);
  }

  async deleteTree(id: string): Promise<boolean> {
    const tree = await this.getTreeById(id);
    await tree.softRemove();
    return true;
  }
}
