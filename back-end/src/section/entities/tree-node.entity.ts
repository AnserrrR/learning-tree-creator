import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { AppBaseEntity } from '../../common/entities/app-base.entity';
import { TreeEntity } from '../../tree/tree.entity';
import { TaskEntity } from './task.entity';
import { NodeFileEntity } from './node-file.entity';
import { NodeLinkEntity } from './node-link.entity';

@Entity('tree_node')
export class TreeNodeEntity extends AppBaseEntity {
  @Column('text')
  label: string;

  @Column('text')
  description: string;

  @Column('double precision')
  positionX: number;

  @Column('double precision')
  positionY: number;

  @Column('boolean')
  isComplete: boolean;

  @ManyToOne(() => TreeEntity, (tree) => tree.nodes)
  tree: TreeEntity;

  @OneToMany(() => TaskEntity, (task) => task.node)
  @JoinColumn()
  tasks: TaskEntity[];

  @OneToMany(() => NodeFileEntity, (file) => file.node)
  @JoinColumn()
  files: NodeFileEntity[];

  @OneToMany(() => NodeLinkEntity, (link) => link.node)
  @JoinColumn()
  links: NodeLinkEntity[];
}
