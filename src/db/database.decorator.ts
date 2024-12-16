import { Inject } from '@nestjs/common';
import { TEST_CRUD_DB } from './database.consts';

const InjectDatabase = () => Inject(TEST_CRUD_DB);

export { InjectDatabase };
