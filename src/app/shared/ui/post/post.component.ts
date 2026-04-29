import { PostService } from './../../../core/services/post.service';
import { Component, Input, Output, EventEmitter, HostListener, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Post } from '../../../core/models/posts/post.interface';
import { LoginUser } from '../../../core/models/login/login.interface';
import { CommentsComponent } from "./components/comments/comments.component";
import { LikesListComponent } from "./components/likes-list/likes-list.component";
import { RouterLink } from "@angular/router";
import { SharedPostComponent } from "./components/shared-post/shared-post.component";
import { share } from 'rxjs';
import { RelativeTimePipe } from '../../pipes/relative-time-pipe';



@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommentsComponent, LikesListComponent, RouterLink, SharedPostComponent, FormsModule,RelativeTimePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  private readonly postService = inject(PostService);
  @Input() post!: Post;
  @Input() mainUser!: LoginUser;
  @Output() like = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() bookmark = new EventEmitter<string>();
  @Output() update = new EventEmitter<{id: string, body: string, privacy: string}>();
  openEdit = false;
  editContent: FormControl = new FormControl('');
  editPrivacy: FormControl = new FormControl('');
  openComments = false;
  img: string = "";
  showImg: boolean = false;
  shareBody: string = "";
  showLikeList: boolean = false;
  showShareModal = false;
  loadingShare: boolean = false;
  onLike() {
    this.like.emit(this.post._id);
  }
  onDelete() {
    this.delete.emit(this.post._id);
  }
  onBookmark() {
    this.bookmark.emit(this.post._id);
  }
  onEdit() {
    this.openEdit = true;
    this.editContent.setValue(this.post.body);
    this.editPrivacy.setValue(this.post.privacy);
  }

  onCancelEdit() {
    this.openEdit = false;
  }
  onSaveEdit() {
    this.update.emit({
      id: this.post._id,
      body: this.editContent.value,
      privacy: this.editPrivacy.value
    });
    this.openEdit = false;
  }
   @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdownMenuIconButton')) {
      document.querySelector('.dots')?.classList.add('hidden');
      document.querySelector('.dots')?.classList.remove('block');
    }
    if(!target.closest('img')) {
      this.closeImg();
    }
  }
  onComment() {
    this.openComments = !this.openComments;
  }
 openImg(img: string) {
  this.img = img;
  this.showImg = true;
 }
 closeImg() {
  this.showImg = false;
  this.img = "";
 }
 goProfileLink(id: string):any {
  return id===this.mainUser._id ? ['/profile'] : [`/profile`, id]
 }
 onShare() {
  this.showShareModal = true;
 }
 sharing() {
  this.loadingShare = true;
  this.postService.sharePost(this.post._id, this.shareBody).subscribe({
    next: (response) => {
      console.log(response);
      this.showShareModal = false;
      this.shareBody = "";
      this.loadingShare = false;
    },
    error: (err) => {
      console.log(err);
      this.loadingShare = false;
    }
  })
 }
}
