import {
  Schema, Document, Model, model
} from 'mongoose';

export type EventDocument = Document & {
  uuid: string;
  event_type: string;
  timestamps: {
    start: number;
    stop: number;
  };
  state: number;
  response: Array<any>;
}

const schema: Schema<EventDocument> = new Schema({
  uuid: String,
  event_type: String,
  timestamps: {
    start: Number,
    stop: Number
  },
  state: Number,
  response: [{}]
});

export const EventModel: Model<EventDocument> = model('Event', schema);
