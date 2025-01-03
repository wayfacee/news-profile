export interface NewsPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type NewsResponse = NewsPost[];