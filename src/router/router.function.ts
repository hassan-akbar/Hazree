import * as express from 'express';
import { Router } from 'express';
import { AclList } from './types';
import { accessControl } from './middlewares/access-control.middleware';
import { handleChallange } from './middlewares/handle-challange.middleware';
import { processMention } from './middlewares/process-mention.middleware';
import { processSlashCommand } from './middlewares/process-slash-command.middleware';
import { pong } from './functions/pong.function';

export function router(routes: AclList): Router {
  const expRouter = express.Router();
  const acl = accessControl(routes);
  expRouter.get('/ping', pong);
  expRouter.post('/mention', handleChallange, processMention, acl);
  expRouter.post('/slashcommand', handleChallange, processSlashCommand, acl);
  return expRouter;
}
