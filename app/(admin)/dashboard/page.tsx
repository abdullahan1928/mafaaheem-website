"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Calendar, Book, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { IEvent } from "@/models/Event"
import { IBlog } from "@/models/Blog"
import { ICourseDTO } from "@/models/Course"
import { ROUTES } from "@/routes"
import { Button } from "@/components/ui/button"
import { formatDateWithLanguage } from "@/lib/date"

interface IData {
  events: IEvent[]
  courses: ICourseDTO[]
  blogs: IBlog[]
}

const DashboardPage = () => {
  const [data, setData] = useState<IData>({ events: [], courses: [], blogs: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, coursesRes, blogsRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/courses"),
          fetch("/api/blogs"),
        ])
        const [events, courses, blogs] = await Promise.all([
          eventsRes.json(),
          coursesRes.json(),
          blogsRes.json(),
        ])
        setData({ events, courses, blogs })
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-10 bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-mafaaheem-brown">
          Dashboard
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Events"
          value={data.events.length}
          icon={<Calendar className="w-6 h-6 text-mafaaheem-brown" />}
        />
        <SummaryCard
          title="Courses"
          value={data.courses.length}
          icon={<Book className="w-6 h-6 text-mafaaheem-green" />}
        />
        <SummaryCard
          title="Blogs"
          value={data.blogs.length}
          icon={<FileText className="w-6 h-6 text-mafaaheem-gold" />}
        />
      </div>

      {/* Recent Events */}
      <RecentSection
        title="Recent Events"
        items={data.events.slice(0, 4)}
        type="event"
        viewAllLink={ROUTES.DASHBOARD.EVENTS.LIST}
      />

      {/* Recent Courses */}
      <RecentSection
        title="Recent Courses"
        items={data.courses.slice(0, 4)}
        type="course"
        viewAllLink={ROUTES.DASHBOARD.COURSES.LIST}
      />

      {/* Recent Blogs */}
      <RecentSection
        title="Recent Blogs"
        items={data.blogs.slice(0, 4)}
        type="blog"
        viewAllLink={ROUTES.DASHBOARD.BLOGS.LIST}
      />
    </div>
  )
}

// ---------- Summary Card ----------
const SummaryCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
  <Card className="shadow-sm border bg-white">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
      <div className="p-2 bg-gray-100 rounded-md">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <p className="text-xs text-muted-foreground">Total {title.toLowerCase()}</p>
    </CardContent>
  </Card>
)

// ---------- Recent Section (Cards) ----------
const RecentSection = ({
  title,
  items,
  type,
  viewAllLink,
}: {
  title: string
  items: any[]
  type: "event" | "course" | "blog"
  viewAllLink: string
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <Link href={viewAllLink}>
          <Button size="sm" className="flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item: any) => {
            let titleText = ""
            let imageUrl = ""
            let linkUrl = ""

            switch (type) {
              case "event":
                titleText = item.title
                imageUrl = item.image || ""
                linkUrl = ROUTES.DASHBOARD.EVENTS.EDIT(item._id)
                break
              case "course":
                titleText = item.translations.title.en
                imageUrl = item.image || ""
                linkUrl = ROUTES.DASHBOARD.COURSES.EDIT(item.slug)
                break
              case "blog":
                titleText = item.title
                imageUrl = item.image || ""
                linkUrl = ROUTES.DASHBOARD.BLOGS.EDIT(item.slug)
                break
            }

            return (
              <Card
                key={item._id || item.id}
                className="overflow-hidden hover:shadow-lg transition-all flex flex-col"
              >
                {imageUrl && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={titleText}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle
                    className="text-lg font-medium line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: titleText }}
                  />
                </CardHeader>
                <CardContent className="flex flex-col gap-2 mt-auto">
                  {type === "event" && (
                    <p className="text-xs text-muted-foreground">
                      {formatDateWithLanguage(item.date, item.language)}
                    </p>
                  )}
                  {type === "course" && (
                    <p className="text-xs text-muted-foreground">
                      Author: {item.translations.author?.en || "-"}
                    </p>
                  )}
                  {type === "blog" && (
                    <p className="text-xs text-muted-foreground">
                      Published: {item.published ? "Yes" : "No"}
                    </p>
                  )}
                  <Link href={linkUrl}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-10">No recent {title.toLowerCase()} found.</p>
      )}
    </div>
  )
}

export default DashboardPage
