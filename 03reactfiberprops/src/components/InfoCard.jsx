function InfoCard({
  title = "Untitled",
  description = "No description provided.",
  category = "General",
  tags = [],
  metadata = {},
  featured = false,
  onAction = () => {},
}) {
  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-700">{category}</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950">{title}</h3>
        </div>

        {featured && (
          <span className="w-fit rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
            Featured
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key} className="rounded-md bg-slate-50 p-3">
            <dt className="text-xs font-semibold uppercase text-slate-500">
              {key}
            </dt>
            <dd className="mt-1 text-sm text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onAction}
        className="mt-5 rounded-md border border-slate-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Log this card
      </button>
    </article>
  );
}

export default InfoCard;
