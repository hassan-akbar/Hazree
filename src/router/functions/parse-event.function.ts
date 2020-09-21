import { struct } from 'superstruct';
import { UserCommand } from '@app/core';

const validate = struct({
  token: 'string',
  team_id: 'string',
  api_app_id: 'string',
  event: {
    client_msg_id: 'string',
    type: 'string',
    text: 'string',
    user: 'string',
    ts: 'string',
    team: 'string',
    blocks: ['object'],
    channel: 'string',
    event_ts: 'string',
    channel_type: 'string?'
  },
  type: 'string',
  event_id: 'string',
  event_time: 'number',
  authed_users: ['string']
});

export function parseEvent({ body }: { body: any}): UserCommand {
  validate(body);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [botuuid, command, ...parameters] = body.event.text.split(' ');
  return ({
    teamId: body.team_id,
    userId: body.event.user,
    channelId: body.event.channel,
    command: command ? command.toLowerCase() : null,
    parameters
  });
}
