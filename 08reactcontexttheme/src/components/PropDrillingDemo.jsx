function PropDrillingDemo() {
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
        Prop drilling versus Context
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
        Prop drilling is not always wrong. It becomes noisy when intermediate
        components only pass data along without using it.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-950 dark:text-white">
            Prop drilling
          </h3>
          <p className="mt-3 font-mono text-sm leading-7 text-slate-700 dark:text-slate-300">
            App
            <br />
            -&gt; themeMode prop
            <br />
            Dashboard
            <br />
            -&gt; themeMode prop
            <br />
            SettingsPanel
            <br />
            -&gt; themeMode prop
            <br />
            ThemeToggle
          </p>
        </article>

        <article className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-950 dark:text-white">
            Context
          </h3>
          <p className="mt-3 font-mono text-sm leading-7 text-slate-700 dark:text-slate-300">
            ThemeProvider
            <br />
            -&gt; ThemeContext.Provider
            <br />
            -&gt; any descendant
            <br />
            -&gt; useTheme()
          </p>
        </article>
      </div>
    </section>
  );
}

export default PropDrillingDemo;
