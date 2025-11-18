import mongoose, { Schema, Document } from 'mongoose';

export interface ITodo extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<ITodo>('Todo', TodoSchema);
