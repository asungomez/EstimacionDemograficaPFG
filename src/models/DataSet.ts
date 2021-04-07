export type DataItem = {
  id?: string;
  text: string;
  author: string;
  attributes?: {
    [attribute: string]: string;
  };
};
