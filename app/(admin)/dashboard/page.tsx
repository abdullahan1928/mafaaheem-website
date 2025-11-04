"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Calendar, Book, FileText } from "lucide-react"
import Link from "next/link"
import { IEvent } from "@/models/Event"
import { IBlog } from "@/models/Blog"
import { ICourseDTO } from "@/models/Course"
import { ROUTES } from "@/routes"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface IData {
  events: IEvent[]
  courses: { data: ICourseDTO[] }
  blogs: IBlog[]
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
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Events" value={data.events.length} icon={<Calendar className="w-6 h-6 text-mafaaheem-brown" />} />
        <SummaryCard title="Courses" value={data.courses.data.length} icon={<Book className="w-6 h-6 text-mafaaheem-green" />} />
        <SummaryCard title="Blogs" value={data.blogs.length} icon={<FileText className="w-6 h-6 text-mafaaheem-gold" />} />
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-6">
        <RecentTable
          title="Recent Courses"
          headers={["Title", "Author", "Category"]}
          rows={data.courses.data.slice(0, 5).map(course => ({
            id: course.id,
            title: course.translations.title.en,
            author: course.translations.author?.en || "-",
            category: course.category || "-",
            link: ROUTES.DASHBOARD.COURSES.EDIT(course.slug),
          }))}
          viewAllLink={ROUTES.DASHBOARD.COURSES.LIST}
        />

        <RecentTable
          title="Recent Events"
          headers={["Title", "Date", "Language"]}
          rows={data.events.slice(0, 5).map(event => ({
            id: event._id,
            title: event.title,
            date: event.date,
            language: event.language,
            link: ROUTES.DASHBOARD.EVENTS.EDIT(event._id),
          }))}
          viewAllLink={ROUTES.DASHBOARD.EVENTS.LIST}
        />

        <RecentTable
          title="Recent Blogs"
          headers={["Title", "Language", "Published"]}
          rows={data.blogs.slice(0, 5).map(blog => ({
            id: blog._id,
            title: blog.title,
            language: blog.language,
            published: blog.published ? "Yes" : "No",
            link: ROUTES.DASHBOARD.BLOGS.EDIT(blog.slug),
          }))}
          viewAllLink={ROUTES.DASHBOARD.BLOGS.LIST}
        />
      </div>
    </div>
  )
}

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

const RecentTable = ({
  title,
  headers,
  rows,
  viewAllLink,
}: {
  title: string
  headers: string[]
  rows: any[]
  viewAllLink: string
}) => (
  <Card className="border shadow-sm bg-white border-mafaaheem-beige">
    <CardHeader className="border-b">
      <CardTitle className="text-lg font-semibold text-gray-800">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, idx) => (
                <TableHead key={idx}>
                  {header}
                </TableHead>
              ))}
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, idx) => (
                <TableRow key={row.id || idx}>
                  {Object.keys(row)
                    .filter((key) => key !== "id" && key !== "link")
                    .map((key, i) => (
                      <TableCell key={i}>
                        {row[key]}
                      </TableCell>
                    ))}
                  <TableCell className="text-right">
                    <Link
                      href={row.link}
                      className="text-mafaaheem-green text-sm font-medium hover:underline"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length + 1}
                  className="text-center text-muted-foreground py-6"
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end p-4 border-t">
        <Link href={viewAllLink}>
          <Button
            variant="outline"
            size="sm"
            className="bg-mafaaheem-brown hover:bg-mafaaheem-gold text-white"
          >
            View All
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
)

export default DashboardPage
