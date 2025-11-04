import { Category } from "@/data/course";
import { Schema, model, models, Document } from "mongoose";

export type Lang = "en" | "ur" | "ar";

export interface ICourseTranslations {
  title: Record<Lang, string>;
  author?: Record<Lang, string>;
  description: Record<Lang, string>;
  longDescription: Record<Lang, string>;
  duration: Record<Lang, string>;
  schedule: Record<Lang, string>;
  startDateText?: Record<Lang, string>;
  features: Record<Lang, string[]>;
  objectives: Record<Lang, string[]>;
}

export interface IInstructor {
  name: Record<Lang, string>;
  role: Record<Lang, string>;
  image?: string;
}

export interface IModule {
  title: Record<Lang, string>;
  lessons: number;
  duration: Record<Lang, string>;
}

export interface ICourse extends Document {
  slug: string;
  image?: string;
  students?: number;
  category: string;
  featured?: boolean;
  enrollmentUrl?: string;
  translations: ICourseTranslations;
  instructors: IInstructor[];
  modules: IModule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourseDTO {
  id: string;
  slug: string;
  image?: string;
  students?: number;
  category: Category;
  featured?: boolean;
  enrollmentUrl?: string;
  translations: ICourseTranslations;
  instructors: IInstructor[];
  modules: IModule[];
  createdAt: string;
  updatedAt: string;
}


const InstructorSchema = new Schema<IInstructor>(
  {
    name: { type: Object, required: true }, // { en: '', ur: '', ar: '' }
    role: { type: Object, required: true },
    image: { type: String },
  },
  { _id: false }
);

const ModuleSchema = new Schema<IModule>(
  {
    title: { type: Object, required: true },
    lessons: { type: Number, default: 0 },
    duration: { type: Object, required: true },
  },
  { _id: false }
);

const CourseSchema = new Schema<ICourse>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    image: { type: String },
    students: { type: Number, default: 0 },
    category: { type: String, required: true, index: true },
    featured: { type: Boolean, default: false },
    enrollmentUrl: { type: String },

    translations: {
      type: {
        title: { type: Object, required: true },
        author: { type: Object },
        description: { type: Object, required: true },
        longDescription: { type: Object },
        duration: { type: Object, required: true },
        schedule: { type: Object, required: true },
        startDateText: { type: Object }, // optional
        features: { type: Object, default: {} },
        objectives: { type: Object, default: {} },
      },
      required: true,
    },

    instructors: { type: [InstructorSchema], default: [] },
    modules: { type: [ModuleSchema], default: [] },
  },
  { timestamps: true }
);

// Pre-save helper, ensure slug lowercase
CourseSchema.pre("save", function (next) {
  if (this.slug) this.slug = String(this.slug).toLowerCase();
  next();
});

export default models.Course || model<ICourse>("Course", CourseSchema);
