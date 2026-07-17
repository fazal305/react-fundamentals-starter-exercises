# React Fundamentals - Starter Exercises

A growing React Fundamentals learning series built with professional conventions from day one: clean structure, focused exercises, reusable components, reusable custom hooks, accurate React terminology, and documentation that explains what each project teaches.

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

### 06reactcurrencyconverter

- What it is: A Vite + React currency converter using Tailwind CSS, the Fetch API, and a reusable custom hook.
- What it demonstrates: custom hooks, reusable asynchronous data-fetching logic, controlled inputs, props-driven reusable components, stable option keys, loading and error states, API response normalization, `AbortController` request cancellation, currency conversion calculations, and safe swap behavior.
- How to run: `npm install` then `npm run dev` inside the `06reactcurrencyconverter` folder.

### 07reactrouter

- What it is: A Vite + React Router learning hub using Tailwind CSS.
- What it demonstrates: client-side routing, `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, layout routes, `Outlet`, nested routes, dynamic URL parameters, `useParams`, `useNavigate`, `useLocation`, navigation state, redirects, and catch-all 404 routes.
- How to run: `npm install` then `npm run dev` inside the `07reactrouter` folder.

### 08reactcontexttheme

- What it is: A Vite + React Context API theme lab using Tailwind CSS v4 dark variants.
- What it demonstrates: prop drilling, `createContext`, context providers, `useContext`, a custom `useTheme()` hook, global theme state, controlled checkbox inputs, root HTML class synchronization, Tailwind `@custom-variant dark`, localStorage persistence, and the difference between props and context.
- How to run: `npm install` then `npm run dev` inside the `08reactcontexttheme` folder.

### 09reactcontexttodo

- What it is: A Vite + React Context API todo lab using Tailwind CSS and localStorage.
- What it demonstrates: applying the Context/Provider/custom-hook pattern to a CRUD data model, immutable add/update/delete/toggle state updates, stable todo IDs, a barrel `index.js` export, controlled form inputs, lazy localStorage reads, JSON persistence, and clean component splitting.
- How to run: `npm install` then `npm run dev` inside the `09reactcontexttodo` folder.

### 10reactreduxtodo

- What it is: A Vite + React Redux Toolkit todo lab using Tailwind CSS and localStorage.
- What it demonstrates: rebuilding the `09reactcontexttodo` CRUD feature with `configureStore`, `createSlice`, generated action creators, Immer draft updates, `useSelector`, `useDispatch`, `preloadedState`, and `store.subscribe`.
- How to run: `npm install` then `npm run dev` inside the `10reactreduxtodo` folder.

### 11reactmegablog

- What it is: A production-shaped Vite + React blog platform backed by Appwrite.
- What it demonstrates: Appwrite auth, TablesDB rows, Storage uploads, protected routes, Redux Toolkit auth state, React Hook Form, TinyMCE rich text editing, `html-react-parser`, centralized environment config, and deployment configuration.
- How to run: create an Appwrite project, copy `.env.sample` to `.env`, fill in the real values, then `npm install` and `npm run dev` inside the `11reactmegablog` folder.

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
- Custom hooks are normal JavaScript functions whose names start with `use` and which can call other React hooks.
- Custom hooks package reusable hook-based logic such as state, effects, fetching, loading, errors, and data transformation.
- Hooks should return reusable data and functions, not UI markup.
- `useCallback` returns a memoized function reference; it does not automatically call the function.
- `useCallback` dependencies decide when React should create a new callback reference.
- `useEffect` runs after React commits a render.
- `useEffect` dependencies decide when an effect should run again.
- Effect cleanup is important for clearing timers, cancelling requests, and avoiding stale work.
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
- Props-driven components make it possible to reuse one component in multiple roles instead of duplicating JSX.
- Controlled inputs keep form values in React state.
- HTML input values arrive as strings and should be normalized before numeric calculations.
- Source and target currency selects should be controlled by separate state values.
- Stable list keys help React preserve item identity during reordering, insertion, and removal.
- Missing keys usually produce warnings rather than crashing the app.
- Stable unique values, such as IDs or currency codes, are good keys when they uniquely identify sibling items.
- Avoid array indexes as keys when list order can change.
- `onClick` needs a function reference, not the result of calling a function during render.
- Use `onClick={() => handler(value)}` when an event handler needs an argument.
- `onChange` handles changes to form controls such as ranges, text inputs, checkboxes, and selects.
- `document.body.style.backgroundColor` is the correct DOM style property; `bgColor` silently fails.
- `useEffect` is the right tool for synchronizing React state with something outside React's rendered tree, such as `document.body`.
- `Math.floor(Math.random() * source.length)` creates valid zero-based indexes from `0` through `source.length - 1`.
- Do not add `1` to a random string index; it skips index `0` and can create an invalid final index.
- JavaScript strings are immutable and do not have `splice()`.
- Use `slice()` or `substring()` to extract part of a string.
- Selecting text in an input and choosing what to pass to `navigator.clipboard.writeText()` are separate operations.
- Clipboard writes can fail and should be handled with `try...catch`.
- API configuration should be centralized so provider details do not leak across the app.
- Fetch responses should be validated before the UI uses them.
- `AbortController` can cancel stale fetch requests when dependencies change.
- Currency conversion uses `amount * targetRate` when rates are relative to the selected source currency.
- Swapping related state should avoid converting with stale rates in the same event.
- Number formatting with `Intl.NumberFormat` should stay separate from numeric state.
- Public APIs can change response formats, rate limits, authentication rules, or availability.
- Client-side routing creates a multi-page user experience with one HTML document and multiple route components.
- `BrowserRouter` uses the browser History API and should wrap the app once.
- `Routes` chooses the matching `Route` branch for the current URL.
- `Link` is for internal client-side navigation.
- Normal anchors are still correct for external websites, downloads, `mailto:`, `tel:`, and same-document fragments.
- `NavLink` adds active route state and is useful for menus, tabs, and sidebars.
- The home `NavLink` should use `end` so `/` does not match every route.
- Layout routes share structure and render child routes with `Outlet`.
- Nested routes can have their own nested layouts.
- Dynamic route segments like `:courseId` are read with `useParams()`.
- URL parameters are strings and should be validated before use.
- `useNavigate()` is for app-driven navigation such as form completion, redirects after actions, or back navigation.
- Navigation state is temporary context, not permanent storage.
- `useLocation()` exposes read-only route information such as `pathname`, `search`, `hash`, and `state`.
- `Navigate` can redirect a route, and `replace` avoids adding an extra history entry.
- A catch-all `path="*"` route handles unknown URLs.
- BrowserRouter deployments usually need an SPA fallback that serves `index.html` for app routes.
- Prop drilling happens when data is passed through intermediate components only so a deeper component can use it.
- Context is useful for shared values needed by distant descendants, but it does not replace props.
- `createContext()` creates a context channel; the live value comes from the provider.
- A context provider owns state and passes a value to descendants through `Context.Provider`.
- `useContext()` reads the nearest matching provider value above the component in the React tree.
- A custom context hook such as `useTheme()` gives one safe, consistent way to read context.
- Provider placement matters: consumers must render below the matching provider.
- Context consumers can re-render when the provider value they read changes.
- Memoizing provider actions with `useCallback` and provider values with `useMemo` can avoid avoidable reference changes without preventing legitimate theme updates.
- A controlled checkbox uses `checked` and `onChange`, not `value` alone.
- Tailwind CSS v4 can define class-based dark mode in CSS with `@custom-variant dark`.
- Applying `.dark` to `document.documentElement` lets Tailwind `dark:` utilities respond across the app.
- `localStorage` can persist simple preferences such as `light` or `dark`.
- Lazy state initialization avoids reading localStorage on every render.
- System color preference can be used as a first-visit fallback with `matchMedia`.
- Hooks such as `useTheme()` must be called at the top level of components or custom hooks.
- Context can share full data models such as arrays plus action functions, not just single primitive values.
- React state arrays should be updated immutably with new arrays and new objects for changed items.
- `push()` and `splice()` mutate arrays and should not be used for React state CRUD updates.
- `map()` can update or toggle one matching item while preserving unchanged item references.
- `filter()` can delete an item by returning a new shorter array.
- Todo identity should come from stable IDs, not array positions.
- `crypto.randomUUID()` is useful for generating stable client-side IDs when available.
- A barrel `index.js` can reduce import-path repetition without changing how Context works.
- localStorage stores strings, so arrays and objects need `JSON.stringify` and `JSON.parse`.
- Reading persisted state in a lazy `useState` initializer avoids an extra first render.
- `JSON.parse(null)` is safe, but corrupted or empty stored strings can throw and should be handled with `try/catch`.
- Redux Toolkit reduces plain Redux boilerplate by generating action creators and action types from slices.
- `react-redux` bridges React components to the Redux store with `<Provider>`, `useSelector()`, and `useDispatch()`.
- `configureStore()` creates the Redux store and can receive `preloadedState` for startup data.
- `createSlice()` groups slice state, reducer logic, and generated action creators in one feature file.
- In a slice reducer, `state` means that slice's state, and `action.payload` is the value passed to the generated action creator.
- Immer makes draft mutation safe inside Redux Toolkit slice reducers, but that does not mean plain React state should be mutated.
- Inside one Immer reducer, either mutate the draft or return a new value; do not mix both patterns in the same reducer.
- Redux reducers should stay pure, so IDs and timestamps are better created before dispatch.
- `useSelector()` can subscribe a component to a specific selected value instead of a whole shared context value object.
- Redux persistence can be handled outside React components with `preloadedState` and `store.subscribe()`.
- Backend SDK calls should be wrapped in a service layer instead of scattered through React components.
- Vite client environment variables must start with `VITE_`.
- Environment variable reads should be centralized so renaming or auditing config is easier.
- Auth status and current user are good Redux state because protected routes, headers, and pages all need them.
- Form drafts and editor content should stay local or inside React Hook Form until submitted.
- React Hook Form's `register`, `handleSubmit`, and `formState.errors` reduce manual form boilerplate.
- React 19 receives `ref` as a regular prop; React 18 and earlier use `forwardRef`.
- Appwrite's current database terminology is tables, columns, and rows, while many older tutorials say collections, attributes, and documents.
- Appwrite CORS errors usually mean the hostname must be registered as a Web Platform in the Appwrite console.
- Appwrite Storage upload failures can come from bucket file-size limits, not broken React code.
- Rendering rich text HTML requires a trust boundary; `html-react-parser` still renders real HTML.
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
  06reactcurrencyconverter/
  07reactrouter/
  08reactcontexttheme/
  09reactcontexttodo/
  10reactreduxtodo/
  11reactmegablog/
  README.md
  .gitignore
```

## Next Steps

- Practice form validation and inline error messages.
- Practice lifting state up between sibling components.
- Practice `useEffect` cleanup with subscriptions, timers, and request cancellation.
- Practice `localStorage` persistence.
- Practice `useReducer` for more structured state updates.
- Practice `React.memo` to observe callback reference behavior.
- Add caching to the currency converter custom hook.
- Add route-level lazy loading and Suspense fallbacks.
- Add route loaders, protected routes, and search parameters.
- Split context state and context actions into separate providers.
- Add system theme mode and prevent initial theme flash before React loads.
- Add filtering, sorting, and cross-tab storage synchronization to the todo app.
- Replace `Math.random()` with Web Crypto API randomness in a future security-focused version.
