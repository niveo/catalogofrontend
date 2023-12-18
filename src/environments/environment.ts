import config from '../../auth_config.json';

export const environment = {
  production: false,
  auth: {
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
      audience: config.authorizationParams.audience,
      redirect_uri: window.location.origin,
    },
    errorPath: config.errorPath,
  },
  apiUri: config.apiUri,
  httpInterceptor: {
    allowedList: [`${config.apiUri}/*`],
  },
  imageKitPublicKey: config.imageKitPublicKey,
  imageKitUrlEndPoint: config.imageKitUrlEndPoint,
  imageKitUrlEndPointCatalogo: config.imageKitUrlEndPointCatalogo,
  imageKitUrlEndPointCatalogos: config.imageKitUrlEndPointCatalogos,
  //imageKitAuthenticationEndpoint: imageKitAuthenticationEndpoint,
};
