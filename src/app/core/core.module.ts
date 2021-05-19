import { NgModule } from '@angular/core';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';



@NgModule({
  declarations: [
    BsNavbarComponent,
    LoginComponent,
   CarouselComponent,
   FooterComponent,
   AboutUsComponent,
   
  ],
  imports: [
    SharedModule,
    NgbModule,
    RouterModule.forChild([])
    

  ],
  exports:[
    BsNavbarComponent,
    NgbModule,
    FooterComponent

  ]
})
export class CoreModule { }
