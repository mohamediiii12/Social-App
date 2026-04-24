import { Component, OnInit, ViewChild } from '@angular/core';
import { SideLeftComponent } from "./components/side-left/side-left.component";
import { FeedContentComponent } from "./components/feed-content/feed-content.component";
import { SideRightComponent } from "./components/side-right/side-right.component";

@Component({
  selector: 'app-feed',
  imports: [SideLeftComponent, FeedContentComponent, SideRightComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {
  feedContent !: 'all' | 'following' | 'me'|'bookmarks' ;
   fllter( type : 'all' | 'following' | 'me'|'bookmarks'):void{
    this.feedContent = type
   }
  ngOnInit(){
  
  console.log("hiii");
  
   console.log(this.feedContent);
  }
}
