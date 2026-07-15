# React Fundamentals — Starter Exercises

Minimal React exercises built to learn the fundamentals before moving to larger projects: React through CDN, React with Vite, hooks and state, and render-tree concepts with props and Tailwind CSS.

## Projects

### 01basicreact

- What it is: React 18 + ReactDOM 18 + Babel Standalone, all loaded via CDN, no npm, no build step.
- What it demonstrates: the raw mechanics of a React component and render call, with nothing hidden by tooling.
- How to run: open `index.html` directly in a browser.

### 01vitereact

- What it is: A proper Vite + React scaffold.
- What it demonstrates: a real dev toolchain (fast refresh, JSX handled by the bundler, proper file extensions), plus a custom second component (`Fazal.jsx`).
- How to run: `npm install` then `npm run dev` inside the `01vitereact` folder.

### 02reactcounter

- What it is: A Vite + React counter project focused on hooks, state updates, and reusable custom hook logic.
- What it demonstrates: why hooks exist, how `useState` gives function components memory across renders, why state updates are scheduled instead of immediate, and how to extract reusable stateful behavior into a custom hook (`useBoundedCounter.js`).
- How to run: `npm install` then `npm run dev` inside the `02reactcounter` folder.

### 03reactfiberprops

- What it is: A Vite + React learning lab focused on React's render tree, reconciliation, Fiber, props, list keys, hydration concepts, Tailwind CSS, and state snapshots.
- What it demonstrates: how `createRoot()` connects React to a DOM container, how component re-renders work, how props configure reusable components, why stable keys matter, and why repeated `setCounter(counter + 1)` calls read the same render snapshot.
- How to run: `npm install` then `npm run dev` inside the `03reactfiberprops` folder.

## Lessons Learned

- Component names must start with a capital letter, or JSX treats them as an HTML tag instead of a component.
- Vite requires the `.jsx` extension for files containing JSX syntax; the CDN + Babel Standalone setup is more lenient about this.
- A component can only return one root element — use a Fragment (`<>...</>`) when you don't need an extra wrapping DOM node, and a real `<div>` when you do (e.g. to apply a class).
- Hooks exist because function components do not have instances where React can store changing values between renders; `useState` gives a function component memory across renders.
- Calling a state setter like `setCounter(counter + 1)` does not change `counter` immediately in the current render; it schedules a re-render, so a `console.log(counter)` on the next line still shows the old value.
- React state behaves like a snapshot for each render. If `counter` is `15` in the current render and an event handler calls `setCounter(counter + 1)` multiple times, each call still reads the same snapshot value, `15`. After the event handler finishes, React re-renders with the queued update, so the result is only `16` unless you use a functional update like `setCounter((current) => current + 1)`.
- A custom hook is a reusable function that packages stateful logic; `useBoundedCounter(min, max)` keeps the counter rules in one place so multiple components can share the same behavior with different bounds.

## Next Steps

- Practice props by passing name, role, and fact into reusable components.
- Practice state with `useState`.
- Practice events with button clicks and input fields.
- Practice rendering lists with `.map()`.
- Practice conditional rendering.
