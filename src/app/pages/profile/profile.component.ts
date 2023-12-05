import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileJson?: string;

  constructor(public readonly auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }
}
