import { Schema, Types, model } from 'mongoose';

interface IPost {
    userId: Types.ObjectId;
    questionId: Types.ObjectId;
    answers: Types.ObjectId[];
    timestamp: string;  // Date/Time in ISO 8601 format
    likes: number;
}

const postSchema = new Schema<IPost>({
    userId: { type: Schema.Types.ObjectId, required: true },
    questionId: { type: Schema.Types.ObjectId, required: true },
    answers: [{ type: Schema.Types.ObjectId }],
    timestamp: { type: String, required: true },
    likes: { type: Number }
});

export default model('Post', postSchema);
