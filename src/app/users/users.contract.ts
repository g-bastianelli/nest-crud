import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
});

const c = initContract();

const usersContract = c.router({
  createUser: {
    method: 'POST',
    path: '/users',
    responses: {
      201: userSchema,
    },
    body: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    summary: 'Create a user',
  },
  getUser: {
    method: 'GET',
    path: `/users/:id`,
    pathParams: z.object({
      id: z.string().uuid(),
    }),
    responses: {
      200: userSchema.nullable(),
    },
    summary: 'Get a user by id',
  },
  listUsers: {
    method: 'GET',
    path: '/users',
    responses: {
      200: z.array(userSchema),
    },
    summary: 'List all users',
  },
});

export { usersContract };
