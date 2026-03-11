import mongoose, { Document, Schema } from 'mongoose';

export interface IEnquiry extends Document {
    name: string;
    email: string;
    phone?: string;
    message: string;
    type: string;
    courseId?: mongoose.Types.ObjectId;
    isResponded: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    message: { type: String, required: true },
    type: { type: String, default: 'general' },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', default: null },
    isResponded: { type: Boolean, default: false },
}, { timestamps: true, collection: 'contacts' });

export default mongoose.model<IEnquiry>('Enquiry', enquirySchema);
