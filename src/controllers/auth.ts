import express from 'express';
import appConfig from '../config/app';

const AuthController = {
    login: (request: express.Request, response: express.Response) => {
      // #swagger.tags = ['authorization']
      
      const authorizationURL = `${
        appConfig.authorizationHost
      }/authorize?response_type=code&client_id=${
          appConfig.clientId
        }&redirect_uri=${
            encodeURIComponent(appConfig.redirectUrl
              )}&scope=openid%20profile%20email`;

      response.redirect(authorizationURL);
      
    },

    logout: (request: express.Request, response: express.Response) => {
      // #swagger.tags = ['authorization']
    },
  
    callback: async (request: express.Request, response: express.Response, next: any) => {
      // #swagger.tags = ['authorization']
      
      console.log(appConfig.authorizationHost);
      console.log(appConfig.clientId);
      console.log(appConfig.clientSecret);
      console.log(appConfig.redirectUrl);
      const res = await fetch(`${appConfig.authorizationHost}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: appConfig.clientId,
          client_secret: appConfig.clientSecret,
          redirect_uri: appConfig.redirectUrl,
          scope: 'openid profile email',
          code: request.query.code as string,
        }),
      });
    
      const jsonResponse = await res.json();
      response.send(jsonResponse.access_token);
    },
  };
  
  module.exports = AuthController;