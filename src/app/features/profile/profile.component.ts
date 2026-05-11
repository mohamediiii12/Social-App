import { PostService } from './../../core/services/post.service';
import { Component, inject, OnInit } from '@angular/core';
import { MyProfileService } from './services/my-profile.service';
import { MainUser } from './models/my-profile.interface';
import { Post } from '../../core/models/posts/post.interface';
import { RouterLink } from "@angular/router";
import { Bookmark } from '../../core/models/bockMarks/book-marks.interface';
import { FormsModule } from '@angular/forms';
import { SharedPostComponent } from "../../shared/ui/post/components/shared-post/shared-post.component";

import { CustomTimePipe } from '../../shared/pipes/custom-time-pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, FormsModule, SharedPostComponent,CustomTimePipe,TranslatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly myProfileService = inject(MyProfileService)
  private readonly postService = inject(PostService)
  user: MainUser = {} as MainUser
  posts: Post[] = []
  bookmarks: Bookmark[] = []
  showImg: boolean = false;
  img: string = "";
  fileImg: string | ArrayBuffer | null | undefined;
  saveFile!: File;
  privacy: 'public' | 'following' | 'only_me' = 'public';
  postsType: 'me' | 'saved' = 'me';
  uploadPhotoModal: boolean = false
  ngOnInit(): void {
    this.getMyProfile()

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
        this.uploadPhotoModal= true
        console.log(this.fileImg);
      }
    }
  }
  uploadPhoto(): void {
    if(this.saveFile){
      const formData = new FormData()
      formData.append('photo', this.saveFile)
      formData.append('privacy', this.privacy)
      this.user.photo = this.fileImg as string
      const user = JSON.parse(localStorage.getItem('user')!)
      user.photo = this.fileImg
      localStorage.setItem('user', JSON.stringify(user))
      this.uploadPhotoModal = false
      this.myProfileService.uploadPhoto(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.getNestedPosts(this.user._id)
          
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
  getMyProfile(): void {
    this.myProfileService.getMyprofile().subscribe({
      next: (response) => {
        console.log(response);
        this.user = response.data.user;
        this.getNestedPosts(this.user._id)
        this.getBookMarks()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getNestedPosts(id: string): void {
    this.postService.getNestedPosts(id).subscribe({
      next: (response) => {
        console.log(response);
        this.posts = response.data.posts
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getBookMarks(): void {
    this.postService.getBookmarks( 1, 50).subscribe({
      next: (response) => {
        console.log(response);
        this.bookmarks = response.data.bookmarks
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  openImg(img: string) {
    this.img = img;
    this.showImg = true;
  }
  closeImg() {
    this.showImg = false;
    this.img = "";
  }
  switchPostsType(type: 'me' | 'saved'): void {
    if (this.postsType !== type) {
      this.postsType = type;
    } else return
  }
 goProfileLink(id: string):any {
  return id===this.user._id ? ['/profile'] : [`/profile`, id]
 }

}
