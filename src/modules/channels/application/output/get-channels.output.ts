export interface GetChannelsOutput {
  status: string;
  data: {
    channels: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
