import { Injectable, NotFoundException } from '@nestjs/common';
import { differenceBy, intersectionBy, isNil } from 'lodash';
import { th } from '@faker-js/faker';
import { DataSource, DeepPartial } from 'typeorm';
import * as console from 'node:console';
import { Edge } from '@nestjs/core/inspector/interfaces/edge.interface';
import { TreeEntity } from './tree.entity';
import { SectionService } from '../section/section.service';
import { ITreeUpdate } from './interfaces/tree-update.interface';
import { ITreeCreate } from './interfaces/tree-create.interface';
import { ITreeGetFiltered } from './interfaces/tree-get-filtered.interface';
import { TreeNodeEntity } from '../section/entities/tree-node.entity';
import { EdgeEntity } from '../section/entities/edge.entity';
import { IEdge } from '../section/interfaces/edge-interface';

@Injectable()
export class TreeService {
  constructor(
    private readonly sectionService: SectionService,
    private readonly dataSource: DataSource,
  ) {}

  async getTreeById(id: string): Promise<TreeEntity> {
    return TreeEntity
      .findOneOrFail({
        where: { id },
        relations: {
          nodes: true,
          edges: true,
        },
      })
      .catch(() => {
        throw new NotFoundException(`Tree with id ${id} not found`);
      });
  }

  async getFilteredTrees(input: ITreeGetFiltered): Promise<TreeEntity[]> {
    return TreeEntity.find({
      where: {
        ...input.filter,
      },
      skip: input.pagination?.offset ?? 0,
      take: input.pagination?.limit ?? 8,
    });
  }

  async createTree(input: ITreeCreate): Promise<TreeEntity> {
    return TreeEntity.create(input);
  }

  async updateTree(input: ITreeUpdate): Promise<TreeEntity> {
    const tree = await this.getTreeById(input.id);
    tree.name = input.name ?? tree.name;
    tree.description = input.description ?? tree.description;
    tree.isPublic = input.isPublic ?? tree.isPublic;

    let nodesToDelete: TreeNodeEntity[] = [];
    let nodesToUpdate: TreeNodeEntity[] = [];
    let nodesToCreate: TreeNodeEntity[] = [];
    if (!isNil(input.nodes)) {
      nodesToDelete = differenceBy(tree.nodes, input.nodes, 'id');
      nodesToUpdate = TreeNodeEntity.create(intersectionBy(input.nodes, tree.nodes, 'id'));
      nodesToCreate = TreeNodeEntity.create(
        differenceBy(input.nodes, tree.nodes, 'id')
          .map((node) => ({
            ...node,
            tree: { id: tree.id },
          })),
      );
    }

    let edgesToDelete: EdgeEntity[] = [];
    let edgesToUpdate: EdgeEntity[] = [];
    let edgesToCreate: EdgeEntity[] = [];
    if (!isNil(input.edges)) {
      const iteratee = (edge: IEdge | EdgeEntity) => `${edge.sourceId}-${edge.targetId}`;
      edgesToDelete = differenceBy(tree.edges, input.edges, iteratee);
      edgesToUpdate = EdgeEntity.create(intersectionBy(input.edges, tree.edges, iteratee));
      edgesToCreate = EdgeEntity.create(
        differenceBy(input.edges, tree.edges, iteratee)
          .map((edge) => ({
            ...edge,
            tree: { id: tree.id },
          })),
      );
    }

    await this.dataSource.transaction(async (manager) => {
      await manager.save(tree);

      await manager.save(nodesToCreate);
      await manager.save(nodesToUpdate);
      await manager.save(edgesToUpdate);
      await manager.save(edgesToCreate);

      await manager.remove(edgesToDelete);
      await manager.remove(nodesToDelete);
    });

    return this.getTreeById(input.id);
  }

  async deleteTree(id: string): Promise<boolean> {
    const tree = await this.getTreeById(id);
    await tree.softRemove();
    return true;
  }
}
