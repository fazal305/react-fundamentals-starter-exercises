# 08reactcontexttheme — Context Theme Lab

A React Fundamentals exercise exploring prop drilling, Context API, providers, useContext, custom context hooks, global theme state, Tailwind CSS v4 dark variants, and localStorage persistence.

## Learning Goals

- Understand what prop drilling is and when it becomes repetitive.
- Learn that Context shares values through the component tree without replacing all props.
- Create a context object with `createContext`.
- Build a real `ThemeProvider` that owns state and provides a value.
- Read context with `useContext` through a custom `useTheme()` hook.
- Keep theme state, constants, provider logic, and UI components separated.
- Use a controlled checkbox to toggle light and dark mode.
- Apply a theme class to the root HTML element.
- Use Tailwind CSS v4 `@custom-variant` for dark mode.
- Persist theme preference with `localStorage`.
- Use system color preference as a first-visit fallback.
- Use props for product data while using context for global theme state.

## Concepts Covered

### Prop Drilling

Prop drilling happens when data is passed through multiple component levels only so a deeply nested component can receive it.

```text
App
-> themeMode prop
Dashboard
-> themeMode prop
SettingsPanel
-> themeMode prop
ThemeToggle
```

Prop drilling is not always wrong. It is fine when the tree is shallow, only one or two values are passed, or the intermediate components naturally own the data. Context becomes useful when many distant components need the same value and forwarding props becomes repetitive.

### Context API

Context lets components read a shared value from the nearest matching provider above them in the React tree.

The main pieces are:

- `createContext()`
- `ThemeContext.Provider`
- `useContext()`

In this project:

```text
ThemeProvider stores theme state
-> ThemeContext.Provider exposes the value
-> Nested components call useTheme()
-> Components receive theme state and actions
```

### createContext

`src/context/ThemeContext.js` creates the context object:

```javascript
export const ThemeContext = createContext(undefined);
```

The context object identifies the shared channel. It does not store the live application state by itself. The live value comes from the provider.

Using `undefined` helps `useTheme()` throw a clear error if it is called outside the provider.

### ThemeProvider

`ThemeProvider` owns the theme state and provider logic.

It:

- Initializes theme from `localStorage` or system preference.
- Exposes `themeMode`, `isDarkMode`, and theme actions.
- Applies `light` or `dark` to `document.documentElement`.
- Persists the selected theme.
- Memoizes the context value.
- Renders `ThemeContext.Provider`.

Every descendant rendered inside `ThemeProvider` can access the current context value.

### useContext

`useContext(ThemeContext)` reads the nearest `ThemeContext.Provider` value above the component in the React tree.

When the provider value changes, consumers that read that context can re-render with the new value. Context is shared React state, not a global mutable variable.

### Custom useTheme Hook

`useTheme()` wraps direct context access:

```javascript
const context = useContext(ThemeContext);
```

The custom hook saves repeated imports, provides one consistent API, and throws a clear error when used outside `ThemeProvider`.

It does not export the context. It reads and returns the current context value.

### Context Does Not Replace Props

Context should not replace all props.

Props configure direct child components. Context shares values across distant descendants without forwarding the same prop through every intermediate level.

This project uses props for product card data and context for global theme state.

### Context Updates

When `themeMode` changes:

- `ThemeProvider` re-renders.
- The provider receives a new value object.
- Consumers using that value can re-render.

That is expected. Components that display the current theme should update when the theme changes.

### Memoizing Provider Values

Provider actions use `useCallback`, and the provided context object uses `useMemo`.

This keeps action references stable and avoids recreating the provider value object unless one of its dependencies changes.

This does not mean every consumer will never re-render. Consumers that read changing context values should re-render when those values change.

### Controlled Checkbox

The theme toggle is a controlled checkbox:

```jsx
<input
  type="checkbox"
  checked={isDarkMode}
  onChange={toggleTheme}
/>
```

`checked` controls whether the checkbox is selected. `value` is not the right way to control checkbox checked state.

### Synchronizing the HTML Class

React state stores the selected theme. Tailwind dark styles respond to the `.dark` class.

The provider uses an effect:

```javascript
useEffect(() => {
  const rootElement = document.documentElement;

  rootElement.classList.remove("light", "dark");
  rootElement.classList.add(themeMode);
}, [themeMode]);
```

This synchronizes React state with an external browser DOM target after React commits.

### Tailwind CSS v4 Dark Mode

This project uses Tailwind CSS v4 through the Vite plugin.

`src/index.css` contains:

```css
@import "tailwindcss";

@custom-variant dark (
  &:where(.dark, .dark *)
);
```

This makes utilities like `dark:bg-slate-900` respond to a `.dark` class on the current element or an ancestor.

The provider applies `.dark` to the root `<html>` element.

There is no required `tailwind.config.js` for this v4 setup.

### Tailwind v3 versus v4

Older courses may configure class-based dark mode like this:

```javascript
darkMode: "class";
```

That belongs to the older Tailwind config workflow. Do not combine that setup with this v4 Vite-plugin implementation.

### Light Class Is Optional

Tailwind's `dark:` variant only needs `.dark`.

The `.light` class is still useful for debugging, explicit theme state, custom CSS selectors, and making the active theme obvious. Tailwind's normal utilities act as the light/default styles.

### localStorage Persistence

The initial state is read lazily:

```javascript
const [themeMode, setThemeMode] = useState(getInitialTheme);
```

The selected theme is persisted:

```javascript
window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
```

Only string values `light` and `dark` are stored.

### System Theme Preference

If there is no valid saved theme, the app checks:

```javascript
window.matchMedia("(prefers-color-scheme: dark)").matches
```

Initialization order:

1. Use saved `localStorage` theme when valid.
2. Otherwise use system preference.
3. Otherwise default to light.

This project does not automatically follow later system changes. That is a future improvement.

### Rules of Hooks

`useTheme()` must be called at the top level of a React component or another custom hook.

Do not call it inside conditions, loops, event handlers, or ordinary non-hook utility functions.

## Project Structure

```text
08reactcontexttheme/
  src/
    components/
      AppHeader.jsx
      ThemeToggle.jsx
      ProductGrid.jsx
      ProductCard.jsx
      NestedThemePreview.jsx
      PropDrillingDemo.jsx
      ContextExplanation.jsx
    context/
      ThemeContext.js
      ThemeProvider.jsx
    hooks/
      useTheme.js
    data/
      products.js
      learningConcepts.js
    constants/
      theme.js
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
  README.md
```

## Context Data Flow

```text
ThemeProvider
-> ThemeContext.Provider
-> useTheme()
-> context consumers
```

## Components

### AppHeader

Reads the current theme through `useTheme()`, renders the app title, subtitle, current theme label, and `ThemeToggle`.

### ThemeToggle

Uses `useTheme()` and renders a controlled checkbox switch. Context is the single source of truth.

### ProductGrid

Receives product data through props and renders `ProductCard` components with stable product IDs as keys.

### ProductCard

Uses Tailwind `dark:` classes so it responds to the root `.dark` class without needing a theme prop.

### NestedThemePreview

Contains three nested components. Only the deepest component calls `useTheme()`, demonstrating how context avoids prop drilling.

### PropDrillingDemo

Shows an educational comparison between forwarding props through many layers and reading shared context from a descendant.

### ContextExplanation

Renders learning cards from `src/data/learningConcepts.js`.

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

- Add another deeply nested theme consumer.
- Remove `ThemeProvider` and observe the custom-hook error.
- Pass theme manually through props for comparison.
- Add a third theme such as `system`.
- Follow system theme changes with `matchMedia`.
- Split theme state and theme actions into separate contexts.
- Remove `useMemo` and inspect behavior.
- Clear localStorage and test system preference.
- Add a reusable themed button component.

## Lessons Learned

- Prop drilling means forwarding props through components that only pass them along.
- Prop drilling is not always wrong.
- Context shares values with distant descendants through providers.
- `createContext` creates the channel, not the live state.
- `ThemeProvider` owns the live theme state.
- `useContext` reads the nearest provider value.
- A custom context hook gives a safer, cleaner API.
- Context does not replace props.
- Consumers re-render when the context values they use change.
- `useCallback` can stabilize provider actions.
- `useMemo` can stabilize the provider value object.
- A checkbox should be controlled with `checked` and `onChange`.
- `useEffect` can synchronize React state with `document.documentElement`.
- Tailwind v4 can define class-based dark mode with `@custom-variant`.
- The `.dark` class enables Tailwind `dark:` variants.
- `localStorage` can persist simple theme preferences.
- Initial state can be resolved lazily.
- Hooks must be called at the top level.

## Future Improvements

- Add system theme mode.
- Listen for system preference changes.
- Prevent initial theme flash before React loads.
- Split state and actions contexts.
- Add context tests.
- Add React Router while preserving the provider.
- Add user preferences beyond theme.
