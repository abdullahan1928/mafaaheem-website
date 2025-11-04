"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/routes";
import { useParams, useRouter } from "next/navigation";
import { Category, CategoryLabels } from "@/data/course";
import { toast } from "sonner";

const QuillEditor = dynamic(
  () => import("@/components/shared/QuillEditor").then((m) => m.QuillEditor),
  { ssr: false }
);

type Lang = "en" | "ur" | "ar";

export default function EditCourseForm() {
  const { slug } = useParams();

  const router = useRouter();

  const [form, setForm] = useState({
    slug: "",
    image: "",
    students: 0,
    category: Category.Other,
    featured: false,
    enrollmentUrl: "",
    translations: {
      title: { en: "", ur: "", ar: "" },
      author: { en: "", ur: "", ar: "" },
      description: { en: "", ur: "", ar: "" }, // short
      longDescription: { en: "", ur: "", ar: "" }, // overview / long
      duration: { en: "", ur: "", ar: "" },
      schedule: { en: "", ur: "", ar: "" },
      startDate: { en: "", ur: "", ar: "" },
      features: { en: [] as string[], ur: [] as string[], ar: [] as string[] },
      objectives: { en: [] as string[], ur: [] as string[], ar: [] as string[] },
    },
    instructors: [] as {
      image?: string;
      name: { en: string; ur: string; ar: string };
      role: { en: string; ur: string; ar: string };
    }[],
    modules: [] as {
      title: { en: string; ur: string; ar: string };
      lessons: number;
      duration: { en: string; ur: string; ar: string };
    }[],
  });

  const [activeLang, setActiveLang] = useState<Lang>("en");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();

        const { slug: s, image, students, category, featured, enrollmentUrl, translations, instructors, modules } = data;

        setForm({
          slug: s,
          image: image || "",
          students: students || 0,
          category: category || Category.Other,
          featured: featured || false,
          enrollmentUrl: enrollmentUrl || "",
          translations: {
            title: translations?.title || { en: "", ur: "", ar: "" },
            author: translations?.author || { en: "", ur: "", ar: "" },
            description: translations?.description || { en: "", ur: "", ar: "" },
            longDescription:
              translations?.longDescription || { en: "", ur: "", ar: "" },
            duration: translations?.duration || { en: "", ur: "", ar: "" },
            schedule: translations?.schedule || { en: "", ur: "", ar: "" },
            startDate: translations?.startDate || { en: "", ur: "", ar: "" },
            features: translations?.features || {
              en: [],
              ur: [],
              ar: [],
            },
            objectives: translations?.objectives || {
              en: [],
              ur: [],
              ar: [],
            },
          },
          instructors: instructors || [],
          modules: modules || [],
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load course");
      }
    }

    if (slug) fetchCourse();
  }, [slug]);

  // helpers to update nested translations
  const updateTranslation = (key: keyof typeof form.translations, lang: Lang, value: any) => {
    setForm((s) => ({
      ...s,
      translations: {
        ...s.translations,
        [key]: {
          ...s.translations[key],
          [lang]: value,
        },
      },
    }));
  };

  // feature / objective helpers
  const addListItem = (listKey: "features" | "objectives", lang: Lang, value = "") => {
    setForm((s) => {
      const arr = [...(s.translations[listKey][lang] as string[])];
      arr.push(value);
      return {
        ...s,
        translations: {
          ...s.translations,
          [listKey]: {
            ...s.translations[listKey],
            [lang]: arr,
          },
        },
      };
    });
  };

  const updateListItem = (listKey: "features" | "objectives", lang: Lang, index: number, value: string) => {
    setForm((s) => {
      const arr = [...(s.translations[listKey][lang] as string[])];
      arr[index] = value;
      return {
        ...s,
        translations: {
          ...s.translations,
          [listKey]: {
            ...s.translations[listKey],
            [lang]: arr,
          },
        },
      };
    });
  };

  const removeListItem = (listKey: "features" | "objectives", lang: Lang, index: number) => {
    setForm((s) => {
      const arr = [...(s.translations[listKey][lang] as string[])];
      arr.splice(index, 1);
      return {
        ...s,
        translations: {
          ...s.translations,
          [listKey]: {
            ...s.translations[listKey],
            [lang]: arr,
          },
        },
      };
    });
  };

  // instructors
  const addInstructor = () => {
    setForm((s) => ({
      ...s,
      instructors: [
        ...s.instructors,
        {
          image: "",
          name: { en: "", ur: "", ar: "" },
          role: { en: "", ur: "", ar: "" },
        },
      ],
    }));
  };

  const updateInstructor = (index: number, field: string, langOrVal: any, maybeLang?: Lang) => {
    setForm((s) => {
      const instructors = [...s.instructors];
      const instructor = { ...instructors[index] };

      if (typeof langOrVal === "string" && maybeLang) {
        const lang = maybeLang;
        (instructor as any)[field] = { ...(instructor as any)[field], [lang]: langOrVal };
      } else {
        (instructor as any)[field] = langOrVal;
      }

      instructors[index] = instructor;
      return { ...s, instructors };
    });
  };

  const removeInstructor = (index: number) => {
    setForm((s) => {
      const instructors = [...s.instructors];
      instructors.splice(index, 1);
      return { ...s, instructors };
    });
  };

  // modules
  const addModule = () => {
    setForm((s) => ({
      ...s,
      modules: [
        ...s.modules,
        {
          title: { en: "", ur: "", ar: "" },
          lessons: 0,
          duration: { en: "", ur: "", ar: "" },
        },
      ],
    }));
  };

  const updateModule = (index: number, key: string, langOrVal: any, maybeLang?: Lang) => {
    setForm((s) => {
      const modules = [...s.modules];
      const m = { ...modules[index] };

      if (maybeLang) {
        (m as any)[key] = { ...(m as any)[key], [maybeLang]: langOrVal };
      } else {
        (m as any)[key] = langOrVal;
      }

      modules[index] = m;
      return { ...s, modules };
    });
  };

  const removeModule = (index: number) => {
    setForm((s) => {
      const modules = [...s.modules];
      modules.splice(index, 1);
      return { ...s, modules };
    });
  };

  // image upload (presigned)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const pres = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          folderName: "courses",
        }),
      });
      const { url } = await pres.json();
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const imageUrl = url.split("?")[0];
      setForm((s) => ({ ...s, image: imageUrl }));
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleInstructorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const pres = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          folderName: "courses/instructors",
        }),
      });
      const { url } = await pres.json();
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const imageUrl = url.split("?")[0];
      updateInstructor(index, "image", imageUrl);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // basic validation, ensure at least english title and longDescription exist
    if (!form.translations.title.en.trim() || !form.translations.longDescription.en.trim()) {
      toast.info("Please add at least English title and overview");
      return;
    }

    try {
      const res = await fetch(`/api/courses/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push(ROUTES.DASHBOARD.COURSES.LIST);
      } else {
        const text = await res.text();
        console.error("update course failed", text);
        toast.error("Failed to update course");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-6xl mx-auto p-6 bg-white rounded-md shadow"
    >
      <Card>
        <CardHeader>
          <CardTitle>Update Course</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Non-translatable meta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm">Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>

            <div>
              <Label className="text-sm">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Category })}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Category).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {CategoryLabels[cat].en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm">Students</Label>
              <Input
                type="number"
                value={String(form.students)}
                onChange={(e) => setForm({ ...form, students: Number(e.target.value || 0) })}
              />
            </div>

            <div>
              <Label className="text-sm">Featured</Label>
              <div className="mt-2">
                <Button
                  type="button"
                  variant={form.featured ? "default" : "outline"}
                  onClick={() => setForm({ ...form, featured: !form.featured })}
                >
                  {form.featured ? "Yes" : "No"}
                </Button>
              </div>
            </div>

            <div className="col-span-full md:col-span-2">
              <Label className="text-sm">Enrollment URL</Label>
              <Input value={form.enrollmentUrl} onChange={(e) => setForm({ ...form, enrollmentUrl: e.target.value })} />
            </div>

            <div className="col-span-full">
              <Label className="text-sm">Featured Image</Label>
              <Input type="file" onChange={handleImageUpload} />
              {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
              {form.image && (
                <div className="mt-3 relative h-40 w-full rounded overflow-hidden border">
                  <Image src={form.image} alt="course image" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Translatable fields in tabs */}
      <Tabs defaultValue="en" className="w-full">
        <TabsList className="grid grid-cols-3 w-fit">
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="ur">Urdu</TabsTrigger>
          <TabsTrigger value="ar">Arabic</TabsTrigger>
        </TabsList>

        {(["en", "ur", "ar"] as Lang[]).map((lang) => (
          <TabsContent key={lang} value={lang} className="mt-4">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Title ({lang.toUpperCase()})</Label>
                  <Input
                    value={form.translations.title[lang]}
                    onChange={(e) => updateTranslation("title", lang, e.target.value)}
                  />
                </div>

                <div>
                  <Label>Author ({lang.toUpperCase()})</Label>
                  <Input
                    value={form.translations.author[lang]}
                    onChange={(e) => updateTranslation("author", lang, e.target.value)}
                  />
                </div>

                <div className="col-span-full">
                  <Label>Short Description ({lang.toUpperCase()})</Label>
                  <Textarea
                    value={form.translations.description[lang]}
                    onChange={(e) => updateTranslation("description", lang, e.target.value)}
                  />
                </div>

                <div className="col-span-full">
                  <Label>Overview / Long Description ({lang.toUpperCase()})</Label>
                  <QuillEditor
                    value={form.translations.longDescription[lang]}
                    onChange={(html) => updateTranslation("longDescription", lang, html)}
                  />
                </div>

                <div>
                  <Label>Duration ({lang.toUpperCase()})</Label>
                  <Input
                    value={form.translations.duration[lang]}
                    onChange={(e) => updateTranslation("duration", lang, e.target.value)}
                  />
                </div>

                <div>
                  <Label>Schedule ({lang.toUpperCase()})</Label>
                  <Input
                    value={form.translations.schedule[lang]}
                    onChange={(e) => updateTranslation("schedule", lang, e.target.value)}
                  />
                </div>

                <div>
                  <Label>Start Date ({lang.toUpperCase()})</Label>
                  <Input
                    type="date"
                    value={form.translations.startDate[lang]}
                    onChange={(e) => updateTranslation("startDate", lang, e.target.value)}
                  />
                </div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <Label>Features ({lang.toUpperCase()})</Label>
                  <Button size="sm" type="button" onClick={() => addListItem("features", lang)}>
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {form.translations.features[lang].map((f: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={f}
                        onChange={(e) => updateListItem("features", lang, i, e.target.value)}
                      />
                      <Button type="button" variant="destructive" onClick={() => removeListItem("features", lang, i)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  {form.translations.features[lang].length === 0 && (
                    <p className="text-sm text-muted-foreground">No features yet</p>
                  )}
                </div>
              </div>

              {/* Objectives */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <Label>Objectives ({lang.toUpperCase()})</Label>
                  <Button size="sm" type="button" onClick={() => addListItem("objectives", lang)}>
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {form.translations.objectives[lang].map((o: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={o}
                        onChange={(e) => updateListItem("objectives", lang, i, e.target.value)}
                      />
                      <Button type="button" variant="destructive" onClick={() => removeListItem("objectives", lang, i)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  {form.translations.objectives[lang].length === 0 && (
                    <p className="text-sm text-muted-foreground">No objectives yet</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Instructors */}
      <Card>
        <CardHeader>
          <CardTitle>Instructors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button size="sm" onClick={addInstructor}>Add Instructor</Button>
            </div>

            {form.instructors.map((ins, idx) => (
              <div key={idx} className="p-4 border rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                  <div className="col-span-1">
                    <Label>Image</Label>
                    <Input
                      type="file"
                      onChange={(e) => handleInstructorImageUpload(e, idx)}
                    />
                    {ins.image && (
                      <div className="mt-2 relative h-24 w-24 rounded overflow-hidden border">
                        <Image src={ins.image} alt="instructor image" fill className="object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Name - English</Label>
                      <Input
                        value={ins.name.en}
                        onChange={(e) => updateInstructor(idx, "name", e.target.value, "en")}
                      />
                    </div>
                    <div>
                      <Label>Role - English</Label>
                      <Input
                        value={ins.role.en}
                        onChange={(e) => updateInstructor(idx, "role", e.target.value, "en")}
                      />
                    </div>
                    <div>
                      <Label>Name - Urdu</Label>
                      <Input
                        dir="rtl"
                        value={ins.name.ur}
                        onChange={(e) => updateInstructor(idx, "name", e.target.value, "ur")}
                      />
                    </div>
                    <div>
                      <Label>Role - Urdu</Label>
                      <Input
                        dir="rtl"
                        value={ins.role.ur}
                        onChange={(e) => updateInstructor(idx, "role", e.target.value, "ur")}
                      />
                    </div>
                    <div>
                      <Label>Name - Arabic</Label>
                      <Input
                        dir="rtl"
                        value={ins.name.ar}
                        onChange={(e) => updateInstructor(idx, "name", e.target.value, "ar")}
                      />
                    </div>
                    <div>
                      <Label>Role - Arabic</Label>
                      <Input
                        dir="rtl"
                        value={ins.role.ar}
                        onChange={(e) => updateInstructor(idx, "role", e.target.value, "ar")}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <Button variant="destructive" size="sm" onClick={() => removeInstructor(idx)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button size="sm" onClick={addModule}>Add Module</Button>
            </div>

            {form.modules.map((m, i) => (
              <div key={i} className="p-4 border rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">Module {i + 1}</div>
                  <div className="flex gap-2">
                    <Button variant="destructive" size="sm" onClick={() => removeModule(i)}>Remove</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Title EN</Label>
                    <Input value={m.title.en} onChange={(e) => updateModule(i, "title", e.target.value, "en")} />
                  </div>
                  <div>
                    <Label>Lessons</Label>
                    <Input type="number" value={String(m.lessons)} onChange={(e) => updateModule(i, "lessons", Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Duration EN</Label>
                    <Input value={m.duration.en} onChange={(e) => updateModule(i, "duration", e.target.value, "en")} />
                  </div>

                  <div>
                    <Label>Title UR</Label>
                    <Input dir="rtl" value={m.title.ur} onChange={(e) => updateModule(i, "title", e.target.value, "ur")} />
                  </div>
                  <div>
                    <Label>Duration UR</Label>
                    <Input dir="rtl" value={m.duration.ur} onChange={(e) => updateModule(i, "duration", e.target.value, "ur")} />
                  </div>

                  <div>
                    <Label>Title AR</Label>
                    <Input dir="rtl" value={m.title.ar} onChange={(e) => updateModule(i, "title", e.target.value, "ar")} />
                  </div>

                  <div>
                    <Label>Duration AR</Label>
                    <Input dir="rtl" value={m.duration.ar} onChange={(e) => updateModule(i, "duration", e.target.value, "ar")} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button type="submit">Update Course</Button>
        <Button type="button" variant="outline" onClick={() => router.push(ROUTES.DASHBOARD.COURSES.LIST)}>Cancel</Button>
      </div>
    </form>
  );
}
