import { dbConfig } from '../loaders/database';
import { UsersFactory } from './users.model';

// syncing
// dbConfig.sync({}).then(() => { console.log(`Database & tables created!`) });

export const Users = UsersFactory(dbConfig);