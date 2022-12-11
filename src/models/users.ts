import { Schema, model } from 'mongoose';

// Note that the created timestamp is incorporated into the MongoDB ObjectId and can be extracted.
export interface IUser {
    identifier: string;
    lastName: string;
    firstName: string;
    login: string;
    email: string;
    organization: string;
    permissions: string[];
    updated: string;    // Timestamp in ISO 8601 format
    likes: number;
}

const userSchema = new Schema<IUser>({
    identifier: { type: String, required: true },
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
