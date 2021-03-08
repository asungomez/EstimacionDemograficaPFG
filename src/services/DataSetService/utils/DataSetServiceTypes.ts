
export type ParsedDataItem = {
  id?: string;
  text: string;
  author?: string;
  tags?: {
    [name: string]: string
  }
};