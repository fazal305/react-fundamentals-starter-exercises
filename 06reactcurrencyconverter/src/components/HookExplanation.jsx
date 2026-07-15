function HookExplanation({ title, summary, projectUsage }) {
  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{summary}</p>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        <strong className="font-semibold text-slate-950">
          In this project:
        </strong>{" "}
        {projectUsage}
      </p>
    </article>
  );
}

export default HookExplanation;
