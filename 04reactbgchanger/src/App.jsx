import { useEffect, useState } from "react";
import ColorButton from "./components/ColorButton";
import ColorReadout from "./components/ColorReadout";
import { colors } from "./data/colors";

function App() {
  const [color, setColor] = useState(colors[0].value);

  const activeColor = colors.find((item) => item.value === color) ?? colors[0];

  function handleSelectColor(value) {
    setColor(value);
  }

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <main className="min-h-screen px-4 py-10 text-slate-950">
      <div className="mx-auto max-w-4xl space-y-8 rounded-xl border border-slate-300 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            React Fundamentals
          </p>
          <h1 className="mt-2 text-4xl font-bold">BG Changer</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
            A small app for practicing `useState` initial values, correct
            `onClick` argument passing, reusable data-driven components, the DOM
            `backgroundColor` property, and `useEffect` synchronization.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold">Choose a background color</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Buttons are generated from one data array with `.map()`, not written
            by hand one-by-one.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {colors.map((item) => (
              <ColorButton
                key={item.id}
                label={item.label}
                value={item.value}
                onSelect={handleSelectColor}
              />
            ))}
          </div>
        </section>

        <ColorReadout color={activeColor.label} />
      </div>
    </main>
  );
}

export default App;
