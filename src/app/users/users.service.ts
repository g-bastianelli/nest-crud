import { Injectable } from '@nestjs/common';
import { DatabaseType, InjectDatabase, schema } from '../../db';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@InjectDatabase() private readonly db: DatabaseType) {}

  async getUserByIdWithClaimsTotal(userId: string) {
    const [user] = await this.getUserWithClaimsTotalQuery(userId);
    return user ?? null;
  }

  async listUsers(page: number, pageSize: number) {
    const [{ count }] = await this.countUsersQuery();

    const users = await this.listUsersQuery(page, pageSize);

    return { users, total: count };
  }

  private countUsersQuery() {
    return this.db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(schema.users);
  }

  private getUserWithClaimsTotalQuery(userId: string) {
    return this.db
      .select({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        claimsTotal: sql<number>`sum(${schema.claims.value})`,
      })
      .from(schema.users)
      .innerJoin(schema.claims, eq(schema.claims.userId, schema.users.id))
      .where(eq(schema.users.id, userId))
      .groupBy(schema.users.id)
      .limit(1);
  }

  private listUsersQuery(page: number, pageSize: number) {
    return this.db.query.users.findMany({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (user, { asc }) => asc(user.name),
    });
  }
}
