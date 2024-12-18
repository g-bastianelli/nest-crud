import { initContract } from '@ts-rest/core';
import {
  paginationQuerySchema,
  paginationResponseSchema,
} from '../../utils/pagination.utils';
import { z } from 'zod';

const c = initContract();

const createClaimsRequestBodySchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
    value: z.number(),
  }),
);

type CreateClaimsRequestBody = z.infer<typeof createClaimsRequestBodySchema>;

const userClaimsContract = c.router({
  listUserClaims: {
    method: 'GET',
    path: '/users/:userId/claims',
    pathParams: z.object({
      userId: z.string().uuid(),
    }),
    query: paginationQuerySchema,
    responses: {
      200: z.object({
        claims: z.array(
          z.object({
            id: z.string().uuid(),
            title: z.string(),
            description: z.string(),
            value: z.number(),
          }),
        ),
        pagination: paginationResponseSchema,
      }),
    },
    summary: "List user's claims",
  },
  batchCreateClaims: {
    method: 'POST',
    path: '/users/:userId/claims/batch',
    pathParams: z.object({
      userId: z.string().uuid(),
    }),
    body: createClaimsRequestBodySchema,
    responses: {
      201: z.object({
        claims: z.array(
          z.object({
            id: z.string().uuid(),
          }),
        ),
      }),
    },
    summary: 'Batch create claims for a user',
  },
  deleteUserClaim: {
    method: 'DELETE',
    path: '/users/:userId/claims/:claimId',
    pathParams: z.object({
      userId: z.string().uuid(),
      claimId: z.string().uuid(),
    }),
    responses: {
      204: z.void(),
    },
    summary: 'Delete a claim for a user',
  },
});

export { userClaimsContract, CreateClaimsRequestBody };
