import { redirect } from "next/navigation";

export default function AdminV2Redirect() {
  redirect("/admin/dashboard");
}
