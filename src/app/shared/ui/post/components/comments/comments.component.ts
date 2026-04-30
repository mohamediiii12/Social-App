import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { ReplaysComponent } from "./components/replays/replays.component";
import { CommentsService } from './services/comments.service';
import { Comment } from './models/comment.interface';
import { LoginUser } from '../../../../../core/models/login/login.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { RelativeTimePipe } from '../../../../pipes/relative-time-pipe';

@Component({
  selector: 'app-comments',
  imports: [ReplaysComponent, ReactiveFormsModule, RouterLink,RelativeTimePipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit {
  private readonly commentsService = inject(CommentsService)
  @Input() id!: string
  comments: Comment[] = [];
  fileImg: string | ArrayBuffer | null | undefined;
  content: FormControl = new FormControl('', Validators.required)
  editcontent: FormControl = new FormControl('', Validators.required)
  saveFile!: File;
  mainUser: LoginUser = JSON.parse(localStorage.getItem('user')!)
  loadingComments: boolean = true
  loadingCreating: boolean = false
  CommentIdForReplay: string | null = null;
  CommentIdForEdit: string | null = null;
  currentPage: number = 1;
  totalPage: number = 1;
  loadingMore: boolean = false
  loadingLikeId: string | null = null
  showBtn: boolean = false
  ngOnInit(): void {
    this.getComments(1);
  }
  getComments(page: number): void {
    this.commentsService.getComments(this.id, 5, page).subscribe({
      next: (response) => {
        console.log(response);
        const newComments = response.data.comments
        this.comments = [...this.comments, ...newComments]
        this.currentPage = response.meta.pagination.currentPage;
        this.totalPage = response.meta.pagination.numberOfPages;
        this.loadingComments = false
        this.loadingMore = false
        if(this.comments.length==0){
          this.showBtn = false
        }else if (this.totalPage==1){
          this.showBtn = false
        }else if(this.currentPage==this.totalPage){
          this.showBtn = false
        }else{
          this.showBtn = true
        }
      },
      error: (err) => {
        console.log(err);
        this.loadingComments = false
        this.loadingMore = false
      }
    });
  }
  loadMoreComments(): void {
    this.loadingMore = true;
    if (this.currentPage < this.totalPage) {
      this.getComments(this.currentPage + 1);
      if((this.currentPage+1)==this.totalPage){
      this.showBtn = false
    }
    } else return;
  }
  getphoto(e: Event): void {
    const file = e.target as HTMLInputElement
    if (file.files) {
      console.log(file.files);
      this.saveFile = file.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.saveFile)
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.fileImg = e.target?.result;
        console.log(this.fileImg);
      }
    }
  }
  createComment(e: Event, CommentForm: HTMLFormElement): void {

    e.preventDefault();
    if (this.content.value || this.saveFile) {
      this.loadingCreating = true
      const formData = new FormData()
      if (this.content.value) {
        formData.append('content', this.content.value)
      }
      if (this.fileImg) {
        formData.append('image', this.saveFile)
      }

      this.commentsService.createComment(this.id, formData).subscribe({
        next: (response) => {
          console.log(response);
          this.loadingCreating = false
          this.comments=[]
          this.getComments(1);
          CommentForm.reset();
          this.fileImg = null;
          this.content.reset();
        },
        error: (err) => {
          console.log(err);
          this.loadingCreating = false
        }
      })
    } else {
      this.content.markAsTouched()
    }
  }
  editComment(content: string, commentId: string) {
    if (this.CommentIdForEdit === commentId) {
      this.CommentIdForEdit = null;
    } else {
      this.CommentIdForEdit = commentId;
    }
    this.editcontent.setValue(content);
  }
  updateComment(commentId: string): void {
    const formData = new FormData();
    if (this.editcontent) {
      formData.append('content', this.editcontent.value)
    }
    this.comments.forEach(comment => {
      if (comment._id === commentId) {
        comment.content = this.editcontent.value;
      }
    })
    this.CommentIdForEdit = null
    this.commentsService.updateComment(this.id, commentId, formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  deleteComment(commentId: string): void {
    this.comments = this.comments.filter(comment => comment._id !== commentId)
    this.commentsService.deleteComment(this.id, commentId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdownMenuIconButton')) {
      document.querySelectorAll('.dots')?.forEach(dots => dots.classList.add('hidden'));
      document.querySelectorAll('.dots')?.forEach(dots => dots.classList.remove('block'));
    }
  }
  openReplayy(commentId: string): void {
    if (this.CommentIdForReplay === commentId) {
      this.CommentIdForReplay = null;
    } else {
      this.CommentIdForReplay = commentId;
    }
  }
   likeUnLike(commentId: string): void {
      this.loadingLikeId = commentId
      this.commentsService.likeUnlikeComment(this.id, commentId).subscribe({
        next: (response) => {
          console.log(response);
        this.comments.forEach(comment => {
          if (comment._id === commentId) {
            if(comment.likes.includes(this.mainUser._id)){
              comment.likes.splice(comment.likes.indexOf(this.mainUser._id), 1);
            }else{
              comment.likes.push(this.mainUser._id)
            }
            
          }
        });
        this.loadingLikeId = null
        },
        error: (err) => {
          console.log(err);
          this.loadingLikeId = null
        }
      })
    }
     goProfileLink(id: string):any {
  return id===this.mainUser._id ? ['/profile'] : [`/profile`, id]
 }
}
