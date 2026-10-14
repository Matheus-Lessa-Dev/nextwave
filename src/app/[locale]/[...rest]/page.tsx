import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ rest: ["not-found"] }];
}

export default async function UnknownPage({ params }: { params: Promise<{ rest: string[] }> }) {
  await params;
  notFound();
}
