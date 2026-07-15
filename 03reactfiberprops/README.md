# 03reactfiberprops — React Render Lab

A React Fundamentals exercise exploring createRoot, React's render tree, Virtual DOM concepts, reconciliation, Fiber, hydration, props, list keys, Tailwind CSS, and reusable components.

## Learning Goals

- Understand how `createRoot()` connects React to a browser DOM container.
- Understand how components create a React element tree.
- See how state changes cause component re-renders.
- Learn how reconciliation compares previous and next rendered trees.
- Understand why changing one component does not rebuild unrelated DOM nodes.
- Learn what React Fiber does conceptually.
- Understand the difference between the render phase and commit phase.
- Understand the difference between client rendering and hydration.
- Practice passing props from parent components to child components.
- Practice string, number, array, object, boolean, and function props.
- Practice destructuring props with default values.
- Learn why stable list keys matter.
- Use Tailwind CSS with a modern Vite React setup.
- Use functional state updates for safe counter logic.
- Demonstrate React's "state as a snapshot" behavior in real UI code.

## Concepts Covered

### createRoot

`createRoot()` creates a React root attached to a real browser DOM container.

In this project, `src/main.jsx` selects the real DOM element with:

```javascript
document.getElementById("root");
```

Then React attaches its root to that container:

```javascript
createRoot(document.getElementById("root")).render(<App />);
```

This does not create a second real browser DOM. React manages a tree of elements and component state for that root. When state or props change, React renders a new description of the UI, compares it with the previous rendered tree, and commits the required changes to the real DOM.

### Browser DOM and React Tree

The browser DOM is the live object representation of the loaded HTML document.

A normal page reload replaces the current document with a newly loaded document. However, JavaScript can also update individual DOM elements without reloading the entire page.

React helps developers describe UI as components and state. React components return elements, and those elements form a React tree. React uses that tree to decide what browser DOM changes are needed after a state or prop update.

### Virtual DOM

“Virtual DOM” is a common name for React’s in-memory representation of UI elements.

React compares previous and next UI descriptions to determine an efficient set of DOM updates based on its reconciliation rules. This does not mean React always calculates the mathematically smallest possible DOM operation. It means React uses its rules to avoid unnecessary unrelated DOM work.

### Reconciliation

Reconciliation is React’s process for comparing the previous rendered element tree with the next rendered element tree.

React looks at:

- Element types
- Component types
- Props
- Child order
- List keys
- Whether component state should be preserved or reset

Stable list keys help React identify which list item stayed, moved, appeared, or disappeared.

### React Fiber

Fiber is React’s internal architecture for managing and scheduling rendering work.

Fiber allows React to:

- Break rendering work into units
- Prioritize important updates
- Pause or resume rendering work where supported
- Avoid blocking the browser unnecessarily
- Separate the render phase from the commit phase

Network requests and React state updates are separate concepts. A state update is not delayed because of a network request unless your own code is waiting for one.

### Render and Commit Phases

The render phase is where React calculates what the UI should look like. React calls component functions and builds the next description of the UI.

The commit phase is where React applies the necessary changes to the browser DOM.

A good mental model:

```text
State or props change
→ React render phase calculates next UI
→ React reconciliation compares trees
→ React commit phase updates the browser DOM
```

### State as a Snapshot

React state behaves like a snapshot for each render. When a component renders, the state values used inside that render do not change inside the same function call or event handler.

For example, if `counter` is `15` in the current render, this does not increase the counter three times:

```javascript
setCounter(counter + 1);
setCounter(counter + 1);
setCounter(counter + 1);
```

Each line reads the same snapshot value: `15`. So each line schedules `setCounter(16)`. After the event handler finishes, React re-renders the component, and the displayed value becomes `16`, not `18`.

When the next state depends on the previous state, use a functional update:

```javascript
setCounter((currentCounter) => currentCounter + 1);
setCounter((currentCounter) => currentCounter + 1);
setCounter((currentCounter) => currentCounter + 1);
```

Here React passes the latest queued value into each update, so the counter can move from `15` to `18`.

### Hydration

Hydration applies when HTML was already generated before React runs, usually through server-side rendering or static generation.

The browser displays the existing HTML first. Then React loads and attaches event handlers and component behavior to that existing HTML.

Hydration normally uses:

```javascript
hydrateRoot();
```

A normal client-side Vite React application using `createRoot()` is rendering, not hydrating.

Roman Urdu explanation:

```text
Hydration tab hoti hai jab HTML pehle se server ya static generation se browser mein aa chuki ho. Page ka content nazar aa raha hota hai, lekin React ki JavaScript load hone ke baad React us existing HTML ke saath event handlers aur component behavior connect karta hai. Is process ko hydration kehte hain.
```

### Props

Props send data from a parent component to a child component.

String props can use quotes:

```jsx
<Card channel="chaiAurCode" />
```

JavaScript expressions use curly braces:

```jsx
<Card username={username} />
```

Arrays use curly braces:

```jsx
<Card tags={tags} />
```

Objects use curly braces:

```jsx
<Card metadata={metadata} />
```

Boolean props can be shortened when the value is `true`:

```jsx
<Card featured />
```

Functions can be passed as props:

```jsx
<Card onAction={handleAction} />
```

React collects passed values into a props object. Props are read-only. A child component should not directly mutate props.

Props can be destructured, and default values can be assigned during destructuring:

```javascript
function Card({ title = "Untitled", tags = [], featured = false }) {
  // Component logic
}
```

### Stable List Keys

Keys help React identify list item identity during reconciliation.

This project uses stable IDs:

```jsx
key={item.id}
```

It does not use array indexes as keys, because indexes describe position, not identity. When items are inserted, removed, or reordered, index keys can cause React to match the wrong previous item with the next item.

## Tailwind CSS Setup

This project uses the current Vite-compatible Tailwind setup.

Install Tailwind and the Vite plugin:

```powershell
npm install tailwindcss @tailwindcss/vite
```

Register the plugin in `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Use this in `src/index.css`:

```css
@import "tailwindcss";
```

## Tailwind Version Note

This project uses the newer Tailwind setup for Vite.

Do not mix it with the older Tailwind v3 setup.

Older Tailwind v3 courses may use:

```powershell
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
```

And older CSS directives like:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Those directives belong to the older Tailwind v3 workflow. This project uses:

```css
@import "tailwindcss";
```

Choose one setup or the other. Do not combine both.

## Common Setup Errors

### Unknown at rule

Example:

```text
Unknown at rule @tailwindcss(unknownAtRules)
```

This can happen when:

- Older Tailwind directives are used with a newer setup
- The editor CSS extension does not understand Tailwind directives
- Tailwind or PostCSS configuration does not match the installed version

For this project, use:

```css
@import "tailwindcss";
```

### Vite `.vite/deps` EPERM error on Windows

Example:

```text
Error: EPERM: operation not permitted, rmdir
node_modules\.vite\deps
```

Try this PowerShell recovery:

```powershell
Remove-Item -Recurse -Force node_modules\.vite
npm run dev
```

If the error continues:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```

VS Code terminals, running dev servers, File Explorer windows, or antivirus tools can sometimes lock files on Windows.

## Project Structure

```text
03reactfiberprops/
  src/
    components/
      Counter.jsx
      InfoCard.jsx
      RenderTracker.jsx
      ReconciliationList.jsx
      ConceptPanel.jsx
      SnapshotDemo.jsx
    data/
      cards.js
      concepts.js
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
  README.md
```

## Components

### Counter

A reusable bounded counter component.

It receives:

- `label`
- `min`
- `max`
- `initialValue`

It uses functional state updates so the next counter value is based on the latest current value. It disables the increase button at `max` and disables the decrease button at `min`.

### InfoCard

A reusable props demonstration card.

It receives string, array, object, boolean, and function props. It destructures props with default values and calls the `onAction` callback when the button is clicked.

### RenderTracker

Displays how many times a component has rendered.

It uses `useRef()` because refs can remember values between renders without causing another render.

### SnapshotDemo

An interactive state snapshot demo.

It starts the counter at `15`. The `+3 using snapshot value` button calls `setCounter(counter + 1)` three times, but all three calls read the same render snapshot, so the value only becomes `16`. The `+3 using functional updates` button calls `setCounter((currentCounter) => currentCounter + 1)` three times, so React applies each update to the latest queued value and the counter increases by `3`.

### ReconciliationList

A dynamic keyed list.

It can add items, remove items, and move items to the top. It uses stable `id` values as keys so React can preserve item identity during reconciliation.

### ConceptPanel

A reusable explanation panel.

It receives concept content from `src/data/concepts.js` and renders each concept with the same component structure.

## How To Run

```powershell
npm install
npm run dev
```

Then open the local URL Vite prints, usually:

```text
http://localhost:5173/
```

## Experiments To Try

- Change counter bounds.
- Add another `Counter` instance.
- Reorder keyed list items.
- Pass different prop types.
- Add another concept card.
- Observe render counts.
- Compare the snapshot update button with the functional update button.
- Inspect DOM nodes in browser devtools.

## Lessons Learned

- `createRoot()` attaches React to a real browser DOM container.
- React components produce an element tree that describes the UI.
- The Virtual DOM is React’s in-memory UI description.
- Reconciliation compares previous and next rendered trees.
- React determines an efficient set of DOM updates based on its reconciliation rules.
- Fiber is React’s internal architecture for scheduling rendering work.
- The render phase calculates the next UI.
- The commit phase applies required changes to the browser DOM.
- Hydration attaches React behavior to existing server-generated or statically generated HTML.
- This Vite app uses client-side rendering with `createRoot()`, not hydration.
- Props pass read-only data from parent components to child components.
- Props can be strings, numbers, arrays, objects, booleans, and functions.
- Props can be destructured with default values.
- Stable list keys help React preserve identity during list changes.
- Functional state updates are safest when the next state depends on the previous state.
- State behaves like a snapshot for each render, so repeated `setCounter(counter + 1)` calls in one event handler read the same old value.
- Tailwind CSS can be used cleanly with Vite through `@tailwindcss/vite`.

## Future Improvements

- Add React DevTools screenshots.
- Add a render timeline.
- Add memoization examples.
- Compare `useState` and `useReducer`.
- Add a server-rendered hydration example in a later project.
