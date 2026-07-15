import { useRef } from "react";

function RenderTracker({ label = "Component" }) {
  const renderCount = useRef(0);

  // useRef can remember a value between renders without causing another render.
  renderCount.current += 1;

  return (
    <p className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
      {label} render count:{" "}
      <strong className="font-semibold text-slate-950">
        {renderCount.current}
      </strong>
    </p>
  );
}

export default RenderTracker;
