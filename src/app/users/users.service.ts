import { Injectable } from '@nestjs/common';
import { eq, InferInsertModel, sql } from 'drizzle-orm';
import { DatabaseType, InjectDatabase, schema } from '../../db';

@Injectable()
export class UsersService {
  constructor(@InjectDatabase() private readonly db: DatabaseType) {}

  async createUser(newUser: InferInsertModel<typeof schema.users>) {
    const [user] = await this.createUsersQuery([newUser]);
    return user;
  }

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

  private createUsersQuery(users: InferInsertModel<typeof schema.users>[]) {
    return this.db
      .insert(schema.users)
      .values(users)
      .onConflictDoNothing({
        target: schema.users.email,
      })
      .returning({
        id: schema.users.id,
      });
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
      .leftJoin(schema.claims, eq(schema.claims.userId, schema.users.id))
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
