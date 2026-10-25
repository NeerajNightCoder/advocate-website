import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted";
};

export function Section({
  id,
  children,
  className = "",
  tone = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`apple-section-pad ${
        tone === "muted" ? "bg-apple-muted" : "bg-apple-bg"
      } ${className}`}
    >
      <div className="mx-auto max-w-[980px]">{children}</div>
    </section>
  );
}

type PageHeaderProps = {
  title: string;
  intro?: string;
  centered?: boolean;
};

export function PageHeader({
  title,
  intro,
  centered = false,
}: PageHeaderProps) {
  return (
    <header
      className={`mb-14 md:mb-16 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}
    >
      <h1 className="apple-headline md:text-6xl">{title}</h1>
      {intro ? <p className="mt-5 apple-body">{intro}</p> : null}
    </header>
  );
}
