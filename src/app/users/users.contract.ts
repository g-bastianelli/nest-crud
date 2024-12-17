import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { paginationResponseSchema } from '../utils/pagination.utils';

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
    query: z.object({
      page: z.coerce.number().min(1).default(1),
      pageSize: z.coerce.number().min(1).max(100).default(10),
    }),
    responses: {
      200: z.object({
        users: z.array(userSchema),
        pagination: paginationResponseSchema,
      }),
    },
    summary: 'List all users',
  },
});

export { usersContract };
