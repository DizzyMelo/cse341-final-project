"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController = {
    login: (request, response) => {
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
    logout: (request, response) => {
        // #swagger.tags = ['authorization']
    },
    callback: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        // #swagger.tags = ['authorization']
        try {
        }
        catch (error) {
            next(error);
        }
    }),
};
module.exports = AuthController;
