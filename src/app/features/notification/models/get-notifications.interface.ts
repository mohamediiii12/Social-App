export interface GetNotificationsResponse {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}

interface Meta {
  feedMode: string;
  pagination: Pagination;
}

interface Pagination {
  currentPage: number;
  limit: number;
  total: number;
  numberOfPages: number;
  nextPage: number;
}

interface Data {
  notifications: Notification[];
}

 export interface Notification {
  _id: string;
  recipient: Recipient;
  actor: Recipient;
  type: string;
  entityType: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
  entity: Entity;
  readAt?: string;
}

interface Entity {
  _id: string;
  body?: string;
  image?: string;
  user?: string;
  commentsCount?: number;
  topComment?: TopComment | null;
  sharesCount?: number;
  likesCount?: number;
  isShare?: boolean;
  id?: string;
  name?: string;
  username?: string;
  photo?: string;
  followersCount?: number;
  followingCount?: number;
  bookmarksCount?: number;
  unavailable?: boolean;
}


interface TopComment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: null;
  likes: string[];
  createdAt: string;
}

interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

interface Recipient {
  _id: string;
  name: string;
  photo: string;
}