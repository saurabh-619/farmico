export type localeType = "en" | "mr" | "hi";
export type localesType = localeType[];

export type UserType = {
  _id: string;
  isAdmin?: boolean;
  name: string;
  username?: string;
  email?: string;
  profilePhoto?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogType = {
  _id: string;
  isPrivate?: boolean;
  title: string;
  subtitle?: string;
  author: Partial<UserType>;
  locale: string;
  slug: string;
  body: string;
  bodyPreview: string;
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

export type PostBlogType = {
  _id?: string;
  locale: string;
  title: string;
  subtitle: string;
  body: string;
  bodyPreview: string;
};

export type PostCommentData = {
  blogId: string;
  body: string;
};

export type DeleteCommentData = {
  blogId: string;
  commentId: string;
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

// Models
export type PostDiseaseResult = {
  model_type: string;
  confidence: string;
  label: string;
  ogImg: string;
};

export type ModelType = "disease" | "weed";
export enum ModelEnum {
  DISEASE = "disease",
  WEED = "weed",
}

export type PostModelResult = {
  // input specific
  model_type: ModelType;
  confidence: string;
  hasWeed?: boolean;
  label?: string;
  ogImg: string;
  resultImg?: string;

  // result specific
  _id?: string;
  user?: UserType;
  isUnhealthy?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogsFetcherArgs = {
  limit?: number;
  page?: number;
  order?: string;
  sortBy?: string;
};
