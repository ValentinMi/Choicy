export type IChoice = {
  _id: string;
  category: ICategory;
  title: string;
  proposals: IProposal[];
  vote: number;
};

export type IProposal = {
  title: string;
  imageUrl: string;
  chosen: number;
  rate?: number;
};

export type ICategory = {
  _id?: string;
  title: string;
};

export type IUser = {
  username: string;
  isAdmin?: boolean;
};

export type ICredentials = {
  username: string;
  password: string;
};
