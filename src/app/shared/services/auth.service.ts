import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable,of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
//import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$:Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route:ActivatedRoute,
    private userservice:UserService)
  { 
    this.user$=afAuth.authState;
  } 

  login()
  {
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

   // this.afAuth.signInWithPopup(new auth.GithubAuthProvider());

   this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout()
  {
  this.afAuth.signOut();
  } 

  get appUser$():Observable<AppUser>{
    
   return this.user$
        .pipe(
              switchMap(user => 
                //  this.userservice.get(user.uid)
                {
                if(user) return this.userservice.get(user.uid);

                return of(null);
                  
              }));

 
  }
}