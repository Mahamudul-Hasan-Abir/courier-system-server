import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, TUserModel } from "./user.interface";
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: { values: ["admin", "agent", "customer"] },
    message: "{VALUE} is not a valid role",
    default: "customer",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALT_ROUNDS)
  );
  next();
});

userSchema.statics.isUserExist = async function (id: string) {
  return User.findOne({ _id: id }, "_id name email role").lean(); // 🔸 Only return needed fields and use lean()
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<IUser, TUserModel>("User", userSchema);
