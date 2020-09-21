import * as moment from 'moment-timezone';
import { UserCommand } from '@app/core';
import { UserDocument, AttendanceModel } from '../../database/models';
import { chatPostMessage } from '../../slack/api';
import { punchInMessage, markDownMessage } from '../../slack/templates';

export async function punchIn(com: UserCommand, user: UserDocument): Promise<void> {
  const timestamp = moment().tz(user.tz);
  const date = timestamp.clone().startOf('day').unix();
  const query = {
    team_id: com.teamId,
    user_id: com.userId,
    date
  };
  const attendance = await AttendanceModel.findOne(query) ?? new AttendanceModel({ ...query, sessions: [] });
  const pendingSession = attendance.sessions.find(s => s.out_stamp === 0);
  if (!pendingSession) {
    attendance.sessions.push({
      in_stamp: timestamp.unix(),
      out_stamp: 0,
      comment: '',
      ses_type: 'work'
    });
    await attendance.save();
    await chatPostMessage(com.userId, punchInMessage());
    return;
  }
  await chatPostMessage(com.userId,
    markDownMessage('>You are already punched `in` :robot_face:'));
}
