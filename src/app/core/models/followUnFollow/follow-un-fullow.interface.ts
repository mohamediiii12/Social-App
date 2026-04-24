interface FollowUnFollowResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  following: boolean;
  followersCount: number;
}