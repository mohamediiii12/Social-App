import { Component, EventEmitter, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-side-left',
  imports: [TranslatePipe],
  templateUrl: './side-left.component.html',
  styleUrl: './side-left.component.css',
})
export class SideLeftComponent {
  type: 'all' | 'following' | 'me'|'bookmarks'='following'
  @Output() itemEvent :EventEmitter<any> = new EventEmitter<any>()
  getFeedContent(type: 'all' | 'following' | 'me' | 'bookmarks'): void {
    this.itemEvent.emit(type)
    this.type = type
  }
 
}
