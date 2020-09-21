import * as moment from "moment-timezone";
import { UserCommand } from "@app/core";
import { UserDocument, AttendanceModel } from "../../database/models";
import {
  chatPostMarkdown,
  all_reminders,
  reminder_remove,
} from "../../slack/api";
import { AxiosPromise } from "axios";

export async function back(
  com: UserCommand,
  user: UserDocument
): Promise<void> {
  const timestamp = moment().tz(user.tz);
  const date = timestamp
    .clone()
    .startOf("day")
    .unix();
  const query = {
    team_id: com.teamId,
    user_id: com.userId,
    date,
  };
  const attendance =
    (await AttendanceModel.findOne(query)) ??
    new AttendanceModel({ ...query, sessions: [] });
  const pendingSession = attendance.sessions.find((s) => s.out_stamp === 0);
  if (!pendingSession) {
    attendance.sessions.push({
      in_stamp: timestamp.unix(),
      out_stamp: 0,
      comment: "",
      ses_type: "work",
    });
    await attendance.save();
    const x = await all_reminders();
    console.log("********************************************\n\n\n");

    console.log(x.data);
    let y = [];

    y = x.data.reminders;
    y.forEach(async (element: any) => {
      if (
        element.text == "Reminder : You're break period has ended :robot_face:"
      ) {
        console.log(element.id.toString());
        const l = await reminder_remove(element.id.toString());
        console.log(l.data);
      }
    });
    console.log("*******************************************\n\n");
    await chatPostMarkdown(com.userId, ">Welcome back :tada:");
    return;
  }

  await chatPostMarkdown(
    com.userId,
    ">You are already punched `in` :robot_face:"
  );
}
