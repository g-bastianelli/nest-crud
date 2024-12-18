import { Injectable } from '@nestjs/common';
import { eq, InferInsertModel, sql } from 'drizzle-orm';
import { CreateClaimsRequestBody } from './claims.contract';
import { DatabaseType, InjectDatabase, schema } from '../../../db';

@Injectable()
class UserClaimsService {
  constructor(@InjectDatabase() private readonly db: DatabaseType) {}

  async createClaims(userId: string, claimsToCreate: CreateClaimsRequestBody) {
    const user = await this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
    });
    if (!user) {
      return null;
    }

    return this.createClaimsQuery(
      claimsToCreate.map((claim) => ({ ...claim, userId })),
    );
  }

  async listClaims(userId: string, page: number, pageSize: number) {
    const [{ count }] = await this.countClaimsQuery(userId);

    const claims = await this.listClaimsQuery(userId, page, pageSize);

    return { claims, total: count };
  }

  private countClaimsQuery(userId: string) {
    return this.db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(schema.claims)
      .where(eq(schema.claims.userId, userId));
  }

  private createClaimsQuery(claims: InferInsertModel<typeof schema.claims>[]) {
    return this.db.insert(schema.claims).values(claims).returning({
      id: schema.claims.id,
    });
  }

  private listClaimsQuery(userId: string, page: number, pageSize: number) {
    return this.db.query.claims.findMany({
      columns: {
        id: true,
        title: true,
        description: true,
        value: true,
      },
      where: (claim, { eq }) => eq(claim.userId, userId),
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (claim, { desc }) => desc(claim.value),
    });
  }
}

export { UserClaimsService };
