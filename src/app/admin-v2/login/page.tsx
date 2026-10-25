import { redirect } from "next/navigation";

export default function AdminV2LoginRedirect() {
  redirect("/admin/login");
}
