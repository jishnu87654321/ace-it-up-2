import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    fullName: string;
    avatarUrl?: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    avatarUrl: { type: String, default: null },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true, collection: 'users' });

export default mongoose.model<IUser>('User', userSchema);
