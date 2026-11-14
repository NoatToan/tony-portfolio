import type { Metadata } from "next";
import { Portfolio } from "@/components/Portfolio";
import { fullstack } from "@/content";

export const metadata: Metadata = {
  title: fullstack.meta.title,
  description: fullstack.meta.description,
  alternates: { canonical: "/fullstack" },
  openGraph: {
    title: fullstack.meta.title,
    description: fullstack.meta.description,
    url: "/fullstack",
  },
  twitter: { title: fullstack.meta.title, description: fullstack.meta.description },
};

export default function Page() {
  return <Portfolio content={fullstack} />;
}
