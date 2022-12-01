// Test User model with Mockingoose
const mockingoose = require('mockingoose');
const controller = require('../users');

import { db } from '..';
const User = db.users;

let now: Date;

beforeEach(() => {
    now = new Date();
});


describe('test User model', () => {
    it('should return the doc with findById', () => {

      const _doc = {
        _id: '507f191e810c19729de860ea',
        lastName: 'Balasubramanian',
        firstName: 'Nandakumar',
        login: 'nbalasu',
        email: 'nkumarb@email.com.in',
        organization: 'Wipro',
        permissions: [ 'read-write' ],
        updated: now.toISOString(),
        likes: 23
      };
  
      mockingoose(User).toReturn(_doc, 'findOne');

  
      return User.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
      });
    });
});
