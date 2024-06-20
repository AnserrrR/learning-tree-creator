export interface ITreeGetFiltered {
  filter: {
    name?: string;
    description?: string;
    type?: string;
    parent_id?: string;
    children?: boolean;
  };
  pagination: {
    limit: number;
    offset: number;
  };
}
