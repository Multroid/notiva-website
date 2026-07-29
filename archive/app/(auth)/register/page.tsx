import { redirect } from "next/navigation";
import { getMainAppRegisterUrl } from "@/lib/app-url";

export default function RegisterPage() {
	// Redirect to main app register page
	redirect(getMainAppRegisterUrl());
}
