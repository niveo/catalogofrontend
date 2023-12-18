const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules
  const colors = require('colors');
  const appVersion = require('../../package.json').version;
  require('dotenv').config({
    path: 'src/environments/.env',
  });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    auth: {
        domain: '${process.env['AUTH_DOMAIN']}',
        clientId: '${process.env['AUTH_CLIEND_ID']}',
        authorizationParams: {
          audience: '${process.env['AUTH_AUDIENCE']}',
          redirect_uri: window.location.origin,
        },
        errorPath: '${process.env['AUTH_ERROR_PATH']}',
    },
    apiUri: '${process.env['API_URI']}',
    httpInterceptor: { 
    },
    imageKitPublicKey: '${process.env['IMAGEKIT_PUBLIC_KEY']}',
    imageKitUrlEndPoint: '${process.env['IMAGEKIT_URLENDPOINT']}',
    imageKitUrlEndPointCatalogo:
        '${process.env['IMAGEKIT_URLENDPOINT']}' + '/catalogo/',
    imageKitUrlEndPointCatalogos:
        '${process.env['IMAGEKIT_URLENDPOINT']}' + '/catalogo/catalogos/',
        production: true,
    };
  `;
  console.log(
    colors.magenta(
      'The file `environment.ts` will be written with the following content: \n'
    )
  );
  console.log(colors.grey(envConfigFile));
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        colors.magenta(
          `Angular environment.ts file generated correctly at ${targetPath} \n`
        )
      );
    }
  });
};

setEnv();
