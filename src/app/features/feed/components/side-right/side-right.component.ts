import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users/users.service';
import { Suggestion } from '../../../../core/models/suggest-users/suggest-users.interface';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { LoginUser } from '../../../../core/models/login/login.interface';

@Component({
  selector: 'app-side-right',
  imports: [RouterLink,FormsModule],
  templateUrl: './side-right.component.html',
  styleUrl: './side-right.component.css',
})
export class SideRightComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  mainUser:LoginUser=JSON.parse(localStorage.getItem('user')!)
  loading: boolean = false;
  suggetions: Suggestion[] = [];
  searchTerm: string = '';
  allSuggetionsForSearch: Suggestion[] = [];
  loadingFollow: string = ''
  ngOnInit(): void {
    this.getSuggetions()
  }
  getSuggetions(): void {
    this.loading = true;
    this.usersService.getSuggestUsers(1, 50).subscribe({
      next: (res) => {
        const newUsers = res.data.suggestions;
        this.suggetions = [...this.suggetions, ...newUsers];
        this.allSuggetionsForSearch = [...this.allSuggetionsForSearch, ...newUsers];
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    })
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
}