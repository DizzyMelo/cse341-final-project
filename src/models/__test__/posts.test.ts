// Test Post model with Mockingoose
const mockingoose = require('mockingoose');
const controller = require('../posts');

import { db } from '..';
const Post = db.posts;

let now: Date;

beforeEach(() => {
    now = new Date();
});


describe('test User model', () => {
    it('should return the doc with findById', () => {

      const _doc = {
        _id: '507f191e810c19729de860eb',
        userId: '507f191e810c19729de860ea',
        title: 'Test Post',
        question: 'Test question?',
        updated: now.toISOString(),
        likes: 42
      };
  
      mockingoose(Post).toReturn(_doc, 'findOne');

  
      return Post.findById({ _id: '507f191e810c19729de860eb' }).then(doc => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
    });
});
