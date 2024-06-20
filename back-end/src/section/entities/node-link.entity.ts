import {
  Entity, Column, ManyToOne, PrimaryColumn,
} from 'typeorm';
import { AppBaseEntity } from '../../common/entities/app-base.entity';
import { TreeNodeEntity } from './tree-node.entity';

@Entity('node_link')
export class NodeLinkEntity extends AppBaseEntity {
  @ManyToOne(() => TreeNodeEntity, (node) => node.links)
  node: TreeNodeEntity;

  @Column('text')
  title: string;

  @Column('text')
  url: string;
}
