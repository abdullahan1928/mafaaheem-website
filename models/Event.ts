import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  language: "en" | "ur" | "ar";
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    date: { type: String, required: true },
    language: { type: String, required: true, enum: ["en", "ur", "ar"], default: "en" },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Event || model("Event", EventSchema);
