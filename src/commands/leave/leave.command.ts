import { UserCommand } from "@app/core";
import { check } from "prettier";
import { UserDocument } from "../../database/models";
import { chatPostMessage } from "../../slack/api";
import { ApplyLeave, check_status } from "./functions/index";

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
export async function leave(
  com: UserCommand,
  user: UserDocument
): Promise<void> {
  const { parameters } = com;
  if (parameters[0] == "apply") {
    await ApplyLeave(com, user);
  } else if (parameters[0] == "status") {
    await check_status(com, user);
  } else {
    await chatPostMessage(com.userId, ["Invalid command :bot_face:"]);
  }
}
