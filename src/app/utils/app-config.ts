import { InjectionToken } from '@angular/core';

export interface IConfigToken {
  production: boolean;
  apiUri: string;

  imageKitPublicKey: string;
  imageKitUrlEndPoint: string;
  imageKitAuthenticationEndpoint: string;

  imageKitUrlEndPointCatalogo: string;
}
export const APP_CONFIG = new InjectionToken<IConfigToken>(
  'Application config'
);
