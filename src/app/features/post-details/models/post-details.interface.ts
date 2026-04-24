export interface PostDetailsResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  post: Post;
}

 interface Post {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment;
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
  likes: string[];
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}