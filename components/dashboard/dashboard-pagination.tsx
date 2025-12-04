"use client";

import { Button } from "../ui/button";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function DashboardPagination({ page, limit, total, onPageChange }: PaginationProps) {
  const pages = (Math.max(Math.ceil(total / limit), 1));

  return (
    <div className="flex items-center justify-between mt-6">
      <div>{total} items</div>
      <div className="flex gap-2">
        <Button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <div className="px-3 py-2 rounded-md bg-muted/50">{page} / {pages}</div>
        <Button
          onClick={() => onPageChange(Math.min(pages, page + 1))}
          disabled={page === pages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
