import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Tree } from './objects/tree.object';
import { firstValueFrom } from 'rxjs';
import { GraphQLUUID } from 'graphql-scalars';

@Resolver()
export class TreeResolver {
  constructor(
    @Inject('BACK_SERVICE') private readonly backServiceClient: ClientProxy,
  ) {}

  @Query(() => Tree)
  async getTreeById(@Args('id', { type: () => GraphQLUUID })id: string):
  Promise<Tree> {
    return firstValueFrom(this.backServiceClient.send('tree_get_by_id', id));
  }
}
