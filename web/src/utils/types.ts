export type localeType = "en" | "mr" | "hi";
export type localesType = localeType[];

export type UserType = {
  _id: string;
  name: string;
  username?: string;
  email?: string;
  profilePhoto?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogType = {
  _id: string;
  title: string;
  author: Partial<UserType>;
  locale: string;
  slug: string;
  body: string;
  readTime: number;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type LikeType = {
  _id: string;
  user: Partial<UserType>;
  createdAt: string;
  updatedAt: string;
};

export type CommentType = {
  _id: string;
  body: string;
  user: Partial<UserType>;
  createdAt: string;
  updatedAt: string;
};

export interface BlogDetailType extends BlogType {
  author: Partial<UserType>;
  likes: LikeType[];
  comments: CommentType[];
}

export type IBlogQueries = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
};

export type LoginDataType = {
  email: string;
  password: string;
};

export type RegisterDataType = {
  name: string;
  username?: string;
  email: string;
  password: string;
  confPassword?: string;
};

export type UpdateUserDataType = {
  name?: string;
  email?: string;
  username?: string;
  profilePhoto?: string;
  password?: string;
  confPassword?: string;
};

export type ISubtitleProps = {
  subtitle: string;
};

export enum CURRENT_PROFILE_TYPE {
  INFO = "",
  REPORTS = "reports",
  BLOGS = "blogs",
  UPDATE_INFO = "update-info",
}

export type LocaleType = "en" | "mr" | "hi";

export enum BLOG_LOCALE_TYPE {
  ENGLISH = "en",
  MARATHI = "mr",
  HINDI = "hi",
}
