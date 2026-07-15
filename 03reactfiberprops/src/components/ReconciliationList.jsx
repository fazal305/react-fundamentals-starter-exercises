import { useState } from "react";

const initialItems = [
  {
    id: "topic-props",
    label: "Props pass data from parent to child",
  },
  {
    id: "topic-keys",
    label: "Stable keys preserve list item identity",
  },
  {
    id: "topic-fiber",
    label: "Fiber schedules rendering work",
  },
];

function ReconciliationList() {
  const [items, setItems] = useState(initialItems);
  const [nextItemNumber, setNextItemNumber] = useState(4);

  function addItem() {
    const newItem = {
      id: `topic-custom-${nextItemNumber}`,
      label: `New learning topic ${nextItemNumber}`,
    };

    setItems((currentItems) => [...currentItems, newItem]);
    setNextItemNumber((currentNumber) => currentNumber + 1);
  }

  function removeItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function moveToTop(id) {
    setItems((currentItems) => {
      const selectedItem = currentItems.find((item) => item.id === id);

      if (!selectedItem) {
        return currentItems;
      }

      const otherItems = currentItems.filter((item) => item.id !== id);

      return [selectedItem, ...otherItems];
    });
  }

  return (
    <section className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">
            Keyed List Reconciliation
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Keys help React identify which list item stayed, moved, appeared, or
            disappeared during reconciliation.
          </p>
        </div>

        <button
          type="button"
          onClick={addItem}
          className="w-fit rounded-md border border-slate-400 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Add item
        </button>
      </div>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-md border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium text-slate-900">{item.label}</span>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => moveToTop(item.id)}
                  className="rounded-md border border-slate-400 px-3 py-2 text-sm text-slate-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Move to top
                </button>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="rounded-md border border-slate-400 px-3 py-2 text-sm text-slate-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Remove
                </button>
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500">Key: {item.id}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ReconciliationList;
