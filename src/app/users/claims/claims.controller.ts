import { Controller, Req } from '@nestjs/common';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { userClaimsContract } from './claims.contract';
import { UserClaimsService } from './claims.service';
import { buildPaginationResponse } from '../../utils/pagination.utils';

@Controller()
class UserClaimsController {
  constructor(private readonly userClaimsService: UserClaimsService) {}

  @TsRestHandler(userClaimsContract.listUserClaims)
  listUserClaims(@Req() request: Request) {
    return tsRestHandler(
      userClaimsContract.listUserClaims,
      async ({ params: { userId }, query: { page, pageSize } }) => {
        const { claims, total } = await this.userClaimsService.listClaims(
          userId,
          page,
          pageSize,
        );
        return {
          status: 200,
          body: {
            claims,
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

  @TsRestHandler(userClaimsContract.batchCreateClaims)
  batchCreateClaims() {
    return tsRestHandler(
      userClaimsContract.batchCreateClaims,
      async ({ params: { userId }, body }) => {
        const claims = await this.userClaimsService.createClaims(userId, body);
        if (!claims) {
          return {
            status: 400,
            body: {
              message: 'User not found',
            },
          };
        }

        return {
          status: 200,
          body: claims,
        };
      },
    );
  }
}

export { UserClaimsController };
