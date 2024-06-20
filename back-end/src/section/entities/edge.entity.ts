import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TreeNodeEntity } from './tree-node.entity';
import { PositionEnum } from '../enums/position.enum';

@Entity('edge')
export class EdgeEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  sourceId: string;

  @PrimaryColumn('uuid')
  targetId: string;

  @ManyToOne(() => TreeNodeEntity)
  source: TreeNodeEntity;

  @ManyToOne(() => TreeNodeEntity)
  target: TreeNodeEntity;

  @Column('enum', { enum: PositionEnum })
  sourcePosition: PositionEnum;

  @Column('enum', { enum: PositionEnum })
  targetPosition: PositionEnum;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
