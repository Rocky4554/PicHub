
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // or mongoose.Schema.Types.ObjectId if referencing User model
  name: { type: String, required: false },
  mimeType: { type: String, required: false },
  prompt: { type: String },
  fileName: { type: String,required: true},
  previewUrl: { type: String,required: true },
  imageKitUrl: { type: String,required: true },
  imageKitFileId: { type: String,required: true },
  createdAt: { type: Date, default: Date.now },
});


const Image = mongoose.model('Image', imageSchema);
export default Image;
