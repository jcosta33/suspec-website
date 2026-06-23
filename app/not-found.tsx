import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "./components/Section";
import { Button } from "./components/Button";

export const metadata = {
  title: "Page not found — Calma",
  description: "The requested page could not be found on the Calma website.",
  robots: "noindex",
};

export default function NotFoundPage() {
  return (
    <Section className="flex flex-1 flex-col items-center justify-center py-32 text-center">
      <h1 className="font-heading text-6xl font-bold text-corpus-yellow">
        404
      </h1>
      <p className="mt-4 text-2xl font-semibold text-concrete-100">
        Drone lost signal.
      </p>
      <p className="mt-2 max-w-md text-concrete-400">
        The page you are looking for is not in the hive. Check the URL or head
        back home.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to hive
          </Link>
        </Button>
      </div>
    </Section>
  );
}
