import { Component, inject, OnInit } from '@angular/core';
import { PostComponent } from "../../shared/ui/post/post.component";
import { LoginUser } from '../../core/models/login/login.interface';
import { PostService } from '../../core/services/post.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../../core/models/posts/post.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-details',
  imports: [PostComponent,RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly postService = inject(PostService)
  private readonly router = inject(Router)
  private readonly location=inject(Location)
 mainUser: LoginUser = JSON.parse(localStorage.getItem('user')!);
 post:Post = {} as Post
 postId :string="" ;
ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe({
  next: (params) => {
    this.postId = params.get('id')!;
    this.getPostDetails(this.postId);
  }
 })
}
getPostDetails(id: string): void {
  this.postService.getSinglePost(id).subscribe({
    next: (response) => {
      this.post = response.data.post;
      console.log(response.data.post);
    },
    error: (err) => {
      console.log(err);
    }
  })
}
 
  deletePost(id: string): void {
    this.post ={} as Post
    this.router.navigate(['/feed']);
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
  updatePost(data:{id: string, body: string, privacy: string}): void {
    const formData = new FormData()
    if (data.body) {
      formData.append('body', data.body)
    }
    if (data.privacy) {
      formData.append('privacy', data.privacy)
    }
          if (this.post._id === data.id) {
            this.post.body = data.body;
            this.post.privacy = data.privacy;
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
        if (this.post._id === id) {
         if(this.post.likes.includes(this.mainUser._id)){
           this.post.likes.splice(this.post.likes.indexOf(this.mainUser._id), 1);
         }else{
           this.post.likes.push(this.mainUser._id)
         }
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
  saveUnsave(id:string):void{
    
      if (this.post._id === id) {
        this.post.bookmarked = !this.post.bookmarked;
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
  goBack(): void {
  if (window.history.length > 1) {
    this.location.back();
  } else {
    this.router.navigate(['/feed']);
  }
}
}
