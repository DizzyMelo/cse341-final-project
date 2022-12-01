import { Schema, model } from 'mongoose';

// Note that the created timestamp is incorporated into the MongoDB ObjectId and can be extracted.
interface IUser {
    lastName: string;
    firstName: string;
    login: string;
    email: string;
    organization: string;
    permissions: any[];
    updated: string;    // Timestamp in ISO 8601 format
    likes: number;
}

const userSchema = new Schema<IUser>({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    login: { type: String, required: true },
    email:  { type: String, required: true },
    organization: { type: String },
    permissions: [{ type: Schema.Types.Mixed, required: true}],
    updated: { type: String },
    likes: { type: Number }
});

export default model('User', userSchema);
