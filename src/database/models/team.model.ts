import {
  Schema, Document, Model, model
} from 'mongoose';

export type TeamDocument = Document & {
  team_id: string;
  channels: Array<any>;
  settings: Map<string, string>;
}

const schema: Schema<TeamDocument> = new Schema({
  team_id: { type: String, required: true },
  user_id: { type: String, required: true },
  date: { type: Number, required: true },
  sessions: [{
    in_stamp: Number,
    out_stamp: Number,
    comment: String,
    ses_type: String
  }]
});

export const TeamModel: Model<TeamDocument> = model('Team', schema);
