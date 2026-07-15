# React Fundamentals — Starter Exercises

A growing React Fundamentals learning series built with professional conventions from day one: clean structure, focused exercises, reusable components, accurate React terminology, and documentation that explains what each project teaches.

## Projects

### 01basicreact

- What it is: React 18 + ReactDOM 18 + Babel Standalone, all loaded via CDN, no npm, no build step.
- What it demonstrates: the raw mechanics of a React component and render call, with nothing hidden by tooling.
- How to run: open `index.html` directly in a browser.

### 01vitereact

- What it is: A proper Vite + React scaffold.
- What it demonstrates: a real dev toolchain, JSX handled by Vite, proper file extensions, and a custom second component (`Fazal.jsx`).
- How to run: `npm install` then `npm run dev` inside the `01vitereact` folder.

### 02reactcounter

- What it is: A Vite + React counter project focused on hooks, state updates, and reusable custom hook logic.
- What it demonstrates: why hooks exist, how `useState` gives function components memory across renders, why state updates are scheduled instead of immediate, and how to extract reusable stateful behavior into a custom hook (`useBoundedCounter.js`).
- How to run: `npm install` then `npm run dev` inside the `02reactcounter` folder.

### 03reactfiberprops

- What it is: A Vite + React learning lab focused on React's render tree, reconciliation, Fiber, props, list keys, hydration concepts, Tailwind CSS, and state snapshots.
- What it demonstrates: how `createRoot()` connects React to a DOM container, how component re-renders work, how props configure reusable components, why stable keys matter, and why repeated `setCounter(counter + 1)` calls read the same render snapshot.
- How to run: `npm install` then `npm run dev` inside the `03reactfiberprops` folder.

### 04reactbgchanger

- What it is: A Vite + React background color changer using Tailwind CSS.
- What it demonstrates: `useState` initial values, why reload resets memory-only state, correct `onClick` argument passing, reusable data-driven components, the real DOM `backgroundColor` property, and `useEffect` for syncing React state with `document.body`.
- How to run: `npm install` then `npm run dev` inside the `04reactbgchanger` folder.

### 05reactpasswordgenerator

- What it is: A Vite + React password generator using Tailwind CSS and the Clipboard API.
- What it demonstrates: `useState`, `useCallback`, `useEffect`, and `useRef` working together in one practical app, including hook dependencies, stable state setters, controlled form inputs, password generation, clipboard copying, input selection, and timer cleanup.
- How to run: `npm install` then `npm run dev` inside the `05reactpasswordgenerator` folder.

## Lessons Learned

- Component names must start with a capital letter, or JSX treats them as HTML tags instead of React components.
- Vite React files containing JSX should use the `.jsx` extension.
- A component can only return one root element. Use a Fragment (`<>...</>`) when you do not need an extra DOM node.
- Hooks exist because function components do not have class instances where React can store changing values between renders.
- `useState` gives a function component memory across renders.
- Calling a state setter does not change the current render's state variable immediately; it schedules a re-render.
- React state behaves like a snapshot for each render.
- Repeated `setCounter(counter + 1)` calls in one event handler read the same old snapshot value.
- Functional updates like `setCounter((current) => current + 1)` are safest when the next state depends on the previous state.
- Custom hooks package reusable stateful logic into small, importable functions.
- `useCallback` returns a memoized function reference; it does not automatically call the function.
- `useCallback` dependencies decide when React should create a new callback reference.
- `useEffect` runs after React commits a render.
- `useEffect` dependencies decide when an effect should run again.
- Effect cleanup is important for clearing timers and avoiding stale work.
- `useRef` can store a mutable value across renders without causing another render.
- `useRef` can also reference a real DOM element, such as an input.
- React state setter functions have stable identities, so setters like `setPassword` do not need to be listed in dependency arrays.
- `createRoot()` attaches React to a real browser DOM container. It does not create a second real DOM.
- React components produce an element tree that describes the UI.
- The Virtual DOM is a common name for React's in-memory UI representation.
- Reconciliation compares previous and next rendered trees to decide an efficient set of DOM updates.
- React Fiber is React's internal architecture for scheduling and organizing rendering work.
- Hydration is different from normal Vite client rendering; hydration connects React behavior to HTML that already exists.
- Props pass read-only data from parent components to child components.
- Props can be strings, numbers, arrays, objects, booleans, and functions.
- Stable list keys help React preserve item identity during reordering, insertion, and removal.
- `onClick` needs a function reference, not the result of calling a function during render.
- Use `onClick={() => handler(value)}` when an event handler needs an argument.
- `onChange` handles changes to form controls such as ranges and checkboxes.
- `document.body.style.backgroundColor` is the correct DOM style property; `bgColor` silently fails.
- `useEffect` is the right tool for synchronizing React state with something outside React's rendered tree, such as `document.body`.
- `Math.floor(Math.random() * source.length)` creates valid zero-based indexes from `0` through `source.length - 1`.
- Do not add `1` to a random string index; it skips index `0` and can create an invalid final index.
- JavaScript strings are immutable and do not have `splice()`.
- Use `slice()` or `substring()` to extract part of a string.
- Selecting text in an input and choosing what to pass to `navigator.clipboard.writeText()` are separate operations.
- Clipboard writes can fail and should be handled with `try...catch`.
- Tailwind CSS works cleanly with Vite using `tailwindcss`, `@tailwindcss/vite`, and `@import "tailwindcss";`.

## How To Run A Vite Project

```powershell
cd C:\coding\react-fundamentals-starter-exercises\PROJECT_FOLDER_NAME

npm install

npm run dev
```

Then open the local URL Vite prints, usually:

```text
http://localhost:5173/
```

## Current Structure

```text
react-fundamentals-starter-exercises/
  01basicreact/
  01vitereact/
  02reactcounter/
  03reactfiberprops/
  04reactbgchanger/
  05reactpasswordgenerator/
  README.md
  .gitignore
```

## Next Steps

- Practice form validation and inline error messages.
- Practice lifting state up between sibling components.
- Practice `useEffect` cleanup with subscriptions or event listeners.
- Practice `localStorage` persistence.
- Practice `useReducer` for more structured state updates.
- Practice `React.memo` to observe callback reference behavior.
- Replace `Math.random()` with Web Crypto API randomness in a future security-focused version.
