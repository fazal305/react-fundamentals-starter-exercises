import { useState } from "react";
import Counter from "./components/Counter";
import InfoCard from "./components/InfoCard";
import ReconciliationList from "./components/ReconciliationList";
import RenderTracker from "./components/RenderTracker";
import ConceptPanel from "./components/ConceptPanel";
import { cards } from "./data/cards";
import { concepts } from "./data/concepts";

function App() {
  const [appMessage, setAppMessage] = useState("No card selected yet.");
  const [parentUpdates, setParentUpdates] = useState(0);

  function handleCardAction(title) {
    setAppMessage(`You clicked the "${title}" card.`);
    setParentUpdates((currentCount) => currentCount + 1);
  }

  function refreshParent() {
    setParentUpdates((currentCount) => currentCount + 1);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            React Fundamentals
          </p>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-slate-950">
              React Render Lab
            </h1>
            <p className="max-w-3xl text-base leading-7 text-slate-700">
              A small learning app for understanding createRoot, React's render
              tree, Virtual DOM concepts, reconciliation, Fiber, props, keyed
              lists, hydration, Tailwind CSS, and bounded state updates.
            </p>
          </div>
        </header>

        <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                Parent Render Demonstration
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clicking this button updates state in App, so App renders again.
                Child components keep their own state unless reconciliation
                rules say they should be replaced.
              </p>
              <p className="mt-3 text-sm font-medium text-slate-800">
                Parent update count: {parentUpdates}
              </p>
              <p className="mt-1 text-sm text-slate-700">{appMessage}</p>
            </div>

            <div className="flex flex-col gap-3">
              <RenderTracker label="App" />
              <button
                type="button"
                onClick={refreshParent}
                className="rounded-md border border-slate-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Re-render App
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              Independent Counters
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Both counters use the same component. Props configure their
              labels, limits, and starting values.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Counter label="Small Counter" min={0} max={20} initialValue={0} />
            <Counter label="Large Counter" min={0} max={30} initialValue={10} />
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              Props Demonstration
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              These cards receive strings, arrays, objects, booleans, and
              function props from App. The card component reads props but does
              not mutate them.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {cards.map((card) => (
              <InfoCard
                key={card.id}
                title={card.title}
                description={card.description}
                category={card.category}
                tags={card.tags}
                metadata={card.metadata}
                featured={card.featured}
                onAction={() => handleCardAction(card.title)}
              />
            ))}
          </div>
        </section>

        <ReconciliationList />

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">
              Concept Panels
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The same reusable panel component renders multiple explanations
              from a separate data file.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {concepts.map((concept) => (
              <ConceptPanel
                key={concept.id}
                title={concept.title}
                summary={concept.summary}
                details={concept.details}
              />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            Browser DOM vs React Tree
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-semibold text-slate-950">
                Browser DOM
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The browser DOM is the live document the browser displays and
                updates. JavaScript can directly change individual DOM nodes
                without reloading the page.
              </p>
            </article>

            <article className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-semibold text-slate-950">
                React Render Tree
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                React components return elements that describe UI. React
                compares previous and next trees, then commits the required DOM
                changes.
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            Rendering vs Hydration
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            This Vite project uses client-side rendering with createRoot(), not
            hydration.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-semibold text-slate-950">
                Client Rendering
              </h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Empty root container</li>
                <li>JavaScript loads</li>
                <li>createRoot()</li>
                <li>React renders UI</li>
              </ol>
            </article>

            <article className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-semibold text-slate-950">
                Hydration
              </h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
                <li>Server-generated HTML already exists</li>
                <li>HTML becomes visible</li>
                <li>JavaScript loads</li>
                <li>hydrateRoot()</li>
                <li>React attaches behavior to existing markup</li>
              </ol>
            </article>
          </div>
        </section>

        <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            Tailwind Setup Notes
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This project uses the current Vite-compatible Tailwind setup:
            install <code className="font-mono">tailwindcss</code> and{" "}
            <code className="font-mono">@tailwindcss/vite</code>, register the
            plugin in <code className="font-mono">vite.config.js</code>, and use{" "}
            <code className="font-mono">@import "tailwindcss";</code> in{" "}
            <code className="font-mono">src/index.css</code>.
          </p>
        </section>
      </div>
    </main>
  );
}

export default App;
