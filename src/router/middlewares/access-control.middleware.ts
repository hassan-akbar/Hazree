import { Request, Response } from 'express';
import { AclList } from '../types';
import { UserModel } from '../../database';
import { chatPostMarkdown } from '../../slack/api';
import { randomResponse } from '../../bot-ai';

export function accessControl(aclist: AclList) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      res.send('ok'); // responding early as slack only gives 3 seconds before it retries
      const command = res.locals.slack_command;
      const uuid = `${command.teamId}-${command.userId}`;
      const user = await UserModel.findOne({
        _id: uuid
      });
      if (!user && command.command !== 'register') {
        await chatPostMarkdown(command.userId, '>You have to register with Hazree first');
        return;
      }
      const role = user?.role ?? 'any';
      const route = aclist[command.command];
      if (!route) {
        await randomResponse(command, user);
        return;
      }
      if (!route.allowed.includes(role)) {
        await chatPostMarkdown(command.userId, '>You are not authorised to run this command');
        return;
      }
      route.exec(command, user);
    } catch (e) {
      console.log(e);
    }
  };
}
