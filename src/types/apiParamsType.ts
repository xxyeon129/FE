export interface GetLastIdParams {
  category: string;
  filter?: string;
}

export interface GetAllListParams {
  lastId: number;
  size?: number;
  category: string;
}

export interface GetFilteredListParams {
  lastId: number;
  size?: number;
  category: string;
  filter: string;
}
