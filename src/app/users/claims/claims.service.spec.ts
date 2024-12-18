import { describe } from 'node:test';
import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from '../../../db';
import { UserClaimsService } from './claims.service';

describe('UserClaimsService', () => {
  const userClaimsService = new UserClaimsService(drizzle('mock', { schema }));

  it('countClaimsQuery should generate the right query', function () {
    expect(
      userClaimsService['countClaimsQuery']('1').toSQL(),
    ).toMatchSnapshot();
  });

  it('listClaimsQuery should generate the right query', function () {
    expect(
      userClaimsService['listClaimsQuery']('1', 1, 10).toSQL(),
    ).toMatchSnapshot();
  });

  it('createClaimsQuery should generate the right query', function () {
    expect(
      userClaimsService['createClaimsQuery']([
        {
          userId: 'uuid',
          title: 'title',
          description: 'description',
          value: 1,
        },
      ]).toSQL(),
    ).toMatchSnapshot();
  });
});
