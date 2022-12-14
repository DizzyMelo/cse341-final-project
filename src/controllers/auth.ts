import {Request, Response, NextFunction} from 'express';
import appConfig from '../config/app';
import fetch from 'node-fetch';

const AuthController = {
    login: (request: Request, response: Response) => {
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

    logout: async (request: Request, response: Response) => {
      // #swagger.tags = ['authorization']
      const logoutUrl = `${
        appConfig.authorizationHost
      }/v2/logout?client_id=${
        appConfig.clientId
      }&returnTo=${appConfig.baseUrl}`;
      
      response.redirect(logoutUrl);
    },
  
    callback: async (request: Request, response: Response, next: NextFunction) => {
      // #swagger.tags = ['authorization']
      
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
      
      next();
    },
  };
  
  module.exports = AuthController;