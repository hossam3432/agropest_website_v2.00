type ProductCardProps = {
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
};

export function ProductCard({ name, category, description, image, imageAlt, tags }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-white transition hover:-translate-y-1 hover:shadow-soft">
      <div className="aspect-[16/10] overflow-hidden bg-agri-mist">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-agri-gold">{category}</p>
        <h3 className="mt-3 text-xl font-bold tracking-normal text-agri-blue">{name}</h3>
        <p className="mt-3 leading-7 text-slate-600">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-lg bg-agri-mist px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-agri-green">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
