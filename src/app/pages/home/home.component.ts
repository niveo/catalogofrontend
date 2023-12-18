import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home-component',
  template: ``,
})
export class HomeComponent {
  constructor(public readonly auth: AuthService) {}
}
