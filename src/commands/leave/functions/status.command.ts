import { UserCommand } from "@app/core";
import {
  UserDocument,
  UserModel,
  LeavesDocument,
  LeavesModel,
} from "../../../database/models";
import { chatPostMarkdown, chatPostMessage } from "../../../slack/api";

import { LeaveStatusTemplate } from "../../../slack/templates/leave.status.template";

import { profile } from "console";
import { lte } from "lodash";
import { leave } from "../leave.command";
import { captureRejectionSymbol } from "events";
import { ApplyLeave } from "./apply_leave.command";

export async function check_status(
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
    const query_parameter: string = com.parameters[1];
    const query = {
      team_id: com.teamId,
      user_id: com.userId,
    };

    const user_query =
      (await LeavesModel.find(query)) ??
      new LeavesModel({ ...query, sessions: [] });

    if (com.parameters[1] == "current") {
      let curr_query: any;
      user_query.forEach((leaves) => {
        if (leaves.status == "Pending") {
          curr_query = leaves;
        }
      });
      await curr_query;
      const query_template = LeaveStatusTemplate({
        Applied_time: curr_query.applied_date,
        leave_duration: curr_query.applied_duration,
        status: curr_query.status,
        comments: curr_query.comments,
      });
      await chatPostMessage(com.userId, query_template);
    } else {
      const Total_leaves: Array<any> = [];
      user_query.forEach((leaves) => {
        let curr_query: any;
        curr_query = leaves;
        const query_template = LeaveStatusTemplate({
          Applied_time: curr_query.applied_date,
          leave_duration: curr_query.applied_duration,
          status: curr_query.status,
          comments: curr_query.comments,
        });

        Array.prototype.push.apply(Total_leaves, query_template);
      });

      await chatPostMessage(com.userId, Total_leaves);
    }
  }
}
