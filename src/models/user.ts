import mongoose from 'mongoose';
import validator from 'validator';
import { REGEX } from '../services/constants';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.path('avatar').validate((val: string) => REGEX.test(val), 'Invalid URL.');

userSchema
  .path('email')
  .validate((val: string) => validator.isEmail(val), 'Invalid Email.');

export default mongoose.model('user', userSchema);
