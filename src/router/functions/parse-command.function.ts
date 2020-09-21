import { struct } from 'superstruct';
import { UserCommand } from '@app/core';

const validate = struct({
  token: 'string',
  team_id: 'string',
  team_domain: 'string',
  channel_id: 'string',
  channel_name: 'string',
  user_id: 'string',
  user_name: 'string',
  command: 'string',
  text: 'string',
  response_url: 'string',
  trigger_id: 'string'
});

export function parseCommand({ body }: { body: any}): UserCommand {
  validate(body);
  const [command, ...parameters] = body.text.split(' ');
  return ({
    teamId: body.team_id,
    userId: body.user_id,
    channelId: body.channel_id,
    command,
    parameters
  });
}
