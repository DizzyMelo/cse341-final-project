// Test Post model with Mockingoose
const mockingoose = require('mockingoose');
const controller = require('../answers');

import { db } from '..';
const Answer = db.answers;

let now: Date;

beforeEach(() => {
    now = new Date();
});


describe('test User model', () => {
    it('should return the doc with findById', () => {

      const _doc = {
        _id: '507f191e810c19729de860ec',
        postId: '507f191e810c19729de860eb',
        userId: '507f191e810c19729de860ea',
        content: 'Test answer.',
        updated: now.toISOString(),
        likes: 21
      };
  
      mockingoose(Answer).toReturn(_doc, 'findOne');

  
      return Answer.findById({ _id: '507f191e810c19729de860ec' }).then(doc => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
    });
});
