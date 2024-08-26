import {
  Column, Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { AppBaseEntity } from '../../common/entities/app-base.entity';
import { TreeEntity } from '../../tree/tree.entity';
import { TaskEntity } from './task.entity';
import { NodeFileEntity } from './node-file.entity';
import { NodeLinkEntity } from './node-link.entity';
import { PositionEnum } from '../enums/position.enum';
import { NodeTypeEnum } from '../enums/node-type.enum';

@Entity('tree_node')
export class TreeNodeEntity extends AppBaseEntity {
  @Column('text')
  label: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('double precision')
  positionX: number;

  @Column('double precision')
  positionY: number;

  @Column('boolean', { default: false })
  isComplete: boolean;

  @Column('enum', { enum: PositionEnum, default: PositionEnum.Top })
  targetPosition: PositionEnum;

  @Column('enum', { enum: NodeTypeEnum, default: NodeTypeEnum.ChapterNode })
  nodeType: NodeTypeEnum;

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
