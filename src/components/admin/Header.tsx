"use client";

import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export function Header() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white">
      <div className="h-full px-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button>Create Report</Button>
        </div>
      </div>
    </header>
  );
} 