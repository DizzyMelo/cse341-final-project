import * as mongoose from "mongoose";
// Model definitions:
import User from './users';
import Question from './questions';
import Answer from './answers';
import Comment from './comments';
import Post from './posts';

export const db = {
    mongoose: mongoose,
    url: process.env.DB_CONNECT,
    // Models:
    users: User,
    questions: Question,
    answers: Answer,
    comments: Comment,
    posts: Post
};
