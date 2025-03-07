"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/button";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const handleExit = () => {
    router.push("/");
  };
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: FileText, label: "Applications", href: "/admin/applications" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="w-64 border-r border-gray-200 bg-white flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                pathname === item.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <Button onClick={handleExit} className="bg-red-500 hover:bg-red-300 mx-4">
        {" "}
        <LogOut /> Exit{" "}
      </Button>
    </div>
  );
}
