import { z } from 'zod';

const paginationResponseSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  nextPage: z.string().nullable(),
});

const paginationQuerySchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
});

function buildPaginationResponse(
  request: Request,
  { page, pageSize, total }: { page: number; pageSize: number; total: number },
): z.infer<typeof paginationResponseSchema> {
  const nextPage =
    page * pageSize < total
      ? `${request.url}?page=${page + 1}&pageSize=${pageSize}`
      : null;

  return { page, pageSize, total, nextPage };
}

export {
  paginationResponseSchema,
  paginationQuerySchema,
  buildPaginationResponse,
};
