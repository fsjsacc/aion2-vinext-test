import type { Metadata } from "next";

import { AdminEmailLogin } from "./AdminEmailLogin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "管理员登录 | AION2 KINA",
  description: "AION2 KINA 管理后台的私有邮箱验证入口。",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function AdminLoginPage() {
  return <AdminEmailLogin />;
}
