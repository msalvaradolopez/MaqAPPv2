import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatObrasComponent } from './cat-obras/cat-obras.component';
import { CatObrasDetComponent } from './cat-obras-det/cat-obras-det.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatObrasComponent,
    CatObrasDetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
