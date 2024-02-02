import { Model, Schema, Types, model } from 'mongoose';

type TaskType = {
  task: string;
  isCompleted?: boolean;
  createdBy: Types.ObjectId;
};

type TaskModelType = Model<TaskType>;

const taskSchema = new Schema<TaskType, TaskModelType>(
  {
    task: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: Schema.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Task = model<TaskType, TaskModelType>('Task', taskSchema);
