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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidenavModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
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
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
