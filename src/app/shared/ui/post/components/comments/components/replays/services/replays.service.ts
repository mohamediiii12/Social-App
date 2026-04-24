import { ReplaysResponse } from './../models/replays.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateReplayResponse } from '../models/create-repaly.interface';

@Injectable({
  providedIn: 'root',
})
export class ReplaysService {
  private readonly httpClient = inject(HttpClient);

  getReplays(postId: string, CommentId: string , limit: number, page: number=1): Observable<ReplaysResponse> {
    return this.httpClient.get<ReplaysResponse>(environment.baseUrl + `/posts/${postId}/comments/${CommentId}/replies?page=${page}&limit=${limit}`);
  }
  createReplay(postId: string, CommentId: string, data: object): Observable<CreateReplayResponse> {
    return this.httpClient.post<CreateReplayResponse>(environment.baseUrl + `/posts/${postId}/comments/${CommentId}/replies`, data);
  }
}
