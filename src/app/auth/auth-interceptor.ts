import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtService } from '../core';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.jwtService.getToken();
    const authReq = req.clone({
      setHeaders: {
        withCredentials: 'true',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next.handle(authReq);
  }
}
