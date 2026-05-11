import { NotificationService } from './services/notification.service';
import { Component, inject, OnInit } from '@angular/core';
import { NotifComponent } from "./notif/notif.component";
import { Notification } from './models/get-notifications.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  imports: [NotifComponent,TranslatePipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);

  allNotifications: Notification[] = [];
  unreadNotifications: Notification[] = [];
  unreadCount: number = 0;
  currentPage: number = 1;
  totalpages: number = 1;
  limit: number = 15;
  notificationType: 'all' | 'unread' = 'all';
  loading: boolean = true;
  loadingMore: boolean = false;
  moreNotifications: boolean = false;
  showBtn: boolean = false
  ngOnInit(): void {
    this.getAllNotifications(1, 15);
    this.getUnreadNotifications(1, 15);
    this.unreadNotificationCount();
  }
  getAllNotifications(page: number, limit: number): void {
    this.notificationService.getAllNotifications(page, limit).subscribe({
      next: (response) => {
        console.log(response);
        const newNotifications = response.data.notifications;
        this.allNotifications = [...this.allNotifications, ...newNotifications];
        this.currentPage = response.meta.pagination.currentPage;
        this.totalpages = response.meta.pagination.numberOfPages;
        this.loading = false
        this.loadingMore = false
        if(this.allNotifications.length==0){
          this.showBtn = false
      }else if(this.totalpages==1){
          this.showBtn = false
        }else if(this.currentPage==this.totalpages){
          this.showBtn = false
        }else{
          this.showBtn = true
        }
      },
      error: (err) => {
        console.log(err);
        this.loading = false
        this.loadingMore = false
      }
    })
  }
  getUnreadNotifications(page: number, limit: number): void {
    this.notificationService.getUnreadNotifications(page, limit).subscribe({
      next: (response) => {
        console.log(response);
        const newNotifications = response.data.notifications;
        this.unreadNotifications = [...this.unreadNotifications, ...newNotifications];
        this.currentPage = response.meta.pagination.currentPage;
        this.totalpages = response.meta.pagination.numberOfPages;
        this.loading = false;
        this.loadingMore = false
        if(this.unreadNotifications.length==0){
          this.showBtn = false
      }else if(this.totalpages==1){
          this.showBtn = false
        }else if(this.currentPage==this.totalpages){
          this.showBtn = false
        }else{
          this.showBtn = true
        }
      },
      error: (err) => {
        console.log(err);
        this.loading = false
        this.loadingMore = false
      }
    })
  }
  unreadNotificationCount(): void {
    this.notificationService.getUnreadCount().subscribe({
      next: (response) => {
        this.unreadCount = response.data.unreadCount;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  markNotification(id: string): void {
    if (this.allNotifications.find(notif => notif._id === id)) {
      this.allNotifications = this.allNotifications.map(notif => notif._id === id ? { ...notif, isRead: true } : notif);
    }
    if (this.unreadNotifications.find(notif => notif._id === id)) {
      this.unreadNotifications = this.unreadNotifications.filter(notif => notif._id !== id);
    }
    this.notificationService.markNotification(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  markAllNotifications(): void {
    if (this.allNotifications.length === 0) return
    if (this.unreadNotifications.length === 0) return
    this.allNotifications.forEach(notif => {
      if (notif.isRead) return
    })
    this.allNotifications.forEach(notif => notif.isRead = true);
    this.unreadNotifications = [];
    this.notificationService.markAllNotification().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  switchNotifications(type: 'all' | 'unread'): void {
    if (type === this.notificationType) return
    if(type === 'unread'&&this.unreadNotifications.length==0){
      this.showBtn = false
    }
    this.notificationType = type

  }
  moreNotificationss(): void {
    this.loadingMore = true
    if (this.currentPage < this.totalpages) {
      if (this.notificationType === 'all') {
        this.getAllNotifications(this.currentPage + 1, this.limit);
      } else if (this.notificationType === 'unread') {
        this.getUnreadNotifications(this.currentPage + 1, this.limit);
      }
    }
  }
}
