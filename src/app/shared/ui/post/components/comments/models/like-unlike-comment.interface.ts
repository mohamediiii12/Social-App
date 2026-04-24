
export interface LikeCommentResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  liked: boolean;
  likesCount: number;
  comment: Comment;
}

interface Comment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: null;
  likes: string[];
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