import { LoginUser } from './../../../../core/models/login/login.interface';
import { Component, ElementRef, HostListener, inject, input, OnChanges, OnInit, SimpleChanges, ViewChild ,AfterViewInit,OnDestroy} from '@angular/core';
import { PostService } from '../../../../core/services/post.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../../core/models/posts/post.interface';
import { LikeResponseSuccess } from '../../../../core/models/posts/like-unlike.interface';
import { Input } from '@angular/core';
import { Bookmark } from '../../../../core/models/bockMarks/book-marks.interface';
import { PostComponent } from "../../../../shared/ui/post/post.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-feed-content',
  imports: [ReactiveFormsModule, PostComponent,TranslatePipe],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit, OnChanges,AfterViewInit,OnDestroy {
  @Input() feedContentt: 'all' | 'following' | 'me' | 'bookmarks' = 'following';
  private readonly postService = inject(PostService);
  posts: Post[] = [];
  allPosts: Post[] = [];
  followingPosts: Post[] = [];
  mePosts: Post[] = [];
  bookmarks: Post[] = [];
  mainUser: LoginUser = {} as LoginUser;
  fileImg: string | ArrayBuffer | null | undefined;
  content: FormControl = new FormControl('', Validators.required)
  privacy: FormControl = new FormControl('public')
  saveFile!: File;
  looding: boolean = true;
  isCreating = false;
  progressValue = 0;
  intervalId: any;
  currentPage: number = 1;
  totalPage: number = 1;
  showBtn: boolean = false

  ngOnInit(): void {
    
    this.mainUser = JSON.parse(localStorage.getItem('user')!)
  }
  ngOnChanges(): void {
    console.log(this.feedContentt);
    this.looding = true
    this.hasMore = true
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    if (this.feedContentt !== 'bookmarks') {
      this.currentPage = 1
      this.getPosts(this.feedContentt, 1);
    } else {
      this.currentPage = 1
      this.getBookMarks(1);
    }
  }
  getPosts(type: 'all' | 'following' | 'me' | 'bookmarks', page: number): void {
    this.postService.getHomePosts(type, page, 20).subscribe({
      next: (response) => {
        if (this.feedContentt === 'all') {
          const newPosts = response.data.posts;
          this.allPosts = [...this.allPosts, ...newPosts];
          this.totalPage = response.meta.pagination.numberOfPages;
          this.currentPage = response.meta.pagination.currentPage;
          this.looding = false;
        } else if (this.feedContentt === 'following') {
          const newPosts = response.data.posts;
          this.followingPosts = [...this.followingPosts, ...newPosts];
          this.totalPage = response.meta.pagination.numberOfPages;
          this.currentPage = response.meta.pagination.currentPage;
          this.looding = false;
        } else if (this.feedContentt === 'me') {
          const newPosts = response.data.posts;
          this.mePosts = [...this.mePosts, ...newPosts];
          this.totalPage = response.meta.pagination.numberOfPages;
          this.currentPage = response.meta.pagination.currentPage;
          this.looding = false;
        }
        console.log(response.data.posts);
      },
      error: (err) => {
        console.log(err);
        this.looding = false;
      },
      complete: () => {
        this.looding = false;
      }
    })
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
  createPost(e: Event, postForm: HTMLFormElement): void {
    e.preventDefault();
    if (this.content.value || this.saveFile) {
      const formData = new FormData()
      if (this.content.value) {
        formData.append('body', this.content.value)
      }
      if (this.privacy.value) {
        formData.append('privacy', this.privacy.value)
      }
      if (this.fileImg) {
        formData.append('image', this.saveFile)
      }
      this.isCreating = true;
      this.progressValue = 0;

      this.intervalId = setInterval(() => {
        if (this.progressValue < 80) {
          this.progressValue += Math.random() * 5;
        }
      }, 200);
      this.postService.createPosts(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.finishProgress();
          this.postService.getSinglePost(response.data.post._id).subscribe({
            next: (response) => {
              if (this.feedContentt === 'all') {
                this.allPosts.unshift(response.data.post);
              } else if (this.feedContentt === 'following') {
                this.followingPosts.unshift(response.data.post);
              } else if (this.feedContentt === 'me') {
                this.mePosts.unshift(response.data.post); 
              }
            }
          })
          postForm.reset();
          this.fileImg = null;
          this.content.reset();
          this.privacy.reset('public');
        },
        error: (err) => {
          this.finishProgress();
          console.log(err);
        }
      })
    } else {
      this.content.markAsTouched()
    }
  }
  finishProgress() {
    clearInterval(this.intervalId);
    this.progressValue = 100;
    setTimeout(() => {
      this.isCreating = false;
      this.progressValue = 0;
    }, 400);
  }
  deletePost(id: string): void {
   if(this.feedContentt === 'me'){
    this.mePosts = this.mePosts.filter(post => post._id !== id)
   }else if(this.feedContentt === 'following'){
    this.followingPosts = this.followingPosts.filter(post => post._id !== id)
   }else if(this.feedContentt === 'all'){
    this.allPosts = this.allPosts.filter(post => post._id !== id)
   }else if(this.feedContentt === 'bookmarks'){
    this.bookmarks = this.bookmarks.filter(post => post._id !== id)
   }
   
    this.postService.deletePost(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }
  updatePost(data: { id: string, body: string, privacy: string }): void {
    const formData = new FormData()
    if (data.body) {
      formData.append('body', data.body)
    }
    if (data.privacy) {
      formData.append('privacy', data.privacy)
    }
    if(this.feedContentt === 'me'){
      this.mePosts.forEach(post => {
        if (post._id === data.id) {
          post.body = data.body;
          post.privacy = data.privacy;  
        }
      })
    }else if(this.feedContentt === 'following'){
      this.followingPosts.forEach(post => {
        if (post._id === data.id) {
          post.body = data.body;
          post.privacy = data.privacy;
        }
      })
    }else if(this.feedContentt === 'all'){
      this.allPosts.forEach(post => {
        if (post._id === data.id) {
          post.body = data.body;
          post.privacy = data.privacy;
        }
      })
    }else if(this.feedContentt === 'bookmarks'){
      this.bookmarks.forEach(post => {
        if (post._id === data.id) {
          post.body = data.body;
          post.privacy = data.privacy;  
        }
      })
    }
    this.postService.updatePost(data.id, formData).subscribe({
      next: (response) => {
        console.log(response);

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {

      }
    })
  }
  likeUnLike(id: string): void {
    if(this.feedContentt === 'me'){
      this.mePosts.forEach(post => {
        if (post._id === id) {
          if (post.likes.includes(this.mainUser._id)) {
            post.likes.splice(post.likes.indexOf(this.mainUser._id), 1);
          } else {
            post.likes.push(this.mainUser._id)  
          }
        }
      })
    }else if(this.feedContentt === 'following'){
      this.followingPosts.forEach(post => {
        if (post._id === id) {
          if (post.likes.includes(this.mainUser._id)) {
            post.likes.splice(post.likes.indexOf(this.mainUser._id), 1);
          } else {
            post.likes.push(this.mainUser._id)
          }
        }
      })
    }else if(this.feedContentt === 'all'){
      this.allPosts.forEach(post => {
        if (post._id === id) {
          if (post.likes.includes(this.mainUser._id)) {
            post.likes.splice(post.likes.indexOf(this.mainUser._id), 1);
          } else {
            post.likes.push(this.mainUser._id)
          }
        }
      })
    }else if(this.feedContentt === 'bookmarks'){
      this.bookmarks.forEach(post => {
        if (post._id === id) {
          if (post.likes.includes(this.mainUser._id)) {
            post.likes.splice(post.likes.indexOf(this.mainUser._id), 1);
          } else {
            post.likes.push(this.mainUser._id)
          }
        }
      })
    }
    this.postService.likeUnlikePost(id).subscribe({
      next: (response) => {
        console.log(response);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  saveUnsave(id: string): void {
    if (this.feedContentt === 'me') {
      this.mePosts.forEach(post => {
        if (post._id === id) {
          post.bookmarked = !post.bookmarked;
        }
      })
    }else if (this.feedContentt === 'following') {
      this.followingPosts.forEach(post => {
        if (post._id === id) {
          post.bookmarked = !post.bookmarked;
        }
      })
    }else if (this.feedContentt === 'all') {
      this.allPosts.forEach(post => {
        if (post._id === id) {
          post.bookmarked = !post.bookmarked;
        }
      })
    }else if (this.feedContentt === 'bookmarks') {
      this.bookmarks =this.bookmarks.filter(post => post._id !== id)
      
        
      
    }
    this.postService.MarkUnmark(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getBookMarks(page: number): void {
    this.postService.getBookmarks(page, 20).subscribe({
      next: (response) => {
        console.log(response);
        this.looding = false;
        const newPosts = response.data.bookmarks;
        this.bookmarks = [...this.bookmarks, ...newPosts];
        this.totalPage = response.meta.pagination.numberOfPages;
        this.currentPage = response.meta.pagination.currentPage;
      },
      error: (err) => {
        console.log(err);
        this.looding = false;
      }
    })
  }
  loadMorePosts(): void {
    if (this.currentPage < this.totalPage) {
      if (this.feedContentt !=='bookmarks') {
        this.getPosts(this.feedContentt, this.currentPage + 1);
      }else{
        this.getBookMarks(this.currentPage + 1);
      }
    } else{
      this.hasMore = false
      return
    }
  }
  @ViewChild('loadingMorePosts') trigger!: ElementRef;

observer!: IntersectionObserver;

hasMore = true;
page = 1;
ngAfterViewInit(): void {
  this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.looding && this.hasMore) {
        this.loadMorePosts();
      }
    });
  
    this.observer.observe(this.trigger.nativeElement);
}
  ngOnDestroy(): void {
  this.observer?.disconnect();
}
}

