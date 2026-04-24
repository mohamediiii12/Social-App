import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MyProfileResponse } from '../models/my-profile.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UploadPhotoResponse } from '../models/upload-photo.interface';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  private readonly httpClient = inject(HttpClient)
  getMyprofile(): Observable<MyProfileResponse> {
    return this.httpClient.get<MyProfileResponse>(environment.baseUrl + '/users/profile-data')
  }
  uploadPhoto(data: FormData): Observable<UploadPhotoResponse> {
    return this.httpClient.put<UploadPhotoResponse>(environment.baseUrl + '/users/upload-photo', data)
  }
}
