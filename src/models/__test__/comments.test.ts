// Test Post model with Mockingoose
const mockingoose = require('mockingoose');
const controller = require('../comments');

import { db } from '..';
const Comment = db.comments;

let now: Date;

beforeEach(() => {
    now = new Date();
});


describe('test User model', () => {
    it('should return the doc with findById', () => {

      const _doc = {
        _id: '507f191e810c19729de860ed',
        userId: '507f191e810c19729de860ea',
        content: 'Test comment.',
        parent: '507f191e810c19729de860eb', // Post ID or Answer ID
        updated: now.toISOString(),
        likes: 21
      };
  
      mockingoose(Comment).toReturn(_doc, 'findOne');

  
      return Comment.findById({ _id: '507f191e810c19729de860ed' }).then(doc => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
    });
});
