import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import Cookies from 'js-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInceptor } from './shared/interceptors/http-interceptor';
import { SidenavModule } from './shared/sidenav/sidenav.module';
import { COOKIES } from './shared/tokens/cookies.token';
import { LOCAL_STORAGE } from './shared/tokens/localStorage.token';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SidenavModule, HttpClientModule],
  providers: [
    {
      provide: COOKIES,
      useValue: Cookies,
    },
    {
      provide: LOCAL_STORAGE,
      useValue: window.localStorage,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
