import { Schema, Types, model } from 'mongoose';

interface IComment {
    userId: Types.ObjectId;
    content: string;
    parent: Types.ObjectId;     // Post ID or Answer ID
    timestamp: string;  // Date/Time in ISO 8601 format
    likes: number;
}

const commentSchema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId },
    timestamp: { type: String, required: true },
    likes: { type: Number }
});

export default model('Comment', commentSchema);
