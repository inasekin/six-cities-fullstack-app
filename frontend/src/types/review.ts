export type Review = {
  comment: string;
  date: string;
  id: string;
  rating: number;
  user: {
    avatarUrl: string;
    email: string;
    isPro: boolean;
    name: string;
  };
};
