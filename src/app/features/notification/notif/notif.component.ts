import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../models/get-notifications.interface';
import { RouterLink } from "@angular/router";
import { LoginUser } from '../../../core/models/login/login.interface';
import { RelativeTimePipe } from '../../../shared/pipes/relative-time-pipe';

@Component({
  selector: 'app-notif',
  imports: [RouterLink,RelativeTimePipe],
  templateUrl: './notif.component.html',
  styleUrl: './notif.component.css',
})
export class NotifComponent {
@Input() notif!: Notification
@Output() markNotif = new EventEmitter<string>()
mainUser:LoginUser=JSON.parse(localStorage.getItem('user')!)
onmarkNotif(e:Event): void {
  e.stopPropagation();
  this.markNotif.emit(this.notif._id);
}

 goProfileLink(id: string):any {
  return id===this.mainUser._id ? ['/profile'] : [`/profile`, id]
 }
}
