import { getMockRes } from '@jest-mock/express'
import { ObjectId } from 'mongodb';
import { validId} from '../utilities'

const { res, next, mockClear } = getMockRes();
let id: ObjectId;

beforeEach(() => {
    mockClear();
    id = new ObjectId();
})

test('Valid ID utility - negative', () => {
    expect(validId('123abc', 'Parent', res)).toBe(false);
    expect(validId('6381f0f231545a60a133008', 'Post', res)).toBe(false);
    expect(validId(id.toString() + 'a', 'Parent', res)).toBe(false);
});

test('Valid ID utility - positive', () => {
    expect(validId('6381f0f231545a60a133008c', 'Parent', res)).toBe(true);
    expect(validId(id.toString(), 'User', res)).toBe(true);
});
