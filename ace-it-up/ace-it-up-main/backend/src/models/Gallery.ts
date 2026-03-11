import mongoose, { Document, Schema } from 'mongoose';

export interface IGallery extends Document {
    imageUrl: string;
    category: string;
    caption?: string;
    createdAt: Date;
    updatedAt: Date;
}

const gallerySchema = new Schema<IGallery>({
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    caption: { type: String, default: null },
}, { timestamps: true, collection: 'galleries' });

export default mongoose.model<IGallery>('Gallery', gallerySchema);
