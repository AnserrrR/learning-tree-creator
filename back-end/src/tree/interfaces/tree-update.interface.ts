import { ITreeCreate } from './tree-create.interface';

export interface ITreeUpdate extends Partial<ITreeCreate> {
  id: string;
}
