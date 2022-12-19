import { Role } from "@interfaces/Role.enum";
import { User as IUser } from "@interfaces/User.interface";
import { Document, model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  roles: {
    type: [{ type: String, enum: Object.values(Role) }],
    required: true,
  },
});

const UserModel = model<IUser & Document>("User", userSchema);

export { UserModel };
