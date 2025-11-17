import { redirect } from "next/navigation";
import { routing } from "@/lib/navigation";

export default function RootPage() { 
  redirect(`/${routing.defaultLocale}`);
}