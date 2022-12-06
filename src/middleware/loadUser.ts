import { Request, Response, NextFunction } from 'express';
import config from '../config/app';
import User from '../models/users';

interface IAuthResponse {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  updated_at: string;
  nickname: string;
}

export async function loadUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.authorization) {
    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);

    await findOrCreateUser(authZeroUser);
  } else {
    res.sendStatus(403);
    return;
  }
  next();
}

// Helper
async function fetchAuthZeroUser(authorizationValue: string) {
  const response = await fetch(`${config.authorizationHost}/userinfo`, {
    headers: { Authorization: authorizationValue },
  });
  return response.json();
}

async function findOrCreateUser(authZeroJson: IAuthResponse) {
  if (!authZeroJson) return;

  const existingUser = await User.findOne({ identifer: authZeroJson.sub });

  if (existingUser) return existingUser;

  const newUser = await User.create({
    identifier: authZeroJson.sub,
    login: authZeroJson.nickname,
    email: authZeroJson.email,
    firstName: authZeroJson.given_name,
    lastName: authZeroJson.family_name,
    organization: 'not provided',
    updated: authZeroJson.updated_at,
    likes: 0
  });

  return newUser;
}