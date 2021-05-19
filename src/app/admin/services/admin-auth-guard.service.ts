import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth:AuthService,private userservice:UserService) { }

  canActivate():Observable<boolean>
{
      return this.auth.appUser$
      .pipe(
           map(appUser => appUser.isAdmin)
           )
}
  
  }
    
    
    
  

