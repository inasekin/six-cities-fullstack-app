export type NewUser = {
  name: string;
  email: string;
  password: string;
  isPro: boolean;
  avatar: File | undefined;
};
