import { Schema, Types, model } from 'mongoose';

// Note that the created timestamp is incorporated into the MongoDB ObjectId and can be extracted.
interface IPost {
    userId: Types.ObjectId;
    title: string;
    question: string;
    updated: string;  // Date/Time in ISO 8601 format
    likes: number;
}

const postSchema = new Schema<IPost>({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    question: { type: String, required: true },
    updated: { type: String, required: true },
    likes: { type: Number }
});

export default model('Post', postSchema);
