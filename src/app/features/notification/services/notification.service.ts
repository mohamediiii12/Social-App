import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { GetNotificationsResponse } from '../models/get-notifications.interface';
import { NotificationCountResponse } from '../models/notification-count.interface';
import { MarkNotificationResponse } from '../models/mark-notification.interface';
import { MarkAllResponse } from '../models/mark-all.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly httpClient = inject(HttpClient)
  
  getAllNotifications(page: number, limit: number): Observable<GetNotificationsResponse> {
    return this.httpClient.get<GetNotificationsResponse>(environment.baseUrl + `/notifications?page=${page}&limit=${limit}`);
  }
  getUnreadNotifications(page: number, limit: number): Observable<GetNotificationsResponse> {
    return this.httpClient.get<GetNotificationsResponse>(environment.baseUrl + `/notifications?unread=false&page=${page}&limit=${limit}`);
  }
  getUnreadCount(): Observable<NotificationCountResponse> {
    return this.httpClient.get<NotificationCountResponse>(environment.baseUrl + `/notifications/unread-count`);
  }
  markNotification(id: string): Observable<MarkNotificationResponse> {
    return this.httpClient.patch<MarkNotificationResponse>(environment.baseUrl + `/notifications/${id}/read`, {});
  }
  markAllNotification(): Observable<MarkAllResponse> {
    return this.httpClient.patch<MarkAllResponse>(environment.baseUrl + `/notifications/read-all`, {});
  }
}
