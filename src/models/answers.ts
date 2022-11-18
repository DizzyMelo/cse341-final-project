import { Schema, Types, model } from 'mongoose';

interface IAnswer {
    postId: Types.ObjectId;
    content: string;
    comments: Types.ObjectId[];
    timestamp: string;  // Date/Time in ISO 8601 format
    likes: number;
}

const answerSchema = new Schema<IAnswer>({
    postId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId }],
    timestamp: { type: String, required: true },
    likes: { type: Number }
});

export default model('Answer', answerSchema);
