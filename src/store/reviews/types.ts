export type ReviewUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Review = {
  id: string;
  date: string;
  comment: string;
  rating: number;
  user: ReviewUser;
};

export type ReviewsState = {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
};
