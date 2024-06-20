import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TreeService } from './tree.service';
import { ITreeGetFiltered } from './interfaces/tree-get-filtered.interface';
import { ITreeCreate } from './interfaces/tree-create.interface';
import { ITreeUpdate } from './interfaces/tree-update.interface';

@Controller('tree')
export class TreeController {
  constructor(
    private readonly treeService: TreeService,
  ) {}

  @MessagePattern('tree_get_by_id')
  async getTreeById(id: string) {
    return this.treeService.getTreeById(id);
  }

  @MessagePattern('tree_get_filtered')
  async getFilteredTrees(input: ITreeGetFiltered) {
    return this.treeService.getFilteredTrees(input);
  }

  @MessagePattern('tree_create')
  async createTree(input: ITreeCreate) {
    return this.treeService.createTree(input);
  }

  @MessagePattern('tree_update')
  async updateTree(input: ITreeUpdate) {
    return this.treeService.updateTree(input);
  }

  @MessagePattern('tree_delete')
  async deleteTree(id: string) {
    return this.treeService.deleteTree(id);
  }
}
