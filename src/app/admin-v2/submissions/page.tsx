import { redirect } from "next/navigation";

export default function AdminV2SubmissionsRedirect() {
  redirect("/admin/dashboard");
}
