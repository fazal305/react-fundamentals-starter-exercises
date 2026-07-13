# React Fundamentals — Starter Exercises

Two minimal React setups built to learn the fundamentals before moving to larger projects: one running React directly via CDN with no build tool, and one scaffolded properly with Vite.

## Projects

### 01basicreact

- What it is: React 18 + ReactDOM 18 + Babel Standalone, all loaded via CDN, no npm, no build step.
- What it demonstrates: the raw mechanics of a React component and render call, with nothing hidden by tooling.
- How to run: open `index.html` directly in a browser.

### 01vitereact

- What it is: A proper Vite + React scaffold.
- What it demonstrates: a real dev toolchain (fast refresh, JSX handled by the bundler, proper file extensions), plus a custom second component (`Fazal.jsx`).
- How to run: `npm install` then `npm run dev` inside the `01vitereact` folder.

## Lessons Learned

- Component names must start with a capital letter, or JSX treats them as an HTML tag instead of a component.
- Vite requires the `.jsx` extension for files containing JSX syntax; the CDN + Babel Standalone setup is more lenient about this.
- A component can only return one root element — use a Fragment (`<>...</>`) when you don't need an extra wrapping DOM node, and a real `<div>` when you do (e.g. to apply a class).

## Next Steps

- Practice props by passing name, role, and fact into reusable components.
- Practice state with `useState`.
- Practice events with button clicks and input fields.
- Practice rendering lists with `.map()`.
- Practice conditional rendering.
