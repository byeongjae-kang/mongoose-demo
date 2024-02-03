import { HydratedDocument, Model, Schema, model } from 'mongoose';

type AddressType = {
  zip: string;
  street: string;
};

const addressSchema = new Schema<AddressType>(
  {
    zip: String,
    street: String
  },
  { timestamps: true, versionKey: false }
);

type UserType = {
  email: string;
  password: string;
  address: AddressType;
};

type UserStaticMethodType = {
  build(user: UserType): Promise<HydratedDocument<UserType>>;
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
    },
    address: addressSchema
  },
  {
    timestamps: true,
    versionKey: false,
    statics: {
      async build(user: UserType): Promise<HydratedDocument<UserType>> {
        const newUser = new this(user);
        await newUser.save();

        return newUser;
      }
    }
  }
);

export const User = model<UserType, UserModel>('User', userSchema);
