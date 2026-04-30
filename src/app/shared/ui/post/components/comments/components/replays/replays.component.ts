import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { ReplaysService } from './services/replays.service';
import { LoginUser } from '../../../../../../../core/models/login/login.interface';
import { Reply } from './models/replays.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { RouterLink } from "@angular/router";
import { RelativeTimePipe } from '../../../../../../pipes/relative-time-pipe';

@Component({
  selector: 'app-replays',
  imports: [ReactiveFormsModule, RouterLink,RelativeTimePipe],
  templateUrl: './replays.component.html',
  styleUrl: './replays.component.css',
})
export class ReplaysComponent implements OnInit {
  private readonly replaysService = inject(ReplaysService)
  private readonly commentsService = inject(CommentsService)
  replays: Reply[] = []
  @Input() commentId!: string
  @Input() postId!: string
  @Input() mainUser!: LoginUser
  fileImg: string | ArrayBuffer | null | undefined;
  content: FormControl = new FormControl('', Validators.required)
  editcontent: FormControl = new FormControl('', Validators.required)
  saveFile!: File;
  replayForEdit: string | null = null;
  currentPage: number = 1;
  totalPage: number = 1;
  loadingMore: boolean = false;
  loadingCreating: boolean = false
  loadingReplays: boolean = true
  loadingLikeId: string | null = null
  showBtn: boolean = false

  ngOnInit(): void {
    this.getReplays(1)
  }
  getReplays(page: number) {
    this.replaysService.getReplays(this.postId, this.commentId, 5, page).subscribe({
      next: (response) => {
        console.log(response);
        const newReplays = response.data.replies
        this.replays = [...this.replays, ...newReplays]
        this.totalPage = response.meta.pagination.numberOfPages
        this.currentPage = response.meta.pagination.currentPage
        this.loadingReplays = false
        this.loadingMore = false
        if(this.replays.length==0){
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
        this.loadingReplays = false
      }
    })
  }
  loadMoreReplays(): void {
    this.loadingMore = true;
    if (this.currentPage < this.totalPage) {
      this.getReplays(this.currentPage + 1);
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
  createComment(e: Event, replayForm: HTMLFormElement): void {

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

      this.replaysService.createReplay(this.postId, this.commentId, formData).subscribe({
        next: (response) => {
          console.log(response);
          this.loadingCreating = false
          this.replays=[]
          this.getReplays(1);
          replayForm.reset();
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
  editReplay(content: string, replayId: string) {
    if (this.replayForEdit === replayId) {
      this.replayForEdit = null;
    } else {
      this.replayForEdit = replayId;
    }
    this.editcontent.setValue(content);
  }
  updateReplay(replayId: string) {
    const formData = new FormData();
    if (this.editcontent) {
      formData.append('content', this.editcontent.value)
    }
    this.replays.forEach(replay => {
      if (replay._id === replayId) {
        replay.content = this.editcontent.value;
      }
    })
    this.replayForEdit = null
    this.commentsService.updateComment(this.postId, replayId, formData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  deleteReplay(replayId: string) {
    this.replays = this.replays.filter(replay => replay._id !== replayId)
    this.commentsService.deleteComment(this.postId, replayId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
   likeUnLike(replayId: string): void {
      this.loadingLikeId = replayId
      this.commentsService.likeUnlikeComment(this.postId,replayId).subscribe({
        next: (response) => {
          console.log(response);
        this.replays.forEach(replay => {
          if (replay._id === replayId) {
            if(replay.likes.includes(this.mainUser._id)){
              replay.likes.splice(replay.likes.indexOf(this.mainUser._id), 1);
            }else{
              replay.likes.push(this.mainUser._id)
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
  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdownMenuIconButton')) {
      document.querySelectorAll('.dots')?.forEach(dots => dots.classList.add('hidden'));
      document.querySelectorAll('.dots')?.forEach(dots => dots.classList.remove('block'));
    }
  }
   goProfileLink(id: string):any {
  return id===this.mainUser._id ? ['/profile'] : [`/profile`, id]
 }
}
