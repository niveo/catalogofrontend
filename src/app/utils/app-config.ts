import { InjectionToken } from '@angular/core';

export interface IConfigToken {
  production: boolean;
  apiUri: string;
}
export const APP_CONFIG = new InjectionToken<IConfigToken>(
  'Application config',
);
