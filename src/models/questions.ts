import { Schema, Types, model } from 'mongoose';

interface IQuestion {
    postId: Types.ObjectId;
    content: string;
    comments: Types.ObjectId[];
}

const questionSchema = new Schema<IQuestion>({
    postId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId }],
});

export default model('Question', questionSchema);
