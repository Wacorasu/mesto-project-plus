import mongoose from 'mongoose';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

userSchema.path('avatar').validate((val: string) => {
  /* eslint-disable-next-line */
  const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return urlRegex.test(val);
}, 'Invalid URL.');

export default mongoose.model('user', userSchema);
