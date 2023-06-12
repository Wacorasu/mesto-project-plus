import mongoose from "mongoose";

interface ICard {
  name: string;
  link: string;
  owner: string;
  likes: string[];
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: { type: String, required: true },
  likes: [{ type: String }],
  createdAt: {
    type: Date,
  },
});

cardSchema.path("link").validate((val: string) => {
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return urlRegex.test(val);
}, "Invalid URL.");

export default mongoose.model("card", cardSchema);
