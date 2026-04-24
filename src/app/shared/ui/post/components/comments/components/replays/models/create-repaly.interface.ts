export interface CreateReplayResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  reply: Reply;
}

interface Reply {
  _id: string;
  content: string;
  image: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: string;
  likes: any[];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}