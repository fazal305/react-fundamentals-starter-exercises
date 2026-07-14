import { useState } from "react";
import useBoundedCounter from "../hooks/useBoundedCounter";

function Counter({ min, max, label }) {
  const { value, increase, decrease } = useBoundedCounter(min, max);
  const [logEntries, setLogEntries] = useState([]);

  function addLogEntry(action, consoleValue, nextDisplayedValue) {
    const timestamp = new Date().toLocaleTimeString();

    setLogEntries((currentEntries) => [
      `${timestamp} - ${action}: console logged ${consoleValue}, displayed value became ${nextDisplayedValue}`,
      ...currentEntries,
    ]);
  }

  function handleIncrease() {
    increase();

    // This logs the value from the current render, before React re-renders with the updated state.
    console.log(`Immediately after increase(), value is still: ${value}`);

    const nextDisplayedValue = value >= max ? value : value + 1;

    addLogEntry("Increase clicked", value, nextDisplayedValue);
  }

  function handleDecrease() {
    decrease();

    // This logs the value from the current render, before React re-renders with the updated state.
    console.log(`Immediately after decrease(), value is still: ${value}`);

    const nextDisplayedValue = value <= min ? value : value - 1;

    addLogEntry("Decrease clicked", value, nextDisplayedValue);
  }

  return (
    <section>
      <h2>{label}</h2>
      <p>
        Current value: <strong>{value}</strong>
      </p>
      <p>
        Bounds: {min} to {max}
      </p>

      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>

      <h3>Click log</h3>

      {logEntries.length === 0 ? (
        <p>No clicks yet.</p>
      ) : (
        <ul>
          {logEntries.map((entry, index) => (
            <li key={`${entry}-${index}`}>{entry}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Counter;
