import AppHeader from "./components/AppHeader";
import ContextExplanation from "./components/ContextExplanation";
import NestedThemePreview from "./components/NestedThemePreview";
import ProductGrid from "./components/ProductGrid";
import PropDrillingDemo from "./components/PropDrillingDemo";
import { learningConcepts } from "./data/learningConcepts";
import { products } from "./data/products";
import useTheme from "./hooks/useTheme";

function App() {
  const { themeMode } = useTheme();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition dark:bg-slate-950 dark:text-slate-100">
      <AppHeader />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <section className="rounded-lg border border-slate-300 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
            Context architecture
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
            Theme state lives in ThemeProvider, not App
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            The provider owns the theme state, persists it, applies the root
            HTML class, and exposes one consistent API through useTheme().
          </p>
          <p className="mt-4 rounded-md bg-slate-100 p-3 font-mono text-sm text-slate-800 dark:bg-slate-950 dark:text-slate-200">
            ThemeProvider -&gt; ThemeContext.Provider -&gt; useTheme() -&gt;
            ThemeToggle / AppHeader / Nested Preview
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
            Current theme: {themeMode.toUpperCase()}
          </p>
        </section>

        <ProductGrid products={products} />
        <NestedThemePreview />
        <PropDrillingDemo />

        <section>
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
            Context learning cards
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {learningConcepts.map((concept) => (
              <ContextExplanation
                key={concept.id}
                title={concept.title}
                summary={concept.summary}
                projectUsage={concept.projectUsage}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
