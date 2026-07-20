import { LanguageSelection } from "@/components/LanguageSelection";
import { enContent } from "@/lib/content";

// LanguageSelection redirects on the client when a preferred locale is stored,
// which is what keeps this page statically exportable.
export default function LanguageSelectionPage() {
  return <LanguageSelection content={enContent} />;
}
