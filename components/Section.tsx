import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  as?: 'section' | 'div';
}

export default function Section({ id, children, className, as: Component = 'section' }: SectionProps) {
  return (
    <Component id={id} className={`section ${className ?? ''}`.trim()}>
      <div className="section__inner">{children}</div>
    </Component>
  );
}
