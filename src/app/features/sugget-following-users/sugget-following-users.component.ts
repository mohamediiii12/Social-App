import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { Suggestion } from '../../core/models/suggest-users/suggest-users.interface';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { LoginUser } from '../../core/models/login/login.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sugget-following-users',
  imports: [RouterLink, FormsModule,TranslatePipe],

  templateUrl: './sugget-following-users.component.html',
  styleUrl: './sugget-following-users.component.css',
})
export class SuggetFollowingUsersComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  mainUser:LoginUser=JSON.parse(localStorage.getItem('user')!)
  loading: boolean = true;
  loadingMore: boolean = false;
  suggetions: Suggestion[] = [];
  limit: number = 20;
  currentPage: number = 1;
  totalPage: number = 1;
  searchTerm: string = '';
  allSuggetionsForSearch: Suggestion[] = [];
  loadingFollow: string = '';
  ngOnInit(): void {
    this.getSuggestion(1);
  }
  getSuggestion(page: number): void {
    this.usersService.getSuggestUsers(page, this.limit).subscribe({
      next: (res) => {
        const newUsers = res.data.suggestions;
        this.suggetions = [...this.suggetions, ...newUsers];
        this.allSuggetionsForSearch = [...this.allSuggetionsForSearch, ...newUsers];
        this.currentPage = res.meta.pagination.currentPage;
        this.totalPage = res.meta.pagination.numberOfPages;
        this.loading = false;
        this.loadingMore = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.loadingMore = false;
      }
    });
  }
  followUnFullowUser(userId: string): void {
    this.loadingFollow = userId
    this.usersService.followUnfollowUser(userId).subscribe({
      next: (res) => {
        console.log(res);
        this.loadingFollow = ''
        this.suggetions = this.suggetions.filter(suggestion => suggestion._id !== userId)
      },
      error: (err) => {
        console.log(err);
        this.loadingFollow = ''
      }
    });
  }
  loadSuggestedUsers(): void {
    this.loadingMore = true;
    if (this.currentPage < this.totalPage) {
      this.getSuggestion(this.currentPage + 1);
    } else return;
  }

  filteredSuggestions(): void {
    if (!this.searchTerm) {
      this.suggetions = this.allSuggetionsForSearch
    } else {
      this.suggetions = this.allSuggetionsForSearch.filter(suggestion => suggestion.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase()) || suggestion.username.toLowerCase().includes(this.searchTerm.trim().toLowerCase()));
    }
  }
  goProfileLink(id: string):any {
  return id===this.mainUser._id ? ['/profile'] : [`/profile`, id]
 }
  // ngOnInit(): void {
  //   this.getSuggetions()
  // }
  // getSuggetions():void{
  //   this.loading = true;
  //   this.usersService.getSuggestUsers(20).subscribe({
  //     next:(res)=>{
  //       this.suggetions = res.data.suggestions
  //       this.loading = false;
  //     },
  //     error:(err)=>{
  //       console.log(err);
  //       this.loading = false;

  //     }
  //   })
  // }
}
