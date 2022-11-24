import { Schema, Types, model } from 'mongoose';

interface IUser {
    lastName: string;
    firstName: string;
    login: string;
    email: string;
    permissions: any[];
    likes: number;
}

const userSchema = new Schema<IUser>({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    login: { type: String, required: true },
    email:  { type: String, required: true },
    permissions: [{ type: Schema.Types.Mixed, required: true}],
    likes: { type: Number }
});

export default model('User', userSchema);
