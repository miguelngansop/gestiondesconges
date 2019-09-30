import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatInputModule, MatButtonModule, MatToolbarModule,
} from '@angular/material';
import {AuthService} from './services/auth.service';
import {LoginComponent} from './login/login.component';



@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatRadioModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatCardModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
    ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
