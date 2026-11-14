import type { Metadata } from "next";
import { Portfolio } from "@/components/Portfolio";
import { mobile } from "@/content";

export const metadata: Metadata = {
  title: mobile.meta.title,
  description: mobile.meta.description,
  alternates: { canonical: "/mobile" },
  openGraph: {
    title: mobile.meta.title,
    description: mobile.meta.description,
    url: "/mobile",
  },
  twitter: { title: mobile.meta.title, description: mobile.meta.description },
};

export default function Page() {
  return <Portfolio content={mobile} />;
}
