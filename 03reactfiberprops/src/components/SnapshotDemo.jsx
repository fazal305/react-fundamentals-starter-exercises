import { useState } from "react";
import RenderTracker from "./RenderTracker";

function SnapshotDemo() {
  const [counter, setCounter] = useState(15);
  const [message, setMessage] = useState(
    "Start at 15, then compare both +3 buttons."
  );

  function increaseWithSnapshot() {
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);

    setMessage(
      `Snapshot update: this handler saw counter as ${counter}, so all three updates scheduled ${counter + 1}.`
    );
  }

  function increaseWithFunctionalUpdates() {
    setCounter((currentCounter) => currentCounter + 1);
    setCounter((currentCounter) => currentCounter + 1);
    setCounter((currentCounter) => currentCounter + 1);

    setMessage(
      "Functional update: each update receives the latest queued value, so the counter increases by 3."
    );
  }

  function resetCounter() {
    setCounter(15);
    setMessage("Reset to 15. Try the snapshot button first, then reset and try the functional button.");
  }

  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">
            State as a Snapshot
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            In one render, `counter` is a fixed snapshot. Repeating
            `setCounter(counter + 1)` reads the same old value each time.
          </p>
        </div>

        <RenderTracker label="Snapshot Demo" />
      </div>

      <p className="mt-5 text-4xl font-bold text-slate-950">{counter}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={increaseWithSnapshot}
          className="rounded-md border border-slate-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          +3 using snapshot value
        </button>

        <button
          type="button"
          onClick={increaseWithFunctionalUpdates}
          className="rounded-md border border-slate-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          +3 using functional updates
        </button>

        <button
          type="button"
          onClick={resetCounter}
          className="rounded-md border border-slate-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-700">{message}</p>
    </section>
  );
}

export default SnapshotDemo;
