import { Schema, Types, model } from 'mongoose';

interface IUser {
    lastName: string;
    firstName: string;
    login: string;
    email: string;
    organization: string;
    permissions: any[];
    created: string;    // Timestamp in ISO 8601 format
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
    created: { type: String },
    updated: { type: String },
    likes: { type: Number }
});

export default model('User', userSchema);
