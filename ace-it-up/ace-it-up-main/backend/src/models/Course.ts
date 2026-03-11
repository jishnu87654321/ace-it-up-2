import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description?: string;
    imageUrl?: string;
    skillLevel?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const courseSchema = new Schema<ICourse>({
    title: { type: String, required: true, unique: true },
    description: { type: String, default: null },
    imageUrl: { type: String, default: null },
    skillLevel: { type: String, default: null },
    isActive: { type: Boolean, default: true },
}, { timestamps: true, collection: 'services' });

export default mongoose.model<ICourse>('Course', courseSchema);
