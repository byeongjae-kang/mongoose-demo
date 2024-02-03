import { HydratedDocument, Model, QueryWithHelpers, Schema, Types, model } from 'mongoose';

type TaskType = {
  task: string;
  isCompleted?: boolean;
  createdBy: Types.ObjectId;
  categories: [Types.ObjectId];
};

type TaskQueryWithHelpersType = QueryWithHelpers<
  HydratedDocument<TaskType>[],
  HydratedDocument<TaskType>,
  QueryHelpersType
>;

type QueryHelpersType = {
  populateAll(): Promise<TaskQueryWithHelpersType>;
};

type TaskModelType = Model<TaskType, QueryHelpersType>;

const taskSchema = new Schema<TaskType, TaskModelType, NonNullable<unknown>, QueryHelpersType>(
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
    },
    categories: {
      type: [Schema.ObjectId],
      ref: 'Category'
    }
  },
  {
    timestamps: true,
    versionKey: false,
    query: {
      async populateAll(this: TaskQueryWithHelpersType): Promise<TaskQueryWithHelpersType> {
        return this.populate('createdBy categories');
      }
    }
  }
);

export const Task = model<TaskType, TaskModelType>('Task', taskSchema);
