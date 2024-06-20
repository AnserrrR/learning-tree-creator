import {
  BaseEntity,
  Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { TreeNodeEntity } from './tree-node.entity';

@Entity('node_file')
export class NodeFileEntity extends BaseEntity {
  @PrimaryColumn('uuid')
  nodeId: string;

  @PrimaryColumn('uuid')
  fileId: string;

  @ManyToOne(() => TreeNodeEntity, (node) => node.files)
  node: TreeNodeEntity;

  @Column('text')
  fullName: string;

  @Column('boolean', { default: false })
  isImage: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
