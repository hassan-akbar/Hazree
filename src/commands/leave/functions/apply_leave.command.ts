import { UserCommand } from "@app/core";
import {
  UserDocument,
  UserModel,
  LeavesDocument,
  LeavesModel,
} from "../../../database/models";
import { chatPostMarkdown, userInfo } from "../../../slack/api";
import { profile } from "console";

export async function ApplyLeave(
  com: UserCommand,
  user: UserDocument
): Promise<void> {
  console.log(com);
  if (!user) {
    await chatPostMarkdown(
      com.userId,
      ">Please register your self before applying for leaves using the `register` command :robot_face:"
    );
  } else {
    const user_params = com.parameters;
    const applied_date: string = com.parameters[1];

    const leave_duration: string = com.parameters[2];
    const userData = await userInfo(com.userId);
    console.log(applied_date);
    console.log(leave_duration);

    const applied_date_regex = /\b[1-3][0-9]-[1-2]?[1-9]\b/g;
    const applied_duration_regex = /\b[1-2]?[1-9]\b/g;
    if (applied_date_regex.test(applied_date) == false) {
      await chatPostMarkdown(
        com.userId,
        ">Please enter a valid date in the following format `'day-month' i.e 12-1` :robot_face:"
      );
    } else {
      if (applied_duration_regex.test(leave_duration) == false) {
        await chatPostMarkdown(
          com.userId,
          ">Please enter a valid duration time in the following formate `number of days i.e 10,15 etc.` :robot_face:"
        );
      } else {
        const doc = new LeavesModel({
          user_id: com.userId,
          team_id: com.teamId,
          user_name: userData.data.user.name,
          applied_date: applied_date,
          applied_duration: leave_duration,
          status: "Pending",
        });
        await doc.save();
        await chatPostMarkdown(
          com.userId,
          ">Your application has successfuly been sumbitted to check your status use the `check_status' command :tada:"
        );
      }
    }
  }
}
