export function LeaveStatusTemplate({
  Applied_time = 0,
  leave_duration = 0,
  status = "pending",
  comments = "",
  reason = "",
}): Array<any> {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Applied Date* : ${Applied_time}\n*Leave Duration* : ${leave_duration}\n*Status* : ${status}\n *Reason* : ${reason}\n*Comments* : ${comments}`,
      },
    },
  ];
}
