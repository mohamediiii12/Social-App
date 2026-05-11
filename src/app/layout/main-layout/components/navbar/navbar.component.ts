import { LoginUser } from './../../../../core/models/login/login.interface';
import { Component, HostListener, inject, OnChanges, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../../core/auth/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit,OnChanges {
  userInfo: LoginUser = {} as LoginUser;
  dropDown: boolean = false;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  ngOnInit(): void {
   this.userInfo = this.authService.getuserinfo();
  }
  ngOnChanges(): void {
    this.userInfo = this.authService.getuserinfo();
  }
  toggleDropDown(): void {
    this.dropDown = !this.dropDown;
  }
  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropDownButton')) {
      this.dropDown = false;
    }
  }
}
