import { Schema, Types, model } from 'mongoose';

// Note that the created timestamp is incorporated into the MongoDB ObjectId and can be extracted.
interface IAnswer {
    postId: Types.ObjectId;
    userId: Types.ObjectId;
    content: string;
    updated: string;  // Date/Time in ISO 8601 format
    likes: number;
}

const answerSchema = new Schema<IAnswer>({
    postId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    updated: { type: String, required: true },
    likes: { type: Number }
});

export default model('Answer', answerSchema);
