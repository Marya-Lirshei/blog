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

export type TFavoriteSectionProps = {
  favoritesCount: number;
  slug: string;
  favorited: boolean;
};

export interface IAuthorSectionProps {
  username: string;
  image: string | null;
  date: string;
}

export interface IFormData {
  username?: string;
  email: string;
  password: string;
  image?: string;
  repeatPassword?: string;
  agreeToTerms?: boolean;
}

export interface ArticleApiData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export type TCreateArticle = {
  title: string;
  description: string;
  body: string;
  tagList: Array<{ id: string; nameTag: string }>;
};
