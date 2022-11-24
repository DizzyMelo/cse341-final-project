import { Schema, Types, model } from 'mongoose';

interface IPost {
    userId: Types.ObjectId;
    title: string;
    question: string;
    timestamp: string;  // Date/Time in ISO 8601 format
    likes: number;
}

const postSchema = new Schema<IPost>({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    question: { type: String, required: true },
    timestamp: { type: String },
    likes: { type: Number }
});

export default model('Post', postSchema);
