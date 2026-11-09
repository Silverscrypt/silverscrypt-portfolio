import type { ReactNode } from "react";

type PageHeaderProps = {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: string;
  intro: string;
  /** Optional buttons under the intro. */
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
      <h1 className="page-title">{title}</h1>
      <p className="page-intro">{intro}</p>
      {children && <div className="page-actions">{children}</div>}
    </header>
  );
}
