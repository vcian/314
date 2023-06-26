import { Router } from 'express';
import system from './routes/system';
import workspace from './routes/workspace';
import users from './routes/users';
// guaranteed to get dependencies
export default () => {
  const app = Router();
  workspace(app);
  system(app);
  users(app);
  return app;
};
