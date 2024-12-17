import { initContract } from '@ts-rest/core';
import { usersContract } from './users/users.contract';
import { userClaimsContract } from './users/claims/claims.contract';

const c = initContract();
const mainContract = c.router({
  users: usersContract,
  userClaims: userClaimsContract,
});

export { mainContract };
