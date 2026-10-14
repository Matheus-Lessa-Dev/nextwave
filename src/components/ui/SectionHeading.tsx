type Props = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
};

export function SectionHeading({ id, eyebrow, title, highlight, description }: Props) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>
        {title}<br />
        <span className="text-muted">{highlight}</span>
      </h2>
      <p className="section-description">{description}</p>
    </div>
  );
}
