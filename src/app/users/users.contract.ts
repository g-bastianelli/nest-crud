import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import {
  paginationQuerySchema,
  paginationResponseSchema,
} from '../utils/pagination.utils';

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  claimsTotal: z.number(),
});

const c = initContract();

const usersContract = c.router({
  createUser: {
    method: 'POST',
    path: '/users',
    responses: {
      201: z.object({
        id: z.string().uuid(),
      }),
    },
    body: z.object({
      name: z.string().min(10),
      email: z.string().email(),
    }),
    summary: 'Create a user',
  },
  getUser: {
    method: 'GET',
    path: `/users/:userId`,
    pathParams: z.object({
      userId: z.string().uuid(),
    }),
    responses: {
      200: userSchema.nullable(),
    },
    summary: 'Get a user by id',
  },
  listUsers: {
    method: 'GET',
    path: '/users',
    query: paginationQuerySchema,
    responses: {
      200: z.object({
        users: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
            email: z.string().email(),
          }),
        ),
        pagination: paginationResponseSchema,
      }),
    },
    summary: 'List all users',
  },
});

export { usersContract };
