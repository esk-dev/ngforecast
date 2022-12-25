import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';
import { JwtService, UserStorageService } from '../../_services';
import {
  catchError,
  map,
  retry,
  BehaviorSubject,
  take,
  throwError,
  switchMap,
  Observable,
} from 'rxjs';
import { AuthResponse } from 'src/app/auth/models/authresponse.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class jwtTokenInterceptor implements HttpInterceptor {

    constructor(private jwtTokenService: JwtService, private http: HttpClient) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler) {
    
        return next.handle(this.authReq(request));
    
    }

    private authReq(request: HttpRequest<any>) {
        // TODO Убрать id из хедеров 
        const accesstoken = this.jwtTokenService.getToken();
    
        const id = localStorage.getItem('userId');
        
        if (accessToken) {

            return request.clone({
            
                setHeaders: {
            
                    withCredentials: 'true',
            
                    Authorization: `Bearer ${accesstoken}`,
            
                    id: `${id}`,
            
                },
            
            });
        } else {
            return request({
            
                setHeaders: {
                
                    withCredentials: 'true',
                
                    id: `${id}`,
                
                },
                
            });
        }
    }   
}