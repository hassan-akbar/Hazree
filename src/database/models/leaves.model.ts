import { Schema, Document, Model, model } from "mongoose";

export type LeavesDocument = Document & {
  team_id: string;
  user_id: string;
  app_date: number;
  total_days: number;
  status: string;
  comments: string;
  reason: string;
};

const schema: Schema<LeavesDocument> = new Schema({
  team_id: { type: String, required: true },
  user_id: { type: String, required: true },
  user_name: { type: String, required: true },
  applied_date: { type: String, required: true },
  applied_duration: { type: String, required: true },
  status: { type: String, required: true },
  comments: { type: String },
  reason: { type: String },
});

export const LeavesModel: Model<LeavesDocument> = model("Leaves", schema);
