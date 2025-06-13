"use client";
import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/JobApplicantsTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react";
import { recruiterJobApplicant } from "@/types/jobApplicantstype";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ApplicantsPage({
  initialData,
}: {
  initialData: recruiterJobApplicant[];
}) {
  console.log("Initial Data:", initialData);
  const [data, setData] = useState<recruiterJobApplicant[]>(initialData);
  const [filter, setFilter] = useState<string>("");

  // Track status per applicant
  const [statuses, setStatuses] = useState<
    Record<string, recruiterJobApplicant["status"]>
  >(
    initialData.reduce(
      (acc, app) => ({ ...acc, [app.id]: app.status }),
      {} as Record<string, recruiterJobApplicant["status"]>
    )
  );

  const handleStatusChange = (
    id: string,
    value: recruiterJobApplicant["status"]
  ) => {
    setStatuses((prev) => ({ ...prev, [id]: value }));
    setData((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: value } : app))
    );
  };

  const filtered = useMemo(
    () =>
      data.filter((app) =>
        Object.values(app.user_details)
          .join(" ")
          .toLowerCase()
          .includes(filter.toLowerCase())
      ),
    [data, filter]
  );

  const prettify = (key: string) =>
    key
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();

  const isISODate = (val: unknown): val is string =>
    typeof val === "string" && /^\d{4}-\d{2}-\d{2}T/.test(val);

  const columns = useMemo<ColumnDef<recruiterJobApplicant>[]>(() => {
    const userKeys = Object.keys(data[0]?.user_details || {});
    const cols: ColumnDef<recruiterJobApplicant>[] = [];

    // Dynamic user_details columns
    userKeys.forEach((key) => {
      if (key === "Resume/cv") {
        cols.push({
          id: key,
          header: prettify(key),
          accessorFn: (row) => row.user_details[key] ?? "",
          cell: ({ getValue }) => {
            const url = getValue() as string;

            return url ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="link"
                  className=" text-blue-500
                   p-0 h-auto hover:underline cursor-pointer"
                >
                  View Resume
                </Button>
              </a>
            ) : (
              <Badge
                variant="outline"
                className="text-muted-foreground bg-muted px-2 py-0.5 rounded"
              >
                No Resume
              </Badge>
            );
          },
        });
      } else {
        cols.push({
          accessorFn: (row) => {
            const val = row.user_details[key];
            if (Array.isArray(val)) return val.join(", ");
            if (isISODate(val)) return new Date(val).toLocaleDateString();
            return String(val ?? "");
          },
          id: key,
          header: prettify(key),
          cell: (info) => (
            <span className="capitalize">{String(info.getValue() ?? "-")}</span>
          ),
        });
      }
    });

    // Applied At column
    cols.push({
      accessorFn: (row) => new Date(row.applied_at).toLocaleString(),
      id: "appliedAt",
      header: "Applied At",
      cell: (info) => <span>{String(info.getValue())}</span>,
    });

    // Status Dropdown
    cols.push({
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center space-x-1"
        >
          <span>Status</span>
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const id = String(row.original.id);
        const current = statuses[id] as recruiterJobApplicant["status"];
        return (
          <Select
            onValueChange={(val) =>
              handleStatusChange(id, val as recruiterJobApplicant["status"])
            }
            value={current}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="interview">Interview Scheduled</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    });

    // Actions column
    cols.push({
      id: "actions",
      cell: ({ row }) => {
        const app = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(app.id))}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log(app)}>
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });

    return cols;
  }, [data, statuses]);

  return (
    <Card className="p-4">
      <CardContent className="overflow-auto">
        <DataTable columns={columns} data={filtered} />
      </CardContent>
    </Card>
  );
}
