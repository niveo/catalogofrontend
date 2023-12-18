import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { firstValueFrom } from 'rxjs';
import { MS1, MS2 } from '../../contantes/messages';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileJson?: string;

  constructor(
    public readonly auth: AuthService,
    private readonly http: HttpClient,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }

  async importarDadosBasicos() {
    this.http
      .get('/registeredUser', {
        params: {
          user_id: (await firstValueFrom(this.auth.user$)).sub,
        },
      })
      .subscribe({
        next: () => {
          this.notification.info('', MS1);
        },
        error: (error) => {
          console.error(error);
          this.notification.error('', MS2);
        },
      });
  }
}
