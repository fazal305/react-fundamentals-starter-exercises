function HookExplanation({
  name,
  purpose,
  projectUsage,
  dependencyExplanation,
}) {
  return (
    <article className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">{name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{purpose}</p>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        <strong className="font-semibold text-slate-950">
          In this project:
        </strong>{" "}
        {projectUsage}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        <strong className="font-semibold text-slate-950">Dependencies:</strong>{" "}
        {dependencyExplanation}
      </p>
    </article>
  );
}

export default HookExplanation;
