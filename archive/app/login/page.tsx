import { redirect } from "next/navigation"
import { getMainAppLoginUrl } from "@/lib/app-url"

export default function LoginPage() {
  // Redirect to main app login page
  redirect(getMainAppLoginUrl())
}
