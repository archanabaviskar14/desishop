import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="Desi Shop";
  
constructor(private auth:AuthService,router:Router,private userservice:UserService)
{  
  auth.user$.subscribe(user=>
    {
      if(!user) return;
      userservice.save(user); //save user in firedatabase

      let returnUrl=localStorage.getItem('returnUrl');
      if(!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
    }
}


