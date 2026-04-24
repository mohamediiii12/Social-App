
import { LoginBody, LoginResponse, LoginUser } from './../../models/login/login.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RegisterBody, RegisterResponse } from '../../models/register/register.interface';
import { ChangePassResponse, passBody } from '../../models/change-pass.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
 
  signUp(data:RegisterBody):Observable<RegisterResponse>{
      return this.httpClient.post<RegisterResponse>(environment.baseUrl+'/users/signup',data)
}
  signIn(data:LoginBody):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(environment.baseUrl+'/users/signin',data)
}
changePass(data: passBody):Observable<ChangePassResponse>{
    return this.httpClient.patch<ChangePassResponse>(environment.baseUrl+'/users/change-password',data)
}
getuserinfo():LoginUser{
    const user :LoginUser =JSON.parse(localStorage.getItem('user')!)
    return user
    }
}