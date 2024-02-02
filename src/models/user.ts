import { Model, Schema, model } from 'mongoose';

type UserType = {
  email: string;
  password: string;
};

type UserStaticMethodType = {
  build(user: UserType): unknown;
};

type UserModel = Model<UserType> & UserStaticMethodType;

const userSchema = new Schema<
  UserType,
  UserModel,
  NonNullable<unknown>,
  NonNullable<unknown>,
  NonNullable<unknown>,
  UserStaticMethodType
>(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    statics: {
      async build(user: UserType) {
        const newUser = new this(user);
        await newUser.save();

        return newUser;
      }
    }
  }
);

export const User = model<UserType, UserModel>('User', userSchema);
