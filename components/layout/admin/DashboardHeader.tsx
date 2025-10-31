import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardHeader = () => {

  const pathname = usePathname();

  const [pageTitle, setPageTitle] = useState<string>("");

  // Page title listener for dynamic breadcrumb labels
  useEffect(() => {
    const updatePageTitle = () => {
      const title = document.body.getAttribute("data-page-title");
      setPageTitle(title || "");
    };
    updatePageTitle();
    const observer = new MutationObserver(updatePageTitle);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-page-title"] });
    return () => observer.disconnect();
  }, [pathname]);

  const generateBreadcrumbs = () => {
    if (!pathname) return [];

    const segments = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href: string }[] = [];
    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;

      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === "admin") label = "Dashboard";
      if (segment === "blogs") label = "Blogs";
      if (segment === "events") label = "Events";
      if (segment === "settings") label = "Settings";
      if (segment === "new") label = "New";
      if (isLast && pageTitle) label = pageTitle;

      crumbs.push({ label, href: currentPath });
    });

    return crumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
      <SidebarTrigger />

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex-1" />
    </header>
  )
}

export default DashboardHeader