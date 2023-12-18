import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
 
@Component({
  selector: 'app-home-logo-button',
  template: `
    <div class="home-cursor" (click)="goHome()">
      <fa-icon [icon]="faHome"></fa-icon>
    </div>
  `,
  styleUrl: './home-logo.button.component.scss',
  standalone: true,
  imports: [FontAwesomeModule],
})
export class HomeLogoButtonComponenet {
  faHome = faHome;
  constructor(private readonly router: Router) {}
  goHome() {
    this.router.navigateByUrl('/');
  }
}
