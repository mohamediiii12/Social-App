import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserProfileResponse } from '../models/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly httpClient = inject(HttpClient)
  getUserProfile(id: string): Observable<UserProfileResponse> {
    return this.httpClient.get<UserProfileResponse>(environment.baseUrl+`/users/${id}/profile`)
  }
}
