import { describe } from 'node:test';
import { UsersService } from './users.service';
import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from '@db';

describe('UsersService', () => {
  const usersService = new UsersService(drizzle('mock', { schema }));

  it('listUsersQuery should generate the right query', function () {
    expect(usersService['listUsersQuery'](22, 1000).toSQL()).toMatchSnapshot();
  });

  it('getUserWithClaimsTotalQuery should generate the right query ', function () {
    expect(
      usersService['getUserWithClaimsTotalQuery']('1').toSQL(),
    ).toMatchSnapshot();
  });

  it('countUsersQuery should generate the right query', function () {
    expect(usersService['countUsersQuery']().toSQL()).toMatchSnapshot();
  });
});
