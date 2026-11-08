type PageHeaderProps = {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: string;
  intro: string;
};

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="page-header">
      {eyebrow && <p className="page-eyebrow">{eyebrow}</p>}
      <h1 className="page-title">{title}</h1>
      <p className="page-intro">{intro}</p>
    </header>
  );
}
