import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { postLikesResponse } from '../models/post-likes.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostLikesService {
  private readonly httpClient = inject(HttpClient)
  getPostLikes(postId: string): Observable<postLikesResponse> {
    return this.httpClient.get<postLikesResponse>(environment.baseUrl + `/posts/${postId}/likes?page=1&limit=30`)
  }
}
