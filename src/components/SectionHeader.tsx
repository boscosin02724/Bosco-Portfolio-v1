type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
};

export function SectionHeader({ eyebrow, title, children }: SectionHeaderProps) {
  return (
    <div data-reveal className="mx-auto grid max-w-studio gap-8 px-5 sm:px-8 lg:grid-cols-[0.36fr_1fr] lg:px-12">
      <p className="text-xs uppercase tracking-[0.34em] text-muted">{eyebrow}</p>
      <div>
        <h2 className="max-w-5xl font-display text-5xl leading-[0.94] sm:text-7xl lg:text-8xl">
          {title}
        </h2>
        {children ? <div className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600">{children}</div> : null}
      </div>
    </div>
  );
}
