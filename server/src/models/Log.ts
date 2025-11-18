import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  message: string;
  stack?: string;
  route?: string;
  createdAt: Date;
}

const LogSchema: Schema = new Schema({
  message: String,
  stack: String,
  route: String
}, { timestamps: true });

export default mongoose.model<ILog>('Log', LogSchema);
