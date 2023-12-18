export const environment = {
  production: true,
  auth: {
    domain: process.env['AUTH_DOMAIN'],
    clientId: process.env['AUTH_CLIEND_ID'],
    authorizationParams: {
      audience: process.env['AUTH_AUDIENCE'],
      redirect_uri: window.location.origin,
    },
    errorPath: process.env['AUTH_ERROR_PATH'],
  },
  apiUri: process.env['API_URI'],
  httpInterceptor: {
    allowedList: [`${process.env['API_URI']}/*`],
  },
  imageKitPublicKey: process.env['IMAGEKIT_PUBLIC_KEY'],
  imageKitUrlEndPoint: process.env['IMAGEKIT_URLENDPOINT'],
  imageKitUrlEndPointCatalogo:
    process.env['IMAGEKIT_URLENDPOINT'] + '/catalogo/',
  imageKitUrlEndPointCatalogos:
    process.env['IMAGEKIT_URLENDPOINT'] + '/catalogo/catalogos/',
  //imageKitAuthenticationEndpoint: imageKitAuthenticationEndpoint,
};
