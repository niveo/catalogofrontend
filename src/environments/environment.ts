import config from '../../auth_config.json';

const {
  domain,
  clientId,
  authorizationParams: { audience },
  apiUri,
  errorPath,
  imageKitPublicKey,
  imageKitUrlEndPoint,
  imageKitAuthenticationEndpoint,
  imageKitUrlEndPointCatalogo,
  imageKitUrlEndPointCatalogos,
} = config as any;
 

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? { audience } : null),
      redirect_uri: window.location.origin,
    },
    errorPath,
  },
  apiUri: apiUri,
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
  imageKitPublicKey: imageKitPublicKey,
  imageKitUrlEndPoint: imageKitUrlEndPoint,
  imageKitUrlEndPointCatalogo: imageKitUrlEndPointCatalogo,
  imageKitUrlEndPointCatalogos: imageKitUrlEndPointCatalogos,
  imageKitAuthenticationEndpoint: imageKitAuthenticationEndpoint,
};
