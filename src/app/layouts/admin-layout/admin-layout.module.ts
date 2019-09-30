import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../TraitementDesDemandes/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTableModule,
  MatToolbarModule,
  MatNativeDateModule,
  MatButtonModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatRippleModule,
  MatSnackBarModule,
  MatTabsModule,
} from '@angular/material';
import {LoginComponent} from '../../login/login.component';
import {AppModule} from '../../app.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatNativeDateModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTabsModule,
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,

  ],
  entryComponents: []
})

export class AdminLayoutModule {}
