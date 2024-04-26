import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TreeService } from './tree.service';

@Controller()
export class TreeController {
  constructor(
    private readonly treeService: TreeService,
  ) {}

  @MessagePattern('tree_get_by_id')
  async getTreeById(id: string) {
    return this.treeService.getTreeById(id);
  }
}
