# 07reactrouter — React Router Learning Hub

A React Fundamentals exercise exploring client-side routing, Links, NavLinks, layout routes, nested routes, dynamic parameters, programmatic navigation, route state, redirects, and 404 handling.

## Learning Goals

- Understand why client-side routing exists.
- Understand why a route is not the same thing as a separate HTML file.
- Use `Link` for internal app navigation.
- Use normal anchors for real external destinations.
- Use `NavLink` for active navigation styles.
- Understand how `BrowserRouter` manages client-side history.
- Use `Routes` and `Route` to match URLs to route components.
- Share page structure with layout routes.
- Render child routes with `Outlet`.
- Build nested profile routes.
- Read dynamic URL parameters with `useParams()`.
- Navigate programmatically with `useNavigate()`.
- Read route information with `useLocation()`.
- Pass and read temporary navigation state.
- Redirect with `Navigate`.
- Handle unknown routes with a catch-all 404 route.
- Understand why production hosts need SPA fallback support for `BrowserRouter`.

## Concepts Covered

### Client-Side Routing

Client-side routing lets a React app change the visible page experience without replacing the entire HTML document.

React Router updates the browser history and renders the matching route component. The current JavaScript runtime can stay alive, which means shared layout state can remain in memory during internal navigation.

### One HTML Document, Multiple Route Components

This project does not use separate HTML files like `about.html`, `courses.html`, or `contact.html`.

The architecture is:

```text
index.html
  -> src/main.jsx
  -> BrowserRouter
  -> App routes
  -> Route components
```

This still creates a multi-page user experience, but each page-like view is a React component rendered by the router.

### BrowserRouter

`BrowserRouter` uses the browser History API for clean client-side URLs such as `/courses/react-router`.

The app is wrapped once in `src/main.jsx`:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

Components that use router hooks must render inside this router context. This project does not create separate routers inside individual pages.

### Routes and Route

`Routes` examines the current URL and renders the matching `Route` branch.

This project uses modern route elements:

```jsx
<Route path="about" element={<AboutPage />} />
```

It does not use older APIs like:

```jsx
<Route component={AboutPage} />
```

### Link

`Link` performs internal client-side navigation while preserving normal link semantics.

Use it for internal routes managed by React Router:

```jsx
<Link to="/courses">Courses</Link>
```

Do not use clickable `div` elements for navigation.

### Anchor Elements Are Still Valid

Anchors are still correct in React for destinations outside the React Router app:

```jsx
<a href="https://reactrouter.com/" target="_blank" rel="noreferrer">
  React Router Documentation
</a>
```

Anchors are also appropriate for downloads, `mailto:` links, `tel:` links, and same-document fragments such as `#features`.

### Link vs Anchor

This internal anchor:

```jsx
<a href="/about">About</a>
```

asks the browser to navigate to `/about` as a document request. That can discard the current JavaScript runtime, lose in-memory React state, request a new document, and initialize the app again.

React Router's `Link` intercepts supported internal navigation and updates history without a normal full-document reload.

### NavLink

`NavLink` works like `Link`, but also exposes route-aware state such as `isActive`.

The main navigation uses this pattern:

```jsx
<NavLink
  to={item.to}
  end={item.end}
  className={({ isActive }) =>
    isActive ? activeClasses : inactiveClasses
  }
>
  {item.label}
</NavLink>
```

`NavLink` is useful for menus, tabs, and sidebars. The home route uses `end` because `/` can otherwise match the beginning of every URL.

### Layout Routes and Outlet

A layout route renders shared UI around matched child routes.

`AppLayout` renders the header, main content container, route inspector, footer, and an `Outlet`.

`Outlet` marks where the matched child route should render.

### Nested Routes

The profile section uses nested routes:

```text
/profile
/profile/settings
```

`ProfileLayout` renders profile-specific navigation and its own `Outlet`, proving layouts can be nested.

### Dynamic Route Parameters

The route `/courses/:courseId` contains a dynamic URL segment.

`CourseDetailsPage` reads it with:

```javascript
const { courseId } = useParams();
```

URL parameters are strings. The page validates the `courseId` by looking it up in `courses.js`. If no course exists, it renders a safe "Course not found" state.

### Programmatic Navigation

`useNavigate()` is for navigation caused by app logic or completed interactions.

Examples in this project include:

- Home button that navigates to Courses.
- Course details button that navigates to Contact with state.
- Contact form submit that redirects home.
- 404 Back button using `navigate(-1)`.

Ordinary visible links still use `Link`.

### Navigation State

Navigation state passes temporary context during navigation:

```javascript
navigate("/contact", {
  state: {
    from: "course-details",
    courseId: course.id,
    message: `I want to ask about ${course.title}.`,
  },
});
```

Navigation state is not part of the visible URL. It is useful for small context, but it is not permanent storage. Refreshing or opening a URL directly may mean expected state is absent, so components must handle missing state safely.

### useLocation

`useLocation()` returns read-only route information such as:

- `pathname`
- `search`
- `hash`
- `state`

`RouteInspector` displays these values without mutating the location object.

### Navigate Redirects

The `/old-courses` route redirects to `/courses`:

```jsx
<Route path="old-courses" element={<Navigate to="/courses" replace />} />
```

`replace` replaces the current history entry instead of pushing another one.

### Catch-All Routes

The catch-all route handles unmatched URLs:

```jsx
<Route path="*" element={<NotFoundPage />} />
```

The 404 page shows the unmatched path, links home, and includes a back button.

### BrowserRouter Deployment Requirements

Vite's development server supports direct visits to application routes during development.

In production, a host using `BrowserRouter` normally needs an SPA fallback that serves `index.html` for unknown application routes.

Without that fallback:

```text
Opening /courses/react-router directly may return a server 404 before React runs.
```

`HashRouter` can be used on hosts without fallback support, producing URLs like:

```text
/#/courses/react-router
```

This project uses `BrowserRouter` because it is the primary learning goal.

### Stable Keys

Keys help React preserve sibling identity during reconciliation.

This project uses stable IDs for navigation items, courses, learning concept cards, and profile project list items.

Array indexes are avoided when stable IDs exist.

## Project Structure

```text
07reactrouter/
  src/
    components/
      AppLayout.jsx
      Header.jsx
      Footer.jsx
      Navigation.jsx
      ProfileLayout.jsx
      RouteInspector.jsx
      CourseCard.jsx
    pages/
      HomePage.jsx
      AboutPage.jsx
      CoursesPage.jsx
      CourseDetailsPage.jsx
      ProfileOverviewPage.jsx
      ProfileSettingsPage.jsx
      ContactPage.jsx
      NotFoundPage.jsx
    data/
      courses.js
      navigationItems.js
      learningConcepts.js
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
  README.md
```

## Routes

| Route | Component | Concept |
|---|---|---|
| `/` | `HomePage` | Index route |
| `/about` | `AboutPage` | Static route |
| `/courses` | `CoursesPage` | Nested index |
| `/courses/:courseId` | `CourseDetailsPage` | Dynamic parameter |
| `/profile` | `ProfileOverviewPage` | Nested layout |
| `/profile/settings` | `ProfileSettingsPage` | Nested child |
| `/contact` | `ContactPage` | Navigation state |
| `/old-courses` | `Navigate` | Redirect |
| `*` | `NotFoundPage` | Catch-all |

## Components

### AppLayout

The shared layout route for the main app shell. It renders `Header`, the educational layout counter, `RouteInspector`, `Outlet`, and `Footer`.

### Navigation

Builds the main navigation from `navigationItems.js` using `NavLink`, stable keys, active styling, and the `end` prop.

### ProfileLayout

A nested layout route for profile pages. It renders profile-specific `NavLink` items and an `Outlet`.

### RouteInspector

Uses `useLocation()` to display current route information.

### CourseCard

Renders course data and links to the dynamic detail route with `Link`.

### Pages

Each page-like route is a focused React component. The app does not create separate HTML files for routes.

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

- Add another static route.
- Add another nested profile route.
- Add query parameters to the Courses route.
- Use `useSearchParams` in a later experiment.
- Change a course ID and observe the dynamic route.
- Open an unknown route.
- Compare `Link` navigation with a normal internal anchor.
- Refresh directly on a nested route.
- Deploy to a host without SPA fallback and observe the difference.
- Replace `BrowserRouter` with `HashRouter` in an experiment.

## Lessons Learned

- React Router creates a multi-page user experience with one HTML document.
- Route components replace separate HTML pages in a React SPA.
- `BrowserRouter` provides routing context and uses the browser History API.
- `Routes` and `Route` match the current URL to route elements.
- `Link` is for internal app navigation.
- Normal anchors are still correct for external resources and real browser destinations.
- `NavLink` exposes active state and provides `aria-current` behavior.
- The `end` prop prevents the home route from matching every path.
- Layout routes share page structure.
- `Outlet` renders the matched child route.
- Nested routes can have their own nested layouts.
- `useParams()` reads dynamic URL segments as strings.
- Invalid dynamic route values should be handled safely.
- `useNavigate()` is for app-driven navigation.
- Navigation state is temporary and must be optional.
- `useLocation()` exposes read-only route information.
- `Navigate` can redirect route branches.
- `replace` avoids adding redirect routes as extra history entries.
- `path="*"` catches unmatched routes.
- BrowserRouter production deployments need SPA fallback support.
- Stable keys preserve list item identity during reconciliation.

## Future Improvements

- Add route-level lazy loading.
- Add Suspense fallbacks.
- Add data routers and route loaders.
- Add protected routes.
- Add authentication redirects.
- Add search parameters.
- Add breadcrumb navigation.
- Add route transition indicators.
- Add automated routing tests.
