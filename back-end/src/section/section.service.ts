import { Injectable, NotFoundException } from '@nestjs/common';
import { TreeNodeEntity } from './entities/tree-node.entity';
import assert from '../common/functions/assert';
import { ITreeNode } from './interfaces/tree-node.interface';
import { IEdge } from './interfaces/edge-interface';
import { ISection } from './interfaces/section.interface';
import { EdgeEntity } from './entities/edge.entity';

@Injectable()
export class SectionService {
  async getById(id: string): Promise<TreeNodeEntity> {
    const tree = await TreeNodeEntity.findOneBy({ id });

    assert(tree, new NotFoundException(`Tree with id ${id} not found`));

    return tree;
  }

  async createManyNodes(nodes: ITreeNode[]): Promise<TreeNodeEntity[]> {
    return Promise.all(nodes.map((node) => TreeNodeEntity.create(node).save()));
  }

  async createManyEdges(edges: IEdge[]): Promise<EdgeEntity[]> {
    return Promise.all(edges.map((edge) => EdgeEntity.create(edge).save()));
  }

  async updateSection(section: ISection): Promise<TreeNodeEntity> {
    return TreeNodeEntity.save({
      ...section,
    });
  }
}
