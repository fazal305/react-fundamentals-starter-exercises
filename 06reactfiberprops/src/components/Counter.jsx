import { useState } from "react";
import RenderTracker from "./RenderTracker";

function Counter({ label = "Counter", min = 0, max = 20, initialValue = min }) {
  const [counter, setCounter] = useState(initialValue);
  const [message, setMessage] = useState("Ready");

  const isAtMin = counter <= min;
  const isAtMax = counter >= max;

  function increase() {
    setCounter((currentValue) => {
      if (currentValue >= max) {
        setMessage(`Counter cannot go above ${max}.`);
        return currentValue;
      }

      setMessage("Increased by 1.");
      return currentValue + 1;
    });
  }

  function decrease() {
    setCounter((currentValue) => {
      if (currentValue <= min) {
        setMessage(`Counter cannot go below ${min}.`);
        return currentValue;
      }

      setMessage("Decreased by 1.");
      return currentValue - 1;
    });
  }

  function reset() {
    setCounter(initialValue);
    setMessage(`Reset to ${initialValue}.`);
  }

  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-950">{label}</h3>
          <p className="mt-1 text-sm text-slate-600">
            Bounds: {min} to {max}
          </p>
        </div>

        <RenderTracker label={label} />
      </div>

      <p className="mt-5 text-4xl font-bold text-slate-950">{counter}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={decrease}
          disabled={isAtMin}
          className="rounded-md border border-slate-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Decrease
        </button>

        <button
          type="button"
          onClick={increase}
          disabled={isAtMax}
          className="rounded-md border border-slate-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Increase
        </button>

        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-slate-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>

      <p className="mt-4 text-sm text-slate-700">{message}</p>
    </section>
  );
}

export default Counter;
