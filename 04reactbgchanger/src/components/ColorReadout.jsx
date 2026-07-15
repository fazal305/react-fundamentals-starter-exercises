function ColorReadout({ color }) {
  return (
    <section className="rounded-lg border border-slate-300 bg-white/90 p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">Current color</h2>

      <p className="mt-3 text-3xl font-bold text-slate-950">{color}</p>

      <p className="mt-4 text-sm leading-6 text-slate-700">
        Reloading the page returns the background to the initial color because
        React state only lives in memory while this page's JavaScript is
        running. A full reload starts the app again from its original `useState`
        value.
      </p>
    </section>
  );
}

export default ColorReadout;
