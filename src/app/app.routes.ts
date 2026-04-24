import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { RegisterComponent } from './features/register/register.component';
import { Routes, CanActivateFn } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { LoginComponent } from './features/login/login.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ProfileComponent } from './features/profile/profile.component';
import { FeedComponent } from './features/feed/feed.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { gusetGuard } from './core/auth/guards/guset-guard';
import { SuggetFollowingUsersComponent } from './features/sugget-following-users/sugget-following-users.component';
import { PostDetailsComponent } from './features/post-details/post-details.component';

export const routes: Routes = [
   {
      path: '',
      redirectTo: 'register',
      pathMatch: 'full',
   },
   {
      path: '',
      component: AuthLayoutComponent,
      canActivate: [gusetGuard],
      children: [
         {
            path: 'login',
            component: LoginComponent, title: "Login page"
         },
         {
            path: 'register',
            component: RegisterComponent, title: "Register page"
         },
         {
            path: 'forgot',
            component: ForgotPasswordComponent, title: "Forgot Password page"
         },
      ],
   },
   {
      path: '',
      component: MainLayoutComponent,
      canActivate: [authGuard],
      children: [
         {
            path: 'profile',
            component: ProfileComponent, title: "Profile | page"
         },
         {
            path: 'profile/:id',
            component: UserProfileComponent, title: "Profile | page"
         },
         {
            path: 'feed',
            component: FeedComponent, title: "Timeline | page"
         },
         {
            path: 'notifications',
            component: NotificationComponent, title: "Notifications | page"
         },
         {
            path: 'change',
            component: ChangePasswordComponent, title: "Change Password | page"
         },
         {
            path: 'suggestions',
            component: SuggetFollowingUsersComponent, title: "Suggetions | page"
         },
         {
            path: 'postDetails/:id',
            component: PostDetailsComponent, title: "Post Details | page"
         }
      ],
   },
   {
      path: '**',
      component: NotfoundComponent, title: "Not Found page"
   }
];
