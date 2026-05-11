import { Component, Input } from '@angular/core';
import { Post, SharedPost } from '../../../../../core/models/posts/post.interface';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-shared-post',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './shared-post.component.html',
  styleUrl: './shared-post.component.css',
})
export class SharedPostComponent {
  @Input() sharedPost!: SharedPost
  img: string = "";
  showImg: boolean = false;
openShareModal(){

}
 openImg(img: string) {
  this.img = img;
  this.showImg = true;
 }
 closeImg() {
  this.showImg = false;
  this.img = "";
 }
}
