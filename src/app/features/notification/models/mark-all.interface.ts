export interface MarkAllResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  modifiedCount: number;
}