import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
  if(token){
    if(!req.url.includes('/login') || !req.url.includes('/register')) {
    req= req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
  }
  return next(req);
};
