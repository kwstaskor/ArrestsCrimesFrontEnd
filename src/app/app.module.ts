import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/Shared/navbar/navbar.component';
import { ArrestsComponent } from './components/arrests/arrests.component';
import { ErrorComponent } from './components/Shared/error/error.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { SummarizeTextPipe } from './summarize-text.pipe';
import { CrimesComponent } from './Components/crimes/crimes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArrestsComponent,
    ErrorComponent,
    SummarizeTextPipe,
    CrimesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    AuthModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
