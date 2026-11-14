import { SectionRail } from "@/components/SectionRail";
import { SECTION_NAV, SiteHeader } from "@/components/SiteHeader";

export default function VariantsLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <SectionRail items={SECTION_NAV} />
      {children}
    </>
  );
}
