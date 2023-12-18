import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar-profile-component',
  templateUrl: './nav-bar-profile.component.html',
  styleUrl: './nav-bar-profile.component.scss',
  standalone: true,
  imports: [
    NzButtonModule,
    CommonModule,
    NzIconModule,
    NzAvatarModule,
    NzToolTipModule,
    NzPopoverModule,
    NzDividerModule,
    FontAwesomeModule,
  ],
})
export class NavBarProfileComponent {
  visible: boolean = false;
  faSignOut = faSignOut;
  faUser = faUser;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public readonly auth: AuthService,
    private router: Router
  ) {}

  logOut() {
    this.auth.logout({
      logoutParams: { returnTo: this.document.location.origin },
    });
  }

  goProfile() {
    this.visible = false;
    this.router.navigateByUrl('/profile');
  }
}
