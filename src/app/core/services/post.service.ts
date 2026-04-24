import { putBookmarkResponse } from './../models/bockMarks/book-marks.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LikeResponse } from '../models/posts/like-unlike.interface';
import { getHomePostsResponse } from '../models/posts/post.interface';
import { getBookMarksResponse } from '../models/bockMarks/book-marks.interface';
import { PostDetailsResponse } from '../../features/post-details/models/post-details.interface';
import { NestedPostResponse } from '../models/posts/nested-post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient)
  
  getPosts():Observable<any> {
    return this.httpClient.get(environment.baseUrl+'/posts')
  }
  getHomePosts(type:string ,page:number, limit:number):Observable<getHomePostsResponse> {
    return this.httpClient.get<getHomePostsResponse>(environment.baseUrl+`/posts/feed?page=${page}&only=${type}&limit=${limit}`)
  }
  createPosts(data:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl+'/posts', data)
  }
  getSinglePost(id:string):Observable<PostDetailsResponse> {
    return this.httpClient.get<PostDetailsResponse>(environment.baseUrl+`/posts/${id}`)
  }
  getNestedPosts(id:string):Observable<NestedPostResponse> {
    return this.httpClient.get<NestedPostResponse>(environment.baseUrl+`/users/${id}/posts`)
  }
  deletePost(id:string):Observable<any> {
    return this.httpClient.delete(environment.baseUrl+`/posts/${id}`)
  }
  updatePost(id:string, data:object):Observable<any> {
    return this.httpClient.put(environment.baseUrl+`/posts/${id}`, data)
  }
  likeUnlikePost(id:string):Observable<LikeResponse> {
    return this.httpClient.put<LikeResponse>(environment.baseUrl+`/posts/${id}/like`,{})
  }
  MarkUnmark(id:string):Observable<putBookmarkResponse> {
    return this.httpClient.put<putBookmarkResponse>(environment.baseUrl+`/posts/${id}/bookmark`,{})
  }
  getBookmarks(page:number, limit:number):Observable<getBookMarksResponse| any> {
    return this.httpClient.get<getBookMarksResponse| any>(environment.baseUrl+`/users/bookmarks?page=${page}&limit=${limit}`)
  }
  sharePost(id:string,body:string):Observable<SharedResponse> {
    let data ;
    if(body){
      data = {body}
    }else{
      data = {}
    }
    return this.httpClient.post<SharedResponse>(environment.baseUrl+`/posts/${id}/share`,data)
  }
}
