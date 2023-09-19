export type Review = {
  id: number;
  snackName: string;
  image?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
};
