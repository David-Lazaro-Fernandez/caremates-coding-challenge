"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Application } from "@/src/services/application-service";
import { format } from "date-fns";

interface ApplicationsTableProps {
  applications: Application[];
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Care Type</TableHead>
          <TableHead>ZIP Code</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Finished At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.id}>
            <TableCell className="font-medium">{app.id}</TableCell>
            <TableCell>
              {[app.first_name, app.middle_name, app.last_name]
                .filter(Boolean)
                .join(" ")}
            </TableCell>
            <TableCell>{app.care_type}</TableCell>
            <TableCell>{app.zip_code}</TableCell>
            <TableCell>
              {app.finished_at ? (
                <span className="text-green-600">Completed</span>
              ) : (
                <span className="text-yellow-600">Pending</span>
              )}
            </TableCell>
            <TableCell>
              {app.created_at
                ? format(new Date(app.created_at), "MMM d, yyyy")
                : "-"}
            </TableCell>
            <TableCell>
              {app.finished_at
                ? format(new Date(app.finished_at), "MMM d, yyyy")
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
