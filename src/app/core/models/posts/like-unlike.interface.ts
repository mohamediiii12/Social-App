export interface LikeResponseSuccess {
  success: boolean;
  message: string;
  data: Data;
}
export interface LikeResponseError {
  success: boolean;
  message: string;
  errors: string;
}
export type LikeResponse = LikeResponseSuccess | LikeResponseError;
interface Data {
  liked: boolean;
  likesCount: number;
  post: PosLike;
}

interface PosLike {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: UserLike;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  likesCount: number;
  isShare: boolean;
  id: string;
}

interface UserLike {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}
