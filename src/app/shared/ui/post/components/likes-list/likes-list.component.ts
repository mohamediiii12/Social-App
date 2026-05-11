import { Component, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { PostLikesService } from '../../services/post-likes.service';
import { Like } from '../../models/post-likes.interface';
import { RouterLink } from "@angular/router";
import { LoginUser } from '../../../../../core/models/login/login.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-likes-list',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './likes-list.component.html',
  styleUrl: './likes-list.component.css',
})
export class LikesListComponent implements OnInit {
  mainUser:LoginUser=JSON.parse(localStorage.getItem('user')!)
  private readonly postLikesService = inject(PostLikesService);
  @Input() postId!: string;
  @Input() postLikesCount!: number;
  @Output() closeListEvent = new EventEmitter<boolean>();
   postLikes:Like[] = [];
   loadingLikes: boolean = true
   ngOnInit(): void {
     this.getPostLikes()
   }
  getPostLikes():void{
    this.postLikesService.getPostLikes(this.postId).subscribe({
      next: (response) => {
       this.postLikes = response.data.likes
       this.loadingLikes = false
      },
      error: (err) => {
        console.log(err);
        this.loadingLikes = false
      }
    });
  }
  closeList():void{
    this.closeListEvent.emit(false)
  }
  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.inside')) {
      this.closeList()
    }
  }
  goProfileLink(id: string):any {
  return id===this.mainUser._id ? ['/profile'] : [`/profile`, id]
 }
}
