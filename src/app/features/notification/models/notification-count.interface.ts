export interface NotificationCountResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  unreadCount: number;
}