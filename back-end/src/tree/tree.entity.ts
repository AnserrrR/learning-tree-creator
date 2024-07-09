import {
  Column, Entity, JoinColumn, OneToMany,
} from 'typeorm';
import { AppBaseEntity } from '../common/entities/app-base.entity';
import { TreeNodeEntity } from '../section/entities/tree-node.entity';

@Entity('tree')
export class TreeEntity extends AppBaseEntity {
  @Column('uuid')
  authorId: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  imageId: string;

  @Column('text')
  name: string;

  @Column('boolean')
  isPublic: boolean;

  @Column('integer')
  chaptersCompiled: number;

  @Column('text')
  description: string;

  @OneToMany(() => TreeNodeEntity, (node) => node.tree)
  @JoinColumn()
  nodes: TreeNodeEntity[];
}
