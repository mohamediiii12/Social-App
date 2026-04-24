export interface getBookMarksResponse {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
}

interface Data {
  bookmarks: Bookmark[];
}

export interface Bookmark {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost:SharedPost | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

interface TopComment {
  _id: string;
  content: string;
  image: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}
interface SharedPost {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}
interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}


export interface putBookmarkResponse {
  success: boolean;
  message: string;
  data: putData;
}

interface putData {
  bookmarked: boolean;
  bookmarksCount: number;
}