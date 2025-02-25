export type TTypeArticles = {
  author: {
    following: boolean;
    image: string | null;
    username: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
};

export type TPostProps = {
  username: string;
  image: string | null;
  date: string;
  title: string;
  tagList: string[];
  body: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  updatedAt: string;
  article: TTypeArticles;
};

export interface IListProps {
  children: React.ReactNode; 
  className?: string;
}
