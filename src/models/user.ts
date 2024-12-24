import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

export interface IUser extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;

  //   Virtual Attribute
  comparePassword(password: any): boolean;
  generateJWT(): string;
  //   Virtual Attribute
}

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  const payload = {
    _id: this._id,
    fullName: this.fullName,
    email: this.email,
  };
  return JWT.sign(payload, process.env.JWTSecret as string, {
    expiresIn: '15d',
  });
};

export const User = model<IUser>('user', userSchema);
