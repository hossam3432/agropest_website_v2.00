import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LanguageSelection } from "@/components/LanguageSelection";
import { enContent, isLocale, languageCookieName } from "@/lib/content";

export default async function LanguageSelectionPage() {
  const cookieStore = await cookies();
  const preferredLocale = cookieStore.get(languageCookieName)?.value;

  if (isLocale(preferredLocale)) {
    redirect(`/${preferredLocale}`);
  }

  return <LanguageSelection content={enContent} />;
}