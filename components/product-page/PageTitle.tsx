interface PageTitleProps {
  title: string;
  subtitle: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-lg text-gray-600">{subtitle}</p>
    </div>
  );
}