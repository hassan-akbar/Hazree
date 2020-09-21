import { UserCommand } from "@app/core";
import { UserDocument } from "../../database/models";
import { chatPostMessage } from "../../slack/api";
import { ApplyLeave } from "./functions/index";

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
export async function leave(
  com: UserCommand,
  user: UserDocument
): Promise<void> {
  const { parameters } = com;
  let attendance: Array<any> = [];
  if (parameters[0] == "apply") {
    await ApplyLeave(com, user);
  } else {
    chatPostMessage(com.userId, ["Invalid command :bot_face:"]);
  }
}
