import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../models/get-notifications.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-notif',
  imports: [RouterLink],
  templateUrl: './notif.component.html',
  styleUrl: './notif.component.css',
})
export class NotifComponent {
@Input() notif!: Notification
@Output() markNotif = new EventEmitter<string>()
onmarkNotif(e:Event): void {
  e.stopPropagation();
  this.markNotif.emit(this.notif._id);
}

}
