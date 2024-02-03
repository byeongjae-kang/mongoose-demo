import { Model, Schema, model } from 'mongoose';

type CategoryType = {
  name: string;
};

type CategoryModel = Model<CategoryType>;

const categorySchema = new Schema<CategoryType, CategoryModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  { versionKey: false }
);

export const Category = model<CategoryType, CategoryModel>('Category', categorySchema);
