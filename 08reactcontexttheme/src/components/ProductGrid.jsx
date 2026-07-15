import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <section>
      <div>
        <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
          Props still configure components
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
          Product data flows through normal props. Context is only used for the
          global theme value that many distant components need.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
