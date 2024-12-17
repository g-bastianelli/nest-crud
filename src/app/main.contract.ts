import { initContract } from '@ts-rest/core';
import { usersContract } from './users/users.contract';

const c = initContract();
const mainContract = c.router({
  users: usersContract,
});

export { mainContract };
