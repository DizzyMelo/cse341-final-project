import * as mongoose from "mongoose";

import User from './users';

export const db = {
    mongoose: mongoose,
    url: process.env.DB_CONNECT,
    users: User
    // TODO: add more models here
};
