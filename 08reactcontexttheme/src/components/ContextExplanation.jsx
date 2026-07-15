function ContextExplanation({ title, summary, projectUsage }) {
  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
        {summary}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
        <strong className="font-semibold text-slate-950 dark:text-white">
          In this project:
        </strong>{" "}
        {projectUsage}
      </p>
    </article>
  );
}

export default ContextExplanation;
