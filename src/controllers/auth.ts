import express from 'express';

const AuthController = {
    login: (request: express.Request, response: express.Response) => {
      // #swagger.tags = ['authorization']
      /*
      const authorizationURL = `${
          process.env.AUTHORIZATION_HOST
      }/authorize?response_type=code&client_id=${
          process.env.CLIENT_ID
      }&redirect_uri=${encodeURIComponent(
          process.env.REDIRECT_URL
      )}&scope=openid%20profile%20email`;
  
      response.redirect(authorizationURL);
      */
    },

    logout: (request: express.Request, response: express.Response) => {
      // #swagger.tags = ['authorization']
    },
  
    callback: async (request: express.Request, response: express.Response, next: any) => {
      // #swagger.tags = ['authorization']
      try {
      } catch (error) {
        next(error);
      }
    },
  };
  
  module.exports = AuthController;