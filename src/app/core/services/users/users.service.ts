import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { SuggestUsersResponse } from '../../models/suggest-users/suggest-users.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly httpClient = inject(HttpClient);
  
  getSuggestUsers(page: number, limit: number): Observable<SuggestUsersResponse> {
    return this.httpClient.get<SuggestUsersResponse>(environment.baseUrl + `/users/suggestions?limit=${limit}&page=${page}`);
  }
  followUnfollowUser(id: string): Observable<FollowUnFollowResponse> {
    return this.httpClient.put<FollowUnFollowResponse>(environment.baseUrl + `/users/${id}/follow`, {});
  }
}
