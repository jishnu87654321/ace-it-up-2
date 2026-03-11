import mongoose, { Document, Schema } from 'mongoose';

export interface IStat extends Document {
  icon: string;
  value: number;
  label: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const statSchema = new Schema<IStat>({
  icon: { type: String, required: true }, // Icon name from lucide-react
  value: { type: Number, required: true, default: 0 },
  label: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IStat>('Stat', statSchema);
