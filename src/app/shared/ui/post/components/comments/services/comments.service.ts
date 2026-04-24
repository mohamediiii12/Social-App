import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommentResponse } from '../models/comment.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { CreateCommentResponse } from '../models/create-comment.interface';
import { UpdateCommentResponse } from '../models/update-comment.interface';
import { LikeCommentResponse } from '../models/like-unlike-comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);
  getComments(id: string, limit: number, page: number=1): Observable<CommentResponse> {
    return this.httpClient.get<CommentResponse>(environment.baseUrl + `/posts/${id}/comments?page=${page}&limit=${limit}`);
  }
  createComment(id: string, data: object): Observable<CreateCommentResponse> {
    return this.httpClient.post<CreateCommentResponse>(environment.baseUrl + `/posts/${id}/comments`, data);
  } 
  updateComment(postId: string, CommentId: string, data: object):Observable<UpdateCommentResponse>{
    return this.httpClient.put<UpdateCommentResponse>(environment.baseUrl + `/posts/${postId}/comments/${CommentId}`, data);
  }
  deleteComment(postId: string, CommentId: string):Observable<DeleteCommentResponse>{
    return this.httpClient.delete<DeleteCommentResponse>(environment.baseUrl + `/posts/${postId}/comments/${CommentId}`);
  }
  likeUnlikeComment(postId: string, CommentId: string):Observable<LikeCommentResponse>{
    return this.httpClient.put<LikeCommentResponse>(environment.baseUrl + `/posts/${postId}/comments/${CommentId}/like`, {});
  }
}
