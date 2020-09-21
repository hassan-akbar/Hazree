import { AxiosResponse } from "axios";
import { axiosInstance } from "../functions";
require("dotenv").config();

export async function reminder_info(
  text: string,
  time: any
): Promise<AxiosResponse> {
  return axiosInstance.request({
    method: "post",
    url: "/reminders.add",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_ADMIN_TOKEN}`,
    },
    data: { text, time },
  });
}

export async function all_reminders(): Promise<AxiosResponse> {
  return axiosInstance.request({
    method: "GET",
    url: "reminders.list",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_ADMIN_TOKEN}`,
    },
  });
}

export async function reminder_remove(id: string): Promise<AxiosResponse> {
  return axiosInstance.request({
    method: "post",
    url: "/reminders.complete",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_ADMIN_TOKEN}`,
    },
    data: id,
  });
}
