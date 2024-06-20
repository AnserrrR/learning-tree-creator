import { Entity, Column, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../common/entities/app-base.entity';
import { TreeNodeEntity } from './tree-node.entity';

@Entity('task')
export class TaskEntity extends AppBaseEntity {
  @ManyToOne(() => TreeNodeEntity, (node) => node.tasks)
  node: TreeNodeEntity;

  @Column('text')
  title: string;

  @Column('text')
  note: string;

  @Column('boolean')
  isComplete: boolean;
}
