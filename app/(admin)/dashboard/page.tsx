"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2, Calendar, Book, FileText, Users } from "lucide-react"
import Link from "next/link"
import { IEvent } from "@/models/Event"
import { IBlog } from "@/models/Blog"
import { ICourseDTO } from "@/models/Course"
import { ROUTES } from "@/routes"

interface IData {
  events: IEvent[];
  courses: { data: ICourseDTO[] };
  blogs: IBlog[];
}

const DashboardPage = () => {
  const [data, setData] = useState<IData>({
    events: [],
    courses: { data: [] },
    blogs: [],
  })
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
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/courses/new">Add New Course</Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Events" value={data.events.length} icon={<Calendar className="w-6 h-6 text-blue-500" />} />
        <SummaryCard title="Courses" value={data.courses.data.length} icon={<Book className="w-6 h-6 text-green-500" />} />
        <SummaryCard title="Blogs" value={data.blogs.length} icon={<FileText className="w-6 h-6 text-orange-500" />} />
      </div>

      {/* Latest Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.courses.data.slice(0, 5).map(course => (
                <li
                  key={course.id}
                  className="p-3 rounded-lg border flex justify-between items-center hover:bg-muted/40 transition"
                >
                  <div>
                    <p className="font-medium">{course.translations.title.en}</p>
                    <p className="text-sm text-muted-foreground">{course.translations.author?.en}</p>
                  </div>
                  <Link href={ROUTES.DASHBOARD.COURSES.EDIT(course.slug)} className="text-sm text-blue-600 hover:underline">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.events.slice(0, 5).map((event: any) => (
                <li
                  key={event.id}
                  className="p-3 rounded-lg border flex justify-between items-center hover:bg-muted/40 transition"
                >
                  <div>
                    <p className="font-medium">{event.title?.en}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <Link href={`/dashboard/events/${event.id}`} className="text-sm text-blue-600 hover:underline">
                    View
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const SummaryCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
  <Card className="shadow-md hover:shadow-lg transition">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">Total {title.toLowerCase()}</p>
    </CardContent>
  </Card>
)

export default DashboardPage
