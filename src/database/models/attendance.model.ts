import {
  Schema, Document, Model, model
} from 'mongoose';

export type RegisterDocument = Document & {
  team_id: string;
  user_id: string;
  date: number;
  sessions: Array<any>;
}

const schema: Schema<RegisterDocument> = new Schema({
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

export const AttendanceModel: Model<RegisterDocument> = model('Attendance', schema);
