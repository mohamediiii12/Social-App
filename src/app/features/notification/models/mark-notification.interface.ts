export interface MarkNotificationResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  notification: Notification;
}

 interface Notification {
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