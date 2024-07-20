import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GraphQLUUID } from 'graphql-scalars';
import { Tree } from './objects/tree.object';
import { MethodsPatterns } from '../common/constants/methods-patterns';
import { MethodPermissions } from '../auth/decorators/method-permissions.decorator';
import { TreeGetFilteredInput } from './inputs/tree-get-filtered.input';
import { TreeCreateInput } from './inputs/tree-create.input';
import { TreeUpdateInput } from './inputs/tree-update.input';
import { TreeNode } from './objects/tree-node.object';
import { SectionUpdateInput } from './inputs/section-update.input';
import { CurrentAuth } from '../auth/decorators/current-auth.decorator';
import { User } from '../auth/objects/user.object';

@Resolver()
export class TreeResolver {
  constructor(
    @Inject('BACK_SERVICE') private readonly backServiceClient: ClientProxy,
  ) {}

  @MethodPermissions(MethodsPatterns.getTreeById)
  @Query(() => Tree)
  async getTreeById(@Args('id', { type: () => GraphQLUUID }) id: string):
  Promise<Tree> {
    return firstValueFrom(this.backServiceClient.send(MethodsPatterns.getTreeById, id));
  }

  @MethodPermissions(MethodsPatterns.getFilteredTrees)
  @Query(() => [Tree])
  async getFilteredTrees(@Args('input') input: TreeGetFilteredInput): Promise<Tree[]> {
    return firstValueFrom(this.backServiceClient.send(MethodsPatterns.getFilteredTrees, input));
  }

  @MethodPermissions(MethodsPatterns.getFilteredTrees)
  @Query(() => [Tree])
  async getFilteredUserTrees(
    @Args('input') input: TreeGetFilteredInput,
    @CurrentAuth('user') user: User,
  ): Promise<Tree[]> {
    return firstValueFrom(this.backServiceClient.send(MethodsPatterns.getFilteredTrees, {
      ...input,
      userId: user.id,
    }));
  }

  @MethodPermissions(MethodsPatterns.createTree)
  @Mutation(() => Tree)
  async createTree(@Args('input') input: TreeCreateInput): Promise<Tree> {
    return firstValueFrom(this.backServiceClient.send(MethodsPatterns.createTree, input));
  }

  @MethodPermissions(MethodsPatterns.updateTree)
  @Mutation(() => Tree)
  async updateTree(@Args('input') input: TreeUpdateInput): Promise<Tree> {
    return firstValueFrom(this.backServiceClient.send(MethodsPatterns.updateTree, input));
  }

  @MethodPermissions(MethodsPatterns.deleteTree)
  @Mutation(() => Boolean)
  async deleteTree(@Args('id', { type: () => GraphQLUUID }) id: string): Promise<boolean> {
    return firstValueFrom(this.backServiceClient.send(MethodsPatterns.deleteTree, id));
  }

  @MethodPermissions(MethodsPatterns.getSectionById)
  @Query(() => TreeNode)
  async getSectionById(@Args('id', { type: () => GraphQLUUID }) id: string): Promise<TreeNode> {
    return firstValueFrom(this.backServiceClient.send(MethodsPatterns.getSectionById, id));
  }

  @MethodPermissions(MethodsPatterns.updateSection)
  @Mutation(() => TreeNode)
  async updateSection(@Args('input') input: SectionUpdateInput): Promise<TreeNode> {
    return firstValueFrom(this.backServiceClient.send(MethodsPatterns.updateSection, input));
  }
}
