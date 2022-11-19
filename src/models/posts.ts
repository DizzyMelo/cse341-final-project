import { Schema, Types, model } from 'mongoose';

interface IPost {
    userId: Types.ObjectId;
    title: string;
    question: string;
    answers: Types.ObjectId[];
    timestamp: string;  // Date/Time in ISO 8601 format
    likes: number;
}

const postSchema = new Schema<IPost>({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    question: { type: String, required: true },
    answers: [{ type: Schema.Types.ObjectId }],
    timestamp: { type: String, required: true },
    likes: { type: Number }
});

export default model('Post', postSchema);
