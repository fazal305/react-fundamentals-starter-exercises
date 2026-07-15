function AboutPage() {
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-950">
        About this router app
      </h2>

      <p className="mt-4 text-sm leading-6 text-slate-700">
        This project does not create separate HTML files for each route. A React
        Router app uses one index.html, one React root, and multiple route
        components.
      </p>

      <div className="mt-5 rounded-md bg-slate-50 p-4">
        <p className="font-mono text-sm leading-7 text-slate-800">
          URL changes
          <br />
          -&gt; React Router matches a route
          <br />
          -&gt; Matching component renders
          <br />
          -&gt; Shared layout stays mounted
        </p>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-700">
        From the user's perspective, this feels like a multi-page website. From
        the architecture perspective, route components replace separate HTML
        documents.
      </p>
    </section>
  );
}

export default AboutPage;
