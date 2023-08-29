import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload.component';
import { AudioComponent } from './components/audio.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const appRoutes:Routes=[
  {path:'',component:UploadComponent},
  {path:'audio',component:AudioComponent}
  // {path:'audio/:id',component:AudioComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    AudioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,{ useHash: true })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
