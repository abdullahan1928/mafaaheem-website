import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    content: { type: String },
    image: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Blog || model("Blog", BlogSchema);
