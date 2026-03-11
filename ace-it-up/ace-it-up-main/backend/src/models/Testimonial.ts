import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
    name: string;
    review: string;
    type: string;
    course?: string;
    rating?: number;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>({
    name: { type: String, required: true },
    review: { type: String, required: true },
    type: { type: String, default: 'general' },
    course: { type: String, default: null },
    rating: { type: Number, default: null },
    isApproved: { type: Boolean, default: false },
}, { timestamps: true, collection: 'testimonials' });

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
