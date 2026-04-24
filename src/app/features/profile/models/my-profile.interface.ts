export interface MyProfileResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  user: MainUser;
}

export interface MainUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  cover: string;
  bookmarks: string[];
  followers: any[];
  following: string[];
  createdAt: string;
  passwordChangedAt: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}