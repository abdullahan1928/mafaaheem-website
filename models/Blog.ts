import { Document, Schema, model, models } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    image: { type: String },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Blog || model("Blog", BlogSchema);
