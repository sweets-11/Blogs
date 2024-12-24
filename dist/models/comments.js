import { Schema, model } from 'mongoose';
const commentSchema = new Schema({
    comment: { type: String, required: true },
    blogId: { type: Schema.Types.ObjectId, ref: 'blog', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user', required: true },
}, { timestamps: true });
export const Comment = model('comment', commentSchema);
