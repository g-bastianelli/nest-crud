import { Controller } from '@nestjs/common';
import { TsRestException, tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { usersContract } from './users.contract';
import { DatabaseType, InjectDatabase } from 'src/db';

@Controller()
class UsersController {
  constructor(@InjectDatabase() private readonly db: DatabaseType) {}

  @TsRestHandler(usersContract.getUser)
  getUser() {
    return tsRestHandler(usersContract.getUser, async ({ params: { id } }) => {
      const user = await this.db.query.users.findFirst({
        where: (useer, { eq }) => eq(useer.id, id),
      });
      if (!user) {
        throw new TsRestException(usersContract.createUser, {
          status: 404,
          body: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
          },
        });
      }
      return {
        status: 200,
        body: user,
      };
    });
  }

  @TsRestHandler(usersContract.listUsers)
  listUsers() {
    return tsRestHandler(usersContract.listUsers, async () => {
      const users = await this.db.query.users.findMany();
      return {
        status: 200,
        body: users,
      };
    });
  }
}

export { UsersController };
