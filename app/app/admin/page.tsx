import type { Metadata } from "next";

import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "管理中心 | AION2 KINA",
  description: "AION2 KINA 站点反馈与匿名行为数据管理中心。",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
