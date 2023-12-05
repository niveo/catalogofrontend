import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HomeLogoButtonComponenet } from '../home-logo-button/home-logo.button.component';
import { NavBarProfileComponent } from './nav-bar-profile/nav-bar-profile.component';

@Component({
  selector: 'app-nav-bar-component',
  templateUrl: './nav-bar.component.html',
  standalone: true,
  imports: [
    NavBarProfileComponent,

    NzButtonModule,
    CommonModule,
  ],
})
export class NavBarComponent {
  constructor(public auth: AuthService) {}

  logIn() {
    this.auth.loginWithRedirect();
  }
}
