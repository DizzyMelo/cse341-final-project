import { getMockRes } from '@jest-mock/express'
import { ObjectId } from 'mongodb';
import { validId } from '../utilities'

const { res, next, mockClear } = getMockRes();
let id: ObjectId;

beforeEach(() => {
    mockClear();
    id = new ObjectId();
});


describe('Common utility functions', () => {
    describe('validId() function - check for valid MongoDb ObjectId', () => {
        test('validId() - negative tests', () => {
            expect(validId('123abc', 'Parent', res)).toBe(false);
            expect(validId('6381f0f231545a60a133008', 'Post', res)).toBe(false);
            expect(validId(id.toString() + 'a', 'Parent', res)).toBe(false);
        });

        test('validId() - positive tests', () => {
            expect(validId('6381f0f231545a60a133008c', 'Parent', res)).toBe(true);
            expect(validId(id.toString(), 'User', res)).toBe(true);
        });
    });
    // Add tests for any additional utility functions here.
});
