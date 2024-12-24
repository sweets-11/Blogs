import { Schema, model } from 'mongoose';

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);
export const Blog = model('blog', blogSchema);
