export interface ITreeGetFiltered {
  filter: {
    name?: string;
    description?: string;
    userId?: string;
  };
  pagination?: {
    limit?: number;
    offset?: number;
  };
}
