import { Controller, Req } from '@nestjs/common';
import { TsRestException, tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { usersContract } from './users.contract';
import { UsersService } from './users.service';
import { buildPaginationResponse } from '../utils/pagination.utils';

@Controller()
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TsRestHandler(usersContract.getUser)
  getUser() {
    return tsRestHandler(usersContract.getUser, async ({ params: { id } }) => {
      const user = await this.usersService.getUserByIdWithClaimsTotal(id);
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
  listUsers(@Req() request: Request) {
    return tsRestHandler(
      usersContract.listUsers,
      async ({ query: { page, pageSize } }) => {
        const { users, total } = await this.usersService.listUsers(
          page,
          pageSize,
        );
        return {
          status: 200,
          body: {
            users,
            pagination: buildPaginationResponse(request, {
              page,
              pageSize,
              total,
            }),
          },
        };
      },
    );
  }

  @TsRestHandler(usersContract.createUser)
  createUser() {
    return tsRestHandler(usersContract.createUser, async ({ body }) => {
      const user = await this.usersService.createUser(body);
      if (!user) {
        throw new TsRestException(usersContract.createUser, {
          status: 409,
          body: {
            code: 'USER_ALREADY_EXISTS',
            message: 'User already exists',
          },
        });
      }
      return {
        status: 201,
        body: user,
      };
    });
  }
}

export { UsersController };
