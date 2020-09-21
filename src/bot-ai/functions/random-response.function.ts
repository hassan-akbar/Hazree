import { UserCommand, User } from '@app/core';
import { chatPostMarkdown } from '../../slack/api';


const qoutes = [
  'One day i will understand you, and then i will hunt you down',
  'bas kar do',
  'now that not very smart ',
  'i guess you are out of funny things to say',
  'dont know',
  'sorry say again',
  'better luck next time',
  'how very sad ',
  'soo true',
  'sorry for that',
  'meray pass tum ho :heart: ',
  'wah gee wah',
  'phir kabhi',
  'dosari command try karain'
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function randomResponse(command: UserCommand, user: User | null): Promise<void> {
  const index = Math.floor(Math.random() * qoutes.length);
  await chatPostMarkdown(command.channelId, qoutes[index]);
}
