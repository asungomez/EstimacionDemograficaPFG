export type DataItem = {
  id?: string;
  text: string;
  author?: string;
  metadata?: {
    [attribute: string]: string;
  };
};
