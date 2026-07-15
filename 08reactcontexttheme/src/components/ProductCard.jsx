function ProductCard({ product }) {
  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
            {product.category}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
            {product.name}
          </h3>
        </div>
        <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
          {product.status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
        {product.description}
      </p>
    </article>
  );
}

export default ProductCard;
