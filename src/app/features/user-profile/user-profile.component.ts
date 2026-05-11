import { UsersService } from './../../core/services/users/users.service';
import { PostService } from './../../core/services/post.service';
import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from './services/user-profile.service';
import { LoginUser } from '../../core/models/login/login.interface';
import { DataProfile } from './models/user-profile.interface';
import { Post } from '../../core/models/posts/post.interface';
import { PostComponent } from "../../shared/ui/post/post.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  imports: [PostComponent,TranslatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit{
  private readonly usersService = inject(UsersService)
  private readonly postService = inject(PostService)
  private readonly userProfileService = inject(UserProfileService)
  private readonly activatedRoute = inject(ActivatedRoute);
   private readonly location=inject(Location)
   private readonly router = inject(Router)
  mainUser:LoginUser=JSON.parse(localStorage.getItem('user')!)
  userProfile:DataProfile={} as DataProfile;
  nastedPosts:Post[]=[];
  userId:string='';
  loadingFollow: boolean=false;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.userId = params.get('id')!;
        this.getUserProfile(this.userId);
        this.getNastedPosts(this.userId);
      },
    })
  }
  getUserProfile(id:string):void{
    this.userProfileService.getUserProfile(id).subscribe({
      next: (response) => {
        this.userProfile=response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
 getNastedPosts(id:string):void{
  this.postService.getNestedPosts(id).subscribe({
    next: (response) => {
      this.nastedPosts=response.data.posts;
    },
    error: (err) => {
      console.log(err); 
    }
  })
 }
 saveUnsave(id: string): void {
    this.nastedPosts.forEach(post => {
      if (post._id === id) {
        post.bookmarked = !post.bookmarked;
      }
    })
    this.postService.MarkUnmark(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  likeUnLike(id: string): void {
    this.nastedPosts.forEach(post => {
      if (post._id === id) {
        if (post.likes.includes(this.mainUser._id)) {
          post.likes.splice(post.likes.indexOf(this.mainUser._id), 1);
        } else {
          post.likes.push(this.mainUser._id)
        }
      }
    });
    this.postService.likeUnlikePost(id).subscribe({
      next: (response) => {
        console.log(response);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  followUnFullowUser(userId: string): void {
    this.loadingFollow = true
    this.usersService.followUnfollowUser(userId).subscribe({
      next: (res) => {
        console.log(res);
        this.userProfile.isFollowing = res.data.following;
        
        this.loadingFollow =false
      },
      error: (err) => {
        console.log(err);
        this.loadingFollow =false
      }
    });
  }
  goBack(): void {
  if (window.history.length > 1) {
    this.location.back();
  } else {
    this.router.navigate(['/feed']);
  }
}
}
