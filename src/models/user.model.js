import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  docType: {
    type: String,
    enum: ['DNI', 'LICENSE', 'TAX_ID', 'OTHER'],
    default: 'OTHER',
  },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['ADMIN', 'USER', 'COURIER'], default: 'USER' },
    isActive: { type: Boolean, default: true },
    documents: [documentSchema],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);